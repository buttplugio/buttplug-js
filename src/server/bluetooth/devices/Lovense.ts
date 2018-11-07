import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
import * as Messages from "../../../core/Messages";
import * as MessageUtils from "../../../core/MessageUtils";
import { RotateSubcommand } from "../../../core/Messages";

export class Lovense extends ButtplugBluetoothDevice {
  public static readonly DeviceInfo = (() => {
    // Start with the two non-standard UUIDs, which come from the original
    // versions of the Max/Nora toys.
    const uuids: string[] = ["0000fff0-0000-1000-8000-00805f9b34fb",
                             "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
                             "4f300001-0023-4bd4-bbd5-a6920e4c5653"];
    // Future-proofing for possible Lovense UUIDs, based on the pattern of the
    // current firmware.
    for (let i = 0; i < 16; ++i) {
      uuids.push(`5${i.toString(16)}300001-0023-4bd4-bbd5-a6920e4c5653`);
      uuids.push(`5${i.toString(16)}300001-0024-4bd4-bbd5-a6920e4c5653`);
    }

    return new BluetoothDeviceInfo([],
                                   ["LVS"],
                                   uuids,
                                   {},
                                   Lovense.CreateInstance);
  })();

  public static async CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice> {
    const dev = new Lovense(aDeviceImpl);
    await dev.Initialize();
    return dev;
  }

  private static _deviceNames = {
    A: "Nora",
    B: "Max",
    C: "Nora",
    L: "Ambi",
    O: "Osci",
    P: "Edge",
    S: "Lush",
    W: "Domi",
    Z: "Hush",
    0: "Unknown",
  };

  private _initResolve: (() => void) | undefined;
  private _initPromise = new Promise((res, rej) => { this._initResolve = res; });
  private _isClockwise = false;
  private _specs: any = {
    VibrateCmd: { FeatureCount: 1 },
    SingleMotorVibrateCmd: {},
    StopDeviceCmd: {},
  };

  public constructor(aDeviceImpl: IBluetoothDeviceImpl) {
    super(`Lovense ${aDeviceImpl.Name}`, aDeviceImpl);
  }

  public Initialize = async (): Promise<void> => {
    this._deviceImpl.addListener("characteristicvaluechanged", this.OnValueChanged);
    await this._deviceImpl.Subscribe("rx");
    await this._deviceImpl.WriteString("tx", "DeviceType;");
    await this._initPromise;
  }

  public get MessageSpecifications(): object {
    return this._specs;
  }

  private ParseDeviceType(aDeviceType: string) {
    // Typescript gets angry if we try to destructure this into consts/lets
    // differently or all lets (since deviceVersion never changes and
    // deviceAddress isn't used), and I don't wanna deal with assigning to const
    // then let, so this works well enough.
    let deviceLetter;
    let deviceVersion;
    let deviceAddress;
    [deviceLetter, deviceVersion, deviceAddress] = aDeviceType.split(":");

    if (!Lovense._deviceNames.hasOwnProperty(deviceLetter)) {
      deviceLetter = "0";
    }

    this._name = `Lovense ${Lovense._deviceNames[deviceLetter]} v${deviceVersion}`;

    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);

    if (deviceLetter === "P") {
      // Edge has 2 motors
      this._specs.VibrateCmd = { FeatureCount: 2 };
    } else if (deviceLetter === "A" || deviceLetter === "C") {
      // Nora has rotation
      this._specs.RotateCmd = { FeatureCount: 1 };
      this.MsgFuncs.set(Messages.RotateCmd.name, this.HandleRotateCmd);
    }
  }

  private OnValueChanged = async (aCharacteristic: string, aValue: Buffer) => {
    // If we haven't initialized yet, consider this to be the first read, for the device info.
    if (this._initResolve !== undefined) {
      this.ParseDeviceType(aValue.toString());
      const res = this._initResolve;
      this._initResolve = undefined;
      res();
      return;
    }
    // TODO Fill in battery/accelerometer/etc reads
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
    if (this._specs.hasOwnProperty("RotateCmd")) {
      this.HandleRotateCmd(new Messages.RotateCmd([new RotateSubcommand(0, 0, this._isClockwise)], 0, aMsg.Id));
    }
    return new Messages.Ok(aMsg.Id);
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const speeds: Messages.SpeedSubcommand[] = [];
      for (let i = 0; i < this._specs.VibrateCmd.FeatureCount; i++) {
        speeds.push(new Messages.SpeedSubcommand(i, aMsg.Speed));
      }
      return await this.HandleVibrateCmd(new Messages.VibrateCmd(speeds, aMsg.DeviceIndex, aMsg.Id));
    }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length > this._specs.VibrateCmd.FeatureCount) {
      return new Messages.Error(`Lovense devices require VibrateCmd to have at most ` +
                                `${this._specs.VibrateCmd.FeatureCount} speed commands, ` +
                                `${aMsg.Speeds.length} sent.`,
                                Messages.ErrorClass.ERROR_DEVICE,
                                aMsg.Id);
    }
    for (const cmd of aMsg.Speeds) {
      const index = this._specs.VibrateCmd.FeatureCount > 1 ? (cmd.Index + 1).toString(10) : "";
      const speed = Math.floor(20 * cmd.Speed);
      await this._deviceImpl.WriteString("tx", `Vibrate${index}:${speed};`);
    }
    return new Messages.Ok(aMsg.Id);
  }

  private HandleRotateCmd = async (aMsg: Messages.RotateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Rotations.length !== 1) {
      return new Messages.Error(`Lovense devices require RotateCmd to have 1 rotate command, ` +
                                `${aMsg.Rotations.length} sent.`,
                                Messages.ErrorClass.ERROR_DEVICE,
                                aMsg.Id);
    }
    const rotateCmd = aMsg.Rotations[0];
    if (rotateCmd.Index !== 0) {
      return new Messages.Error("Rotation command sent for invalid index.");
    }
    if (rotateCmd.Clockwise !== this._isClockwise) {
      await this._deviceImpl.WriteString("tx", "RotateChange;");
    }
    const speed = Math.floor(20 * rotateCmd.Speed);
    await this._deviceImpl.WriteString("tx", `Rotate:${speed};`);
    return new Messages.Ok(aMsg.Id);
  }

}

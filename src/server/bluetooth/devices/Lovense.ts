import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
import * as Messages from "../../../core/Messages";

export class Lovense extends ButtplugBluetoothDevice {
  public static readonly DeviceInfo = (() => {
    // Start with the two non-standard UUIDs, which come from the original
    // versions of the Max/Nora toys.
    const uuids: string[] = ["0000fff0-0000-1000-8000-00805f9b34fb",
                             "6e400001-b5a3-f393-e0a9-e50e24dcca9e"];
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

  public static CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice> {
    return Promise.resolve(new Lovense(aDeviceImpl));
  }

  private static _deviceNames = {
    "LVS-Edge": "Edge",
    "LVS-Lush": "Lush",
    "LVS-Ambi": "Ambi",
    "LVS-Osci": "Osci",
    "LVS-Hush": "Hush",
    "LVS-Domi": "Domi",
    "LVS-Max": "Max",
    "LVS-Nora": "Nora",
    "LVS-A": "Nora",
    "LVS-C": "Nora",
    "LVS-B": "Max",
    "LVS-L": "Ambi",
    "LVS-S": "Lush",
    "LVS-Z": "Hush",
    "LVS-P": "Edge",
  };

  public constructor(aDeviceImpl: IBluetoothDeviceImpl) {
    super(`Lovense ${aDeviceImpl.Name}`, aDeviceImpl);
    // Until we've implemented Lovense Protocol DeviceInfo checking, use this to
    // make pretty names.
    for (const n of Object.keys(Lovense._deviceNames)) {
      if (aDeviceImpl.Name.indexOf(n) === 0) {
        this._name = "Lovense " + Lovense._deviceNames[n];
        break;
      }
    }
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
  }

  public get MessageSpecifications(): object {
    return {
      VibrateCmd: { FeatureCount: 1 },
      SingleMotorVibrateCmd: {},
      StopDeviceCmd: {},
    };
  }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length !== 1) {
      return new Messages.Error(`Lovense devices require VibrateCmd to have 1 speed command, ` +
                                `${aMsg.Speeds.length} sent.`,
                                Messages.ErrorClass.ERROR_DEVICE,
                                aMsg.Id);
    }
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed,
                                                                                     aMsg.DeviceIndex,
                                                                                     aMsg.Id));
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const speed = Math.floor(20 * aMsg.Speed);
      await this._deviceImpl.WriteValue("tx", Buffer.from("Vibrate:" + speed + ";"));
      return new Messages.Ok(aMsg.Id);
    }
}

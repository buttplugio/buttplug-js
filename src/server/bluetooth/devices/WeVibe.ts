import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
import * as Messages from "../../../core/Messages";

export class WeVibe extends ButtplugBluetoothDevice {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["4 Plus", "Ditto", "Nova", "Wish",
                                                               "Pivot", "Verge", "Cougar", "Sync"],
                                                              ["f000bb03-0451-4000-b000-000000000000"],
                                                              { tx: "f000c000-0451-4000-b000-000000000000",
                                                                rx: "f000b000-0451-4000-b000-000000000000"},
                                                              WeVibe.CreateInstance);

  public static async CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice> {
    return new WeVibe(aDeviceImpl);
  }

  public constructor(aDeviceImpl: IBluetoothDeviceImpl) {
    super(`WeVibe ${aDeviceImpl.Name}` , aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
    this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
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
      return new Messages.Error(`WeVibe devices require VibrateCmd to have 1 speed command, ` +
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
      const speed = Math.floor(aMsg.Speed * 15);
      const data: Uint8Array = new Uint8Array([0x0f, 0x03, 0x00, (speed << 4) | (speed), 0x00, 0x03, 0x00, 0x00]);
      await this._deviceImpl.WriteValue("tx", data);
      return new Messages.Ok(aMsg.Id);
    }
}

import BluetoothDeviceInfo from "../BluetoothDeviceInfo";
import ButtplugBluetoothDevice from "../ButtplugBluetoothDevice";
import IBluetoothDeviceImpl from "../IBluetoothDeviceImpl";
import * as Messages from "../../../core/Messages";

export class FleshlightLaunch extends ButtplugBluetoothDevice {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["Launch"],
                                                              ["88f80580-0000-01e6-aace-0002a5d5c51b"],
                                                              { cmd: "88f80583-0000-01e6-aace-0002a5d5c51b",
                                                                // rx: "88f80582-0000-01e6-aace-0002a5d5c51b",
                                                                tx: "88f80581-0000-01e6-aace-0002a5d5c51b"},
                                                              FleshlightLaunch.CreateInstance);

  public static async CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice> {
    // Send initializer byte
    aDeviceImpl.WriteValue("cmd", new Uint8Array([0x00]));
    return new FleshlightLaunch(aDeviceImpl);
  }

  public constructor(aDeviceImpl: IBluetoothDeviceImpl) {
    super("Fleshlight Launch", aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
  }

  private HandleStopDeviceCmd =
    async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
      return await this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(0,
                                                                                           0,
                                                                                           aMsg.DeviceIndex,
                                                                                           aMsg.Id));
    }

  private HandleFleshlightLaunchFW12Cmd =
    async (aMsg: Messages.FleshlightLaunchFW12Cmd): Promise<Messages.ButtplugMessage> => {
      await this._deviceImpl.WriteValue("tx", new Uint8Array([aMsg.Position, aMsg.Speed]));
      return new Messages.Ok(aMsg.Id);
    }
}

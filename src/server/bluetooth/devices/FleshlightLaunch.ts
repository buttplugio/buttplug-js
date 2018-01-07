import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
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
    await aDeviceImpl.WriteValue("cmd", new Uint8Array([0x00]));
    return new FleshlightLaunch(aDeviceImpl);
  }

  private _lastPosition: number = 0;

  public constructor(aDeviceImpl: IBluetoothDeviceImpl) {
    super("Fleshlight Launch", aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
    this.MsgFuncs.set(Messages.LinearCmd.name, this.HandleLinearCmd);
  }

  public GetMessageSpecifications(): object {
    return {
      FleshlightLaunchFW12Cmd: {},
      StopDeviceCmd: {},
    };
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

  private HandleLinearCmd =
    async (aMsg: Messages.LinearCmd): Promise<Messages.ButtplugMessage> => {
      if (aMsg.Vectors.length !== 1) {
        return new Messages.Error("LinearCmd requires 1 vector for this device.",
                                  Messages.ErrorClass.ERROR_DEVICE,
                                  aMsg.Id);
      }
      // Move between 5/95, otherwise we'll allow the device to smack into hard
      // stops because of braindead firmware.
      const range: number = 90;
      const vector = aMsg.Vectors[0];
      const currentPosition = vector.Position * 100;
      const positionDelta: number = Math.abs(currentPosition - this._lastPosition);
      let speed: number = Math.floor(25000 * Math.pow(((vector.Duration * 90) / positionDelta), -1.05));

      // Clamp speed on 0 <= x <= 95 so we don't break the launch.
      speed = Math.min(Math.max(speed, 0), 95);

      const positionGoal = Math.floor(((currentPosition / 99) * range) + ((99 - range) / 2));
      this._lastPosition = positionGoal;
      return await this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(speed, positionGoal));
    }
}

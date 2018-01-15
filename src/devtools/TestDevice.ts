import { ButtplugDevice } from "../server/ButtplugDevice";
import * as Messages from "../core/Messages";

export class TestDevice extends ButtplugDevice {

  public constructor(name: string) {
    super(`Test Device - ${name}`);
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
  }

  public Disconnect() {
    this.emit("deviceremoved");
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    this.emit("vibrate", 0);
    return Promise.resolve(new Messages.Ok(aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      this.emit("vibrate", aMsg.Speed);
      return Promise.resolve(new Messages.Ok(aMsg.Id));
    }
}

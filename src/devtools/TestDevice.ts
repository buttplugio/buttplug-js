import { ButtplugDevice } from "../server/ButtplugDevice";
import * as Messages from "../core/Messages";

export class TestDevice extends ButtplugDevice {

  private _connected: boolean = false;
  private _linearSpeed: number = 0;
  private _linearPosition: number = 0;
  private _vibrateSpeed: number = 0;

  public constructor(name: string,
                     shouldVibrate: boolean = false,
                     shouldLinear: boolean = false) {
    super(`Test Device - ${name}`);
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    if (shouldVibrate) {
      this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
    }
    if (shouldLinear) {
      this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
    }
  }

  public get Connected() {
    return this._connected;
  }

  public set Connected(connected: boolean) {
    this._connected = connected;
  }

  public Disconnect() {
    this.emit("deviceremoved", this);
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    this.emit("vibrate", 0);
    this.emit("linear", { position: this._linearPosition,
                          speed: this._linearSpeed});
    return Promise.resolve(new Messages.Ok(aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      this._vibrateSpeed = aMsg.Speed;
      this.emit("vibrate", aMsg.Speed);
      return Promise.resolve(new Messages.Ok(aMsg.Id));
    }

  private HandleFleshlightLaunchFW12Cmd =
    async (aMsg: Messages.FleshlightLaunchFW12Cmd): Promise<Messages.ButtplugMessage> => {
      this._linearPosition = aMsg.Position;
      this._linearSpeed = aMsg.Speed;
      this.emit("linear", { position: this._linearPosition,
                            speed: this._linearSpeed });
      return Promise.resolve(new Messages.Ok(aMsg.Id));
    }
}

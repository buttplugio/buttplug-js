import { ButtplugDevice, SingleMotorVibrateCmd, FleshlightLaunchFW12Cmd } from "../index";
import * as Messages from "../index";

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
      this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
    }
    if (shouldLinear) {
      this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
      this.MsgFuncs.set(Messages.LinearCmd.name, this.HandleLinearCmd);
    }
  }

  public get Connected() {
    return this._connected;
  }

  public set Connected(connected: boolean) {
    this._connected = connected;
  }

  public get MessageSpecifications(): object {
    if (this.MsgFuncs.has(Messages.VibrateCmd.name)) {
      return {
        VibrateCmd: { FeatureCount: 1 },
        SingleMotorVibrateCmd: {},
        StopDeviceCmd: {},
      };
    } else if (this.MsgFuncs.has(Messages.LinearCmd.name)) {
      return {
        LinearCmd: { FeatureCount: 1 },
        FleshlightLaunchFW12Cmd: {},
        StopDeviceCmd: {},
      };
    }
    return {};
  }

  public Disconnect() {
    this.emit("deviceremoved", this);
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    if (this.MsgFuncs.has(Messages.VibrateCmd.name)) {
      this.emit("vibrate", 0);
    } else if (this.MsgFuncs.has(Messages.LinearCmd.name)) {
      this.emit("linear", { position: this._linearPosition,
                            speed: this._linearSpeed});
    }
    return Promise.resolve(new Messages.Ok(aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      this._vibrateSpeed = aMsg.Speed;
      this.emit("vibrate", aMsg.Speed);
      return Promise.resolve(new Messages.Ok(aMsg.Id));
    }

  private HandleVibrateCmd =
    async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
      return this.HandleSingleMotorVibrateCmd(new SingleMotorVibrateCmd(aMsg.Speeds[0].Speed,
                                                                        aMsg.DeviceIndex,
                                                                        aMsg.Id));
    }

  private HandleFleshlightLaunchFW12Cmd =
    async (aMsg: Messages.FleshlightLaunchFW12Cmd): Promise<Messages.ButtplugMessage> => {
      this._linearPosition = aMsg.Position;
      this._linearSpeed = aMsg.Speed;
      this.emit("linear", { position: this._linearPosition,
                            speed: this._linearSpeed });
      return Promise.resolve(new Messages.Ok(aMsg.Id));
    }

  private HandleLinearCmd =
    async (aMsg: Messages.LinearCmd): Promise<Messages.ButtplugMessage> => {
      const speed = 0;
      return await this.HandleFleshlightLaunchFW12Cmd(new FleshlightLaunchFW12Cmd(speed,
                                                                                  aMsg.Vectors[0].Position * 99,
                                                                                  aMsg.DeviceIndex));
    }

}

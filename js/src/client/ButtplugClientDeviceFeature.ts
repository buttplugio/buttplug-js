import { ButtplugDeviceError, ButtplugError } from "../core/Exceptions";
import * as Messages from "../core/Messages";
import { ButtplugCmdValue } from "./ButtplugClientDevice";

export class ButtplugClientDeviceFeature {

  constructor(
    private _deviceIndex: number,
    private _deviceName: string,
    private _feature: Messages.DeviceFeature,
    private _sendClosure: (
      msg: Messages.ButtplugMessage
    ) => Promise<Messages.ButtplugMessage>) {
  }

  protected send = async (msg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    return await this._sendClosure(msg);
  }

  protected sendMsgExpectOk = async (
    msg: Messages.ButtplugMessage
  ): Promise<void> => {
    const response = await this.send(msg);
    if (response.Ok !== undefined) {
      return;
    } else if (response.Error !== undefined) {
      throw ButtplugError.FromError(response as Messages.Error);
    } else {
      /*
      throw ButtplugError.LogAndError(
        ButtplugMessageError,
        this._logger,
        `Message ${response} not handled by SendMsgExpectOk`
      );
      */
    }
  };

  protected isOutputValid(type: Messages.OutputType) {
    if (this._feature.Output !== undefined && !this._feature.Output.hasOwnProperty(type)) {
      throw new ButtplugDeviceError(`Feature index ${this._feature.FeatureIndex} does not support type ${type} for device ${this._deviceName}`);
    }
  }

  protected async sendOutputCmd(type: Messages.OutputType, command: ButtplugCmdValue, duration: number = -1): Promise<void> {
    let newCommand: Messages.DeviceFeatureOutput = {};
    // Make sure the requested feature is valid
    this.isOutputValid(type);

    if (command.float !== undefined) {
      if (command.float < 0 || command.float > 1.0) {
        throw new ButtplugDeviceError(`Float value ${command.float} is not in the range 0.0 <= x <= 1.0`);
      }      
      if (type == Messages.OutputType.Position) {
        newCommand.Position = Math.ceil(this._feature.Output[type]!.Position![1] * command.float);
      } else if (type == Messages.OutputType.PositionWithDuration) {
        newCommand.Position = Math.ceil(this._feature.Output[type]!.Position![1] * command.float);
        newCommand.Duration = duration;
      } else {
        newCommand.Value = Math.ceil(this._feature.Output[type]!.Value![1] * command.float);
      }
    } else {
      if (type == Messages.OutputType.Position) {
        newCommand.Position = command.steps;
      } else if (type == Messages.OutputType.PositionWithDuration) {
        newCommand.Position = command.steps;
        newCommand.Duration = duration;
      } else {
        // TODO Check step limits here
        newCommand.Value = command.steps;
      }
    }

    let outCommand = {};
    outCommand[type.toString()] = newCommand;

    let cmd: Messages.ButtplugMessage = {
      OutputCmd: {
        Id: 1,
        DeviceIndex: this._deviceIndex, 
        FeatureIndex: this._feature.FeatureIndex, 
        Command: outCommand 
      }
    };
    await this.sendMsgExpectOk(cmd);
  }

  public hasOutput(type: Messages.OutputType): boolean {
    if (this._feature.Output !== undefined) {
      return this._feature.Output.hasOwnProperty(type.toString());
    }
    return false;
  }

  protected async runDeviceValueCmd(type: Messages.OutputType, value: ButtplugCmdValue, duration: number = -1): Promise<void> {
    if (this._feature.Output !== undefined && this._feature.Output.hasOwnProperty(type.toString())) {
      return this.sendOutputCmd(type, value, duration);
    }
    return Promise.reject();
  }

  public hasVibrate(): boolean {
    return this.hasOutput(Messages.OutputType.Vibrate);
  }

  public async vibrate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Vibrate, value);
  }

  public hasRotate(): boolean {
    return this.hasOutput(Messages.OutputType.Rotate);
  }

  public async rotate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Rotate, value);
  }

  public hasOscillate(): boolean {
    return this.hasOutput(Messages.OutputType.Oscillate);
  }

  public async oscillate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Oscillate, value);
  }

  public hasConstrict(): boolean {
    return this.hasOutput(Messages.OutputType.Constrict);
  }

  public async constrict(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Constrict, value);
  }

  public hasTemperature(): boolean {
    return this.hasOutput(Messages.OutputType.Temperature);
  }

  public async temperature(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Temperature, value);
  }

  public hasLed(): boolean {
    return this.hasOutput(Messages.OutputType.Led);
  }

  public async led(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Led, value);
  }

  public hasInflate(): boolean {
    return this.hasOutput(Messages.OutputType.Inflate);
  }

  public async inflate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Inflate, value);
  }

  public hasPosition(): boolean {
    return this.hasOutput(Messages.OutputType.Position);
  }

  public async position(position: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Position, position);
  }

  public hasPositionWithDuration(): boolean {
    return this.hasOutput(Messages.OutputType.PositionWithDuration);
  }

  public async positionWithDuration(position: ButtplugCmdValue, duration: number): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.PositionWithDuration, position, duration);
  }
}
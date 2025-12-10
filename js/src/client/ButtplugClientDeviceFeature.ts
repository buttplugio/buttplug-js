import { ButtplugDeviceError, ButtplugError } from "../core/Exceptions";
import * as Messages from "../core/Messages";
import { DeviceOutputCommand } from "./ButtplugClientDeviceCommand";

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

  protected async sendOutputCmd(command: DeviceOutputCommand): Promise<void> {
    let newCommand: Messages.DeviceFeatureOutput = {};
    // Make sure the requested feature is valid
    this.isOutputValid(command.outputType);

    let type = command.outputType;

    if (type == Messages.OutputType.Position || type == Messages.OutputType.PositionWithDuration) {
      if (command.position === undefined) {
        throw new ButtplugDeviceError("Position or PositionWithDuration requires position defined");
      }
      let p = command.position;
      if (p.percent === undefined) {
        newCommand.Position = command.position!.steps;
      } else {
        newCommand.Position = Math.ceil(this._feature.Output[type]!.Position![1] * p.percent);
      }
      if (type == Messages.OutputType.PositionWithDuration) {
        if (command.duration === undefined) {
          throw new ButtplugDeviceError("PositionWithDuration requires duration defined");
        }
        newCommand.Duration = command.duration;
      }    
    } else {
      if (command.value === undefined) {
        throw new ButtplugDeviceError(`${type} requires value defined`);
      }
      let p = command.value;
      if (p.percent === undefined) {
        // TODO Check step limits here
        newCommand.Value = command.value.steps;
      } else {
        newCommand.Value = Math.ceil(this._feature.Output[type]!.Value![1] * p.percent);
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

  public async runOutput(cmd: DeviceOutputCommand): Promise<void> {
    if (this._feature.Output !== undefined && this._feature.Output.hasOwnProperty(cmd.outputType.toString())) {
      return this.sendOutputCmd(cmd);
    }
    throw new ButtplugDeviceError(`Output type ${cmd.outputType} not supported by feature.`);
  }
}
import { ButtplugDeviceError, ButtplugError, ButtplugMessageError } from "../core/Exceptions";
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
      throw new ButtplugMessageError("Expected Ok or Error, and didn't get either!");
    }
  };

  protected isOutputValid(type: Messages.OutputType) {
    if (this._feature.Output !== undefined && !this._feature.Output.hasOwnProperty(type)) {
      throw new ButtplugDeviceError(`Feature index ${this._feature.FeatureIndex} does not support type ${type} for device ${this._deviceName}`);
    }
  }

  protected isInputValid(type: Messages.InputType) {
    if (this._feature.Input !== undefined && !this._feature.Input.hasOwnProperty(type)) {
      throw new ButtplugDeviceError(`Feature index ${this._feature.FeatureIndex} does not support type ${type} for device ${this._deviceName}`);
    }
  }

  protected async sendOutputCmd(command: DeviceOutputCommand): Promise<void> {
    // Make sure the requested feature is valid
    this.isOutputValid(command.outputType);
    if (command.value === undefined) {
      throw new ButtplugDeviceError(`${command.outputType} requires value defined`);
    }

    let type = command.outputType;
    let duration: undefined | number = undefined;
    if (type == Messages.OutputType.PositionWithDuration) {
      if (command.duration === undefined) {
        throw new ButtplugDeviceError("PositionWithDuration requires duration defined");
      }
      duration = command.duration;
    } 
    let value: number;
    let p = command.value;
    if (p.percent === undefined) {
      // TODO Check step limits here
      value = command.value.steps!;
    } else {
      value = Math.ceil(this._feature.Output[type]!.Value![1] * p.percent);
    }
    let newCommand: Messages.DeviceFeatureOutput = { Value: value, Duration: duration };
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

  public hasInput(type: Messages.InputType): boolean {
    if (this._feature.Input !== undefined) {
      return this._feature.Input.hasOwnProperty(type.toString());
    }
    return false;
  }


  public async runOutput(cmd: DeviceOutputCommand): Promise<void> {
    if (this._feature.Output !== undefined && this._feature.Output.hasOwnProperty(cmd.outputType.toString())) {
      return this.sendOutputCmd(cmd);
    }
    throw new ButtplugDeviceError(`Output type ${cmd.outputType} not supported by feature.`);
  }

  public async runInput(inputType: Messages.InputType, inputCommand: Messages.InputCommandType): Promise<Messages.InputReading | undefined> {
    // Make sure the requested feature is valid
    this.isInputValid(inputType);
    let inputAttributes = this._feature.Input[inputType];
    console.log(this._feature.Input);
    if ((inputCommand === Messages.InputCommandType.Unsubscribe && !inputAttributes.Command.includes(Messages.InputCommandType.Subscribe)) && !inputAttributes.Command.includes(inputCommand)) {
      throw new ButtplugDeviceError(`${inputType} does not support command ${inputCommand}`);
    }

    let cmd: Messages.ButtplugMessage = {
      InputCmd: {
        Id: 1,
        DeviceIndex: this._deviceIndex, 
        FeatureIndex: this._feature.FeatureIndex, 
        Type: inputType,
        Command: inputCommand,
      }
    };
    if (inputCommand == Messages.InputCommandType.Read) {
      const response = await this.send(cmd);
      if (response.InputReading !== undefined) {
        return response.InputReading;
      } else if (response.Error !== undefined) {
        throw ButtplugError.FromError(response as Messages.Error);
      } else {
        throw new ButtplugMessageError("Expected InputReading or Error, and didn't get either!");
      }
    } else {
      console.log(`Sending subscribe message: ${JSON.stringify(cmd)}`);
      await this.sendMsgExpectOk(cmd);
      console.log("Got back ok?");
    }
  }
}
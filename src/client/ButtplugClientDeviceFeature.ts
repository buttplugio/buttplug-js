import { ButtplugDeviceError, ButtplugError, ButtplugMessageError } from "../core/Exceptions";
import * as Messages from "../core/Messages";
import { DeviceOutputCommand } from "./ButtplugClientDeviceCommand";

export type ButtplugClientDeviceFeatureValueRange = readonly [
  min: number,
  max: number
];

export interface ButtplugClientDeviceFeatureOutput {
  readonly type: Messages.OutputType;
  readonly valueRange: ButtplugClientDeviceFeatureValueRange;
  readonly durationRange?: ButtplugClientDeviceFeatureValueRange;
}

export interface ButtplugClientDeviceFeatureInput {
  readonly type: Messages.InputType;
  readonly valueRange: ButtplugClientDeviceFeatureValueRange;
  readonly commands: readonly Messages.InputCommandType[];
}

export interface IButtplugClientDeviceFeature {
  readonly index: number;
  readonly descriptor: string;
  readonly featureDescriptor: string;
  readonly outputs: ReadonlyMap<Messages.OutputType, ButtplugClientDeviceFeatureOutput>;
  readonly inputs: ReadonlyMap<Messages.InputType, ButtplugClientDeviceFeatureInput>;
  output(type: Messages.OutputType): ButtplugClientDeviceFeatureOutput | undefined;
  input(type: Messages.InputType): ButtplugClientDeviceFeatureInput | undefined;
  hasOutput(type: Messages.OutputType): boolean;
  hasInput(type: Messages.InputType): boolean;
  runOutput(cmd: DeviceOutputCommand): Promise<void>;
  runInput(inputType: Messages.InputType, inputCommand: Messages.InputCommandType): Promise<Messages.InputReading | undefined>;
}

export class ButtplugClientDeviceFeature implements IButtplugClientDeviceFeature {

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

  private valueRange(value: number[]): ButtplugClientDeviceFeatureValueRange {
    return Object.freeze([value[0], value[1]]) as ButtplugClientDeviceFeatureValueRange;
  }

  private createOutputInfo(type: Messages.OutputType, output: Messages.DeviceFeatureOutput): ButtplugClientDeviceFeatureOutput {
    const durationRange = Array.isArray(output.Duration) ? this.valueRange(output.Duration) : undefined;
    return Object.freeze({
      type,
      valueRange: this.valueRange(output.Value),
      ...(durationRange === undefined ? {} : { durationRange }),
    });
  }

  private createInputInfo(type: Messages.InputType, input: Messages.DeviceFeatureInput): ButtplugClientDeviceFeatureInput {
    return Object.freeze({
      type,
      valueRange: this.valueRange(input.Value),
      commands: Object.freeze([...input.Command]),
    });
  }

  protected async sendOutputCmd(command: DeviceOutputCommand): Promise<void> {
    // Make sure the requested feature is valid
    this.isOutputValid(command.outputType);
    if (command.value === undefined) {
      throw new ButtplugDeviceError(`${command.outputType} requires value defined`);
    }

    let type = command.outputType;
    let duration: undefined | number = undefined;
    if (type == Messages.OutputType.HwPositionWithDuration) {
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
    let newCommand: Messages.DeviceFeatureOutputCommand = { Value: [value], Duration: duration };
    let outCommand: { [key: string]: Messages.DeviceFeatureOutputCommand } = {};
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

  public get index(): number {
    return this._feature.FeatureIndex;
  }

  public get descriptor(): string {
    return this._feature.FeatureDescriptor;
  }

  public get featureDescriptor(): string {
    return this.descriptor;
  }

  public get outputs(): ReadonlyMap<Messages.OutputType, ButtplugClientDeviceFeatureOutput> {
    let outputs = new Map<Messages.OutputType, ButtplugClientDeviceFeatureOutput>();
    if (this._feature.Output !== undefined) {
      for (let [type, output] of Object.entries(this._feature.Output)) {
        outputs.set(type as Messages.OutputType, this.createOutputInfo(type as Messages.OutputType, output));
      }
    }
    return outputs;
  }

  public get inputs(): ReadonlyMap<Messages.InputType, ButtplugClientDeviceFeatureInput> {
    let inputs = new Map<Messages.InputType, ButtplugClientDeviceFeatureInput>();
    if (this._feature.Input !== undefined) {
      for (let [type, input] of Object.entries(this._feature.Input)) {
        inputs.set(type as Messages.InputType, this.createInputInfo(type as Messages.InputType, input));
      }
    }
    return inputs;
  }

  public output(type: Messages.OutputType): ButtplugClientDeviceFeatureOutput | undefined {
    let output = this._feature.Output?.[type];
    if (output === undefined) {
      return undefined;
    }
    return this.createOutputInfo(type, output);
  }

  public input(type: Messages.InputType): ButtplugClientDeviceFeatureInput | undefined {
    let input = this._feature.Input?.[type];
    if (input === undefined) {
      return undefined;
    }
    return this.createInputInfo(type, input);
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

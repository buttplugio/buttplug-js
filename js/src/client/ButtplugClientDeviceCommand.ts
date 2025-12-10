import { ButtplugDeviceError } from "../core/Exceptions";
import { OutputType } from "../core/Messages";

class PercentOrSteps {
  private _percent: number | undefined;
  private _steps: number | undefined;

  public get percent() {
    return this._percent;
  }

  public get steps() {
    return this._steps;
  }

  public static createSteps(s: number): PercentOrSteps {
    let v = new PercentOrSteps;
    v._steps = s;
    return v;
  }

  public static createPercent(p: number): PercentOrSteps {
    if (p < 0 || p > 1.0) {
      throw new ButtplugDeviceError(`Percent value ${p} is not in the range 0.0 <= x <= 1.0`);
    }      

    let v = new PercentOrSteps;
    v._percent = p;
    return v;
  }
}

export class DeviceOutputCommand {
  public constructor( 
    private _outputType: OutputType,
    private _value?: PercentOrSteps,
    private _position?: PercentOrSteps,
    private _duration?: number,
  )
  {}

  public get outputType() {
    return this._outputType;
  }

  public get value() {
    return this._value;
  }

  public get position() {
    return this._position;
  }

  public get duration() {
    return this._duration;
  }
}

export class DeviceOutputValueConstructor {
  public constructor(
    private _outputType: OutputType) 
  {}

  public steps(steps: number): DeviceOutputCommand {
    return new DeviceOutputCommand(this._outputType, PercentOrSteps.createSteps(steps), undefined, undefined);
  }

  public percent(percent: number): DeviceOutputCommand {
    return new DeviceOutputCommand(this._outputType, PercentOrSteps.createPercent(percent), undefined, undefined);
  }
}

export class DeviceOutputPositionConstructor {
  public steps(steps: number): DeviceOutputCommand {
    return new DeviceOutputCommand(OutputType.Position, undefined, PercentOrSteps.createSteps(steps), undefined);
  }

  public percent(percent: number): DeviceOutputCommand {
    return new DeviceOutputCommand(OutputType.PositionWithDuration, undefined, PercentOrSteps.createPercent(percent), undefined);
  }
}

export class DeviceOutputPositionWithDurationConstructor {
  public steps(steps: number, duration: number): DeviceOutputCommand {
    return new DeviceOutputCommand(OutputType.Position, undefined, PercentOrSteps.createSteps(steps), duration);
  }

  public percent(percent: number, duration: number): DeviceOutputCommand {
    return new DeviceOutputCommand(OutputType.PositionWithDuration, undefined, PercentOrSteps.createPercent(percent), duration);
  }
}

export class DeviceOutput {
  private constructor() {}

  public static get Vibrate() {
    return new DeviceOutputValueConstructor(OutputType.Vibrate);
  }
  public static get Rotate() {
    return new DeviceOutputValueConstructor(OutputType.Rotate);
  }
  public static get Oscillate() {
    return new DeviceOutputValueConstructor(OutputType.Oscillate);
  }
  public static get Constrict() {
    return new DeviceOutputValueConstructor(OutputType.Constrict);
  }
  public static get Inflate() {
    return new DeviceOutputValueConstructor(OutputType.Inflate);
  }
  public static get Temperature() {
    return new DeviceOutputValueConstructor(OutputType.Temperature);
  }
  public static get Led() {
    return new DeviceOutputValueConstructor(OutputType.Led);
  }
  public static get Spray() {
    return new DeviceOutputValueConstructor(OutputType.Spray);
  }
  public static get Position() {
    return new DeviceOutputPositionConstructor();
  }
  public static get PositionWithDuration() {
    return new DeviceOutputPositionWithDurationConstructor();
  }
}


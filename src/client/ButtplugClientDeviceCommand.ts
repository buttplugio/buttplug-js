import { ButtplugDeviceError } from "../core/Exceptions";
import { OutputType } from "../core/Messages";

class PercentOrValue {
  private _percent: number | undefined;
  private _value: number | undefined;

  public get percent() {
    return this._percent;
  }

  public get value() {
    return this._value;
  }

  public static createValue(value: number): PercentOrValue {
    if (!Number.isFinite(value)) {
      throw new ButtplugDeviceError(`Output value ${value} is not finite`);
    }

    let v = new PercentOrValue;
    v._value = value;
    return v;
  }

  public static createPercent(p: number): PercentOrValue {
    if (p < 0 || p > 1.0) {
      throw new ButtplugDeviceError(`Percent value ${p} is not in the range 0.0 <= x <= 1.0`);
    }      

    let v = new PercentOrValue;
    v._percent = p;
    return v;
  }
}

export class DeviceOutputCommand {
  private constructor(
    private _outputType: OutputType,
    private _value: PercentOrValue,
    private _duration?: number,
  )
  {}

  public static createValue(outputType: OutputType, value: number, duration?: number): DeviceOutputCommand {
    return new DeviceOutputCommand(outputType, PercentOrValue.createValue(value), duration);
  }

  public static createPercent(outputType: OutputType, percent: number, duration?: number): DeviceOutputCommand {
    return new DeviceOutputCommand(outputType, PercentOrValue.createPercent(percent), duration);
  }

  public get outputType() {
    return this._outputType;
  }

  public get value() {
    return this._value.value;
  }

  public get percent() {
    return this._value.percent;
  }

  public get duration() {
    return this._duration;
  }
}

export class DeviceOutputValueConstructor {
  public constructor(
    private _outputType: OutputType) 
  {}

  public value(value: number): DeviceOutputCommand {
    return DeviceOutputCommand.createValue(this._outputType, value);
  }

  /** @deprecated Use value() for v4 output ranges. */
  public steps(steps: number): DeviceOutputCommand {
    return this.value(steps);
  }

  public percent(percent: number): DeviceOutputCommand {
    return DeviceOutputCommand.createPercent(this._outputType, percent);
  }
}

export class DeviceOutputPositionWithDurationConstructor {
  public value(value: number, duration: number): DeviceOutputCommand {
    return DeviceOutputCommand.createValue(OutputType.HwPositionWithDuration, value, duration);
  }

  /** @deprecated Use value() for v4 output ranges. */
  public steps(steps: number, duration: number): DeviceOutputCommand {
    return this.value(steps, duration);
  }

  public percent(percent: number, duration: number): DeviceOutputCommand {
    return DeviceOutputCommand.createPercent(OutputType.HwPositionWithDuration, percent, duration);
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
    return new DeviceOutputValueConstructor(OutputType.Position);
  }
  public static get PositionWithDuration() {
    return new DeviceOutputPositionWithDurationConstructor();
  }
  public static get HwPositionWithDuration() {
    return new DeviceOutputPositionWithDurationConstructor();
  }
}

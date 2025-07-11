/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

// tslint:disable:max-classes-per-file
'use strict';

import { instanceToPlain, Type } from 'class-transformer';
import 'reflect-metadata';
import {match, P} from 'ts-pattern';

export const SYSTEM_MESSAGE_ID = 0;
export const DEFAULT_MESSAGE_ID = 1;
export const MAX_ID = 4294967295;
export const MESSAGE_SPEC_VERSION = 4;

export enum FeatureType {
  Unknown = 'Unknown',
  Vibrate = 'Vibrate',
  Rotate = 'Rotate',
  Oscillate = 'Oscillate',
  Constrict = 'Constrict',
  Spray = 'Spray',
  Position = 'Position',
  PositionWithDuration = 'PositionWithDuration',
  RotateWithDirection = 'RotateWithDirection',
  Battery = 'Battery',
  RSSI = 'RSSI',
  Button = 'Button',
  Pressure = 'Pressure',
}

export enum OutputType {
  Unknown = 'Unknown',
  Vibrate = 'Vibrate',
  Rotate = 'Rotate',
  Oscillate = 'Oscillate',
  Constrict = 'Constrict',
  Spray = 'Spray',
  Position = 'Position',
  PositionWithDuration = 'PositionWithDuration',
  RotateWithDirection = 'RotateWithDirection',
}

export enum InputType {
  Unknown = 'Unknown',
  Battery = 'Battery',
  RSSI = 'RSSI',
  Button = 'Button',
  Pressure = 'Pressure',
  // Temperature,
  // Accelerometer,
  // Gyro,
}

export enum InputCommandType {
  Read = 'Read',
  Subscribe = 'Subscribe',
  Unsubscribe = 'Unsubscribe'
}

export abstract class ButtplugMessage {
  constructor(public Id: number) { }

  // tslint:disable-next-line:ban-types
  public get Type(): Function {
    return this.constructor;
  }

  public toJSON(): string {
    return JSON.stringify(this.toProtocolFormat());
  }

  public toProtocolFormat(): object {
    const jsonObj = {};
    jsonObj[(this.constructor as unknown as { Name: string }).Name] =
      instanceToPlain(this);
    return jsonObj;
  }

  public update() { }
}

export abstract class ButtplugDeviceMessage extends ButtplugMessage {
  constructor(public DeviceIndex: number, public Id: number) {
    super(Id);
  }
}

export abstract class ButtplugSystemMessage extends ButtplugMessage {
  constructor(public Id: number = SYSTEM_MESSAGE_ID) {
    super(Id);
  }
}

export class Ok extends ButtplugSystemMessage {
  static Name = 'Ok';

  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class Ping extends ButtplugMessage {
  static Name = 'Ping';

  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export enum ErrorClass {
  ERROR_UNKNOWN,
  ERROR_INIT,
  ERROR_PING,
  ERROR_MSG,
  ERROR_DEVICE,
}

export class Error extends ButtplugMessage {
  static Name = 'Error';

  constructor(
    public ErrorMessage: string,
    public ErrorCode: ErrorClass = ErrorClass.ERROR_UNKNOWN,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(Id);
  }
}

export class DeviceOutput {
  constructor(
    public StepCount: number
  ) {}
}

export class DeviceInput {
  constructor(
    public ValueRange: number[],
    public InputCommands: InputCommandType[],
  ) {}
}

export class DeviceFeature {
  public FeatureIndex: number;
  public Description: string;
  public FeatureType: FeatureType;
  
  @Type(() => DeviceOutput)
  public Output?: Map<OutputType, DeviceOutput>;
  public Input?: Map<InputType, DeviceInput>;

  constructor(featureIndex: number, description: string, feature: FeatureType, output?: Map<OutputType, DeviceOutput>, input?: Map<InputType, DeviceInput>) {
    this.FeatureIndex = featureIndex;
    this.Description = description;
    this.FeatureType = feature;
    this.Output = output;
    this.Input = input;
  };
}

export class DeviceInfo {
  public DeviceIndex: number;
  public DeviceName: string;
  public DeviceDisplayName?: string;
  public DeviceMessageTimingGap: number;
  @Type(() => DeviceFeature)
  public DeviceFeatures: DeviceFeature[];

  constructor(data: Partial<DeviceInfo>) {
    Object.assign(this, data);
  }
}

export class DeviceList extends ButtplugMessage {
  static Name = 'DeviceList';

  @Type(() => DeviceInfo)
  public Devices: DeviceInfo[];
  public Id: number;

  constructor(devices: DeviceInfo[], id: number = DEFAULT_MESSAGE_ID) {
    super(id);
    this.Devices = devices;
    this.Id = id;
  }
}

export class RequestDeviceList extends ButtplugMessage {
  static Name = 'RequestDeviceList';

  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class StartScanning extends ButtplugMessage {
  static Name = 'StartScanning';

  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class StopScanning extends ButtplugMessage {
  static Name = 'StopScanning';

  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class ScanningFinished extends ButtplugSystemMessage {
  static Name = 'ScanningFinished';

  constructor() {
    super();
  }
}

export class RequestServerInfo extends ButtplugMessage {
  static Name = 'RequestServerInfo';

  constructor(
    public ClientName: string,
    public ProtocolVersionMajor: number = 4,
    public ProtocolVersionMinor: number = 0,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(Id);
  }
}

export class ServerInfo extends ButtplugSystemMessage {
  static Name = 'ServerInfo';

  constructor(
    public ProtocolVersionMajor: number,
    public ProtocolVersionMinor: number,
    public MaxPingTime: number,
    public ServerName: string,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super();
  }
}

export class StopDeviceCmd extends ButtplugDeviceMessage {
  static Name = 'StopDeviceCmd';

  constructor(
    public DeviceIndex: number = -1,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class StopAllDevices extends ButtplugMessage {
  static Name = 'StopAllDevices';

  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class CommandValue {
  constructor(
    public Value: number
  ) { }
}

export class CommandPositionWithDuration {
  constructor(
    public Position: number,
    public Duration: number
  ) { }
}

export class CommandRotateWithDirection {
  constructor(
    public Value: number,
    public Clockwise: boolean
  ) { }
}

export class OutputCommand {
  public Vibrate: CommandValue | undefined;
  public Rotate: CommandValue | undefined;
  public Oscillate: CommandValue | undefined;
  public Constrict: CommandValue | undefined;
  public Spray: CommandValue | undefined;
  public Position: CommandValue | undefined;
  public PositionWithDuration: CommandPositionWithDuration | undefined;
  public RotateWithDirection: CommandRotateWithDirection | undefined;

  public static fromOutputTypeAndValue(type: OutputType, value: number): OutputCommand {
    let cmd = new OutputCommand();
    match(type)
      .with(OutputType.Vibrate, () => { cmd.Vibrate = new CommandValue(value) })
      .with(OutputType.Rotate, () => { cmd.Rotate= new CommandValue(value) })
      .with(OutputType.Oscillate, () => { cmd.Oscillate = new CommandValue(value) })
      .with(OutputType.Constrict, () => { cmd.Constrict = new CommandValue(value) })
      .with(OutputType.Spray, () => { cmd.Spray = new CommandValue(value) })
      .with(OutputType.Position, () => { cmd.Position = new CommandValue(value) })
      .otherwise(() => { throw "Not a Value OutputType!" });
    return cmd;
  }
}

export class OutputCmd extends ButtplugDeviceMessage {
  static Name = 'OutputCmd';

  constructor(
    public DeviceIndex: number,
    public FeatureIndex: number,
    public Command: OutputCommand,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id)
  }  
}

export class InputCmd extends ButtplugDeviceMessage {
  static Name = 'InputCmd';

  constructor(
    public DeviceIndex: number,
    public FeatureIndex: number,
    public InputType: InputType,
    public InputCommandType: InputCommandType,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class InputReadingDataValue {
  constructor(
    public Data: number
  ) {}
}

export class InputReadingData {
  public Battery: InputReadingDataValue | undefined;
  public Rssi: InputReadingDataValue| undefined;
  public Button: InputReadingDataValue | undefined;
  public Pressure: InputReadingDataValue | undefined;
}

export class InputReading extends ButtplugDeviceMessage {
  static Name = 'InputReading';

  constructor(
    public DeviceIndex: number,
    public SensorIndex: number,
    public SensorType: InputType,
    public Data: InputReadingData,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

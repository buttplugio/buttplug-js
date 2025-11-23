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

export const SYSTEM_MESSAGE_ID = 0;
export const DEFAULT_MESSAGE_ID = 1;
export const MAX_ID = 4294967295;
export const MESSAGE_SPEC_VERSION_MAJOR = 4;
export const MESSAGE_SPEC_VERSION_MINOR = 0;

// Base message interfaces

export abstract class ButtplugMessage {
  constructor(public Id: number) {}

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

  public update() {}
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

// Status Messages

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

  get Schemversion() {
    return 0;
  }
}

// Server Info Messages

export class RequestServerInfo extends ButtplugMessage {
  static Name = 'RequestServerInfo';

  constructor(
    public ClientName: string,
    public ProtocolMajorVersion: number = MESSAGE_SPEC_VERSION_MAJOR,
    public ProtocolMinorVersion: number = MESSAGE_SPEC_VERSION_MINOR,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(Id);
  }
}

export class ServerInfo extends ButtplugSystemMessage {
  static Name = 'ServerInfo';

  constructor(
    public MaxPingTime: number,
    public ServerName: string,
    public ProtocolMajorVersion: number,
    public ProtocolMinorVersion: number,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super();
  }
}

// Device Enumeration Messages

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

// Device Information Messages

export class DeviceInfo {
  public DeviceIndex: number;
  public DeviceName: string;
  @Type(() => DeviceFeature)
  public DeviceFeatures: DeviceFeature[];
  public DeviceDisplayName?: string;
  public DeviceMessageTimingGap?: number;

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

// Device Output Commands

export enum OutputType {
  Unknown = 'Unknown',
  Vibrate = 'Vibrate',
  Rotate = 'Rotate',
  Oscillate = 'Oscillate',
  Constrict = 'Constrict',
  Inflate = 'Inflate',
  Position = 'Position',
  PositionWithDuration = 'PositionWithDuration',
  Temperature = 'Temperature',
  Led = 'Led'
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
  Subscribe = 'Subscribe'
}

export class DeviceFeature {
  public FeatureDescriptor: string;
  public Outputs: Map<OutputType, DeviceFeatureOutput>;
  public Inputs: Map<InputType, DeviceFeatureInput>;
  public Index: number;
  constructor() {
  }
}

export class DeviceFeatureInput {
  public InputCommandType: InputCommandType[];
}

export class DeviceFeatureOutput {
  public Value: number | undefined;
  public Position: number | undefined;
  public Duration: number | undefined;
} 

export class OutputCmd extends ButtplugDeviceMessage {
  static Name = 'OutputCmd';

  constructor(
    public DeviceIndex: number = -1,
    public FeatureIndex: number = -1,
    public Command: Map<OutputType, DeviceFeatureOutput>,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

// Device Input Commands

export class InputCmd extends ButtplugDeviceMessage {
  static Name = 'InputCmd';

  constructor(
    public DeviceIndex: number,
    public FeatureIndex: number,
    public InputType: InputType,
    public InputCommandtype: InputCommandType,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class InputValue {
  Level: number;
}

export class InputReading extends ButtplugDeviceMessage {
  static Name = 'InputReading';

  constructor(
    public DeviceIndex: number,
    public FeatureIndex: number,
    public InputData: Map<InputType, InputValue>,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

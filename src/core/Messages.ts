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
export const MESSAGE_SPEC_VERSION = 3;

export class MessageAttributes {
  public ScalarCmd?: Array<GenericDeviceMessageAttributes>;
  public RotateCmd?: Array<GenericDeviceMessageAttributes>;
  public LinearCmd?: Array<GenericDeviceMessageAttributes>;
  public RawReadCmd?: RawDeviceMessageAttributes;
  public RawWriteCmd?: RawDeviceMessageAttributes;
  public RawSubscribeCmd?: RawDeviceMessageAttributes;
  public SensorReadCmd?: Array<SensorDeviceMessageAttributes>;
  public SensorSubscribeCmd?: Array<SensorDeviceMessageAttributes>;
  public StopDeviceCmd: {};

  constructor(data: Partial<MessageAttributes>) {
    Object.assign(this, data);
  }

  public update() {
    this.ScalarCmd?.forEach((x, i) => (x.Index = i));
    this.RotateCmd?.forEach((x, i) => (x.Index = i));
    this.LinearCmd?.forEach((x, i) => (x.Index = i));
    this.SensorReadCmd?.forEach((x, i) => (x.Index = i));
    this.SensorSubscribeCmd?.forEach((x, i) => (x.Index = i));
  }
}

export enum ActuatorType {
  Unknown = 'Unknown',
  Vibrate = 'Vibrate',
  Rotate = 'Rotate',
  Oscillate = 'Oscillate',
  Constrict = 'Constrict',
  Inflate = 'Inflate',
  Position = 'Position',
}

export enum SensorType {
  Unknown = 'Unknown',
  Battery = 'Battery',
  RSSI = 'RSSI',
  Button = 'Button',
  Pressure = 'Pressure',
  // Temperature,
  // Accelerometer,
  // Gyro,
}

export class GenericDeviceMessageAttributes {
  public FeatureDescriptor: string;
  public ActuatorType: ActuatorType;
  public StepCount: number;
  public Index = 0;
  constructor(data: Partial<GenericDeviceMessageAttributes>) {
    Object.assign(this, data);
  }
}

export class RawDeviceMessageAttributes {
  constructor(public Endpoints: Array<string>) {}
}

export class SensorDeviceMessageAttributes {
  public FeatureDescriptor: string;
  public SensorType: SensorType;
  public StepRange: Array<number>;
  public Index = 0;
  constructor(data: Partial<GenericDeviceMessageAttributes>) {
    Object.assign(this, data);
  }
}

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

export class DeviceInfo {
  public DeviceIndex: number;
  public DeviceName: string;
  @Type(() => MessageAttributes)
  public DeviceMessages: MessageAttributes;
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

  public update() {
    for (const device of this.Devices) {
      device.DeviceMessages.update();
    }
  }
}

export class DeviceAdded extends ButtplugSystemMessage {
  static Name = 'DeviceAdded';

  public DeviceIndex: number;
  public DeviceName: string;
  @Type(() => MessageAttributes)
  public DeviceMessages: MessageAttributes;
  public DeviceDisplayName?: string;
  public DeviceMessageTimingGap?: number;

  constructor(data: Partial<DeviceAdded>) {
    super();
    Object.assign(this, data);
  }

  public update() {
    this.DeviceMessages.update();
  }
}

export class DeviceRemoved extends ButtplugSystemMessage {
  static Name = 'DeviceRemoved';

  constructor(public DeviceIndex: number) {
    super();
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
    public MessageVersion: number = 0,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(Id);
  }
}

export class ServerInfo extends ButtplugSystemMessage {
  static Name = 'ServerInfo';

  constructor(
    public MessageVersion: number,
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

export class GenericMessageSubcommand {
  protected constructor(public Index: number) {}
}

export class ScalarSubcommand extends GenericMessageSubcommand {
  constructor(
    Index: number,
    public Scalar: number,
    public ActuatorType: ActuatorType
  ) {
    super(Index);
  }
}

export class ScalarCmd extends ButtplugDeviceMessage {
  static Name = 'ScalarCmd';

  constructor(
    public Scalars: ScalarSubcommand[],
    public DeviceIndex: number = -1,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class RotateSubcommand extends GenericMessageSubcommand {
  constructor(Index: number, public Speed: number, public Clockwise: boolean) {
    super(Index);
  }
}

export class RotateCmd extends ButtplugDeviceMessage {
  static Name = 'RotateCmd';

  public static Create(
    deviceIndex: number,
    commands: [number, boolean][]
  ): RotateCmd {
    const cmdList: RotateSubcommand[] = new Array<RotateSubcommand>();

    let i = 0;
    for (const [speed, clockwise] of commands) {
      cmdList.push(new RotateSubcommand(i, speed, clockwise));
      ++i;
    }

    return new RotateCmd(cmdList, deviceIndex);
  }
  constructor(
    public Rotations: RotateSubcommand[],
    public DeviceIndex: number = -1,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class VectorSubcommand extends GenericMessageSubcommand {
  constructor(Index: number, public Position: number, public Duration: number) {
    super(Index);
  }
}

export class LinearCmd extends ButtplugDeviceMessage {
  static Name = 'LinearCmd';

  public static Create(
    deviceIndex: number,
    commands: [number, number][]
  ): LinearCmd {
    const cmdList: VectorSubcommand[] = new Array<VectorSubcommand>();

    let i = 0;
    for (const cmd of commands) {
      cmdList.push(new VectorSubcommand(i, cmd[0], cmd[1]));
      ++i;
    }

    return new LinearCmd(cmdList, deviceIndex);
  }
  constructor(
    public Vectors: VectorSubcommand[],
    public DeviceIndex: number = -1,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class SensorReadCmd extends ButtplugDeviceMessage {
  static Name = 'SensorReadCmd';

  constructor(
    public DeviceIndex: number,
    public SensorIndex: number,
    public SensorType: SensorType,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class SensorReading extends ButtplugDeviceMessage {
  static Name = 'SensorReading';

  constructor(
    public DeviceIndex: number,
    public SensorIndex: number,
    public SensorType: SensorType,
    public Data: number[],
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class RawReadCmd extends ButtplugDeviceMessage {
  static Name = 'RawReadCmd';

  constructor(
    public DeviceIndex: number,
    public Endpoint: string,
    public ExpectedLength: number,
    public Timeout: number,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class RawWriteCmd extends ButtplugDeviceMessage {
  static Name = 'RawWriteCmd';

  constructor(
    public DeviceIndex: number,
    public Endpoint: string,
    public Data: Uint8Array,
    public WriteWithResponse: boolean,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class RawSubscribeCmd extends ButtplugDeviceMessage {
  static Name = 'RawSubscribeCmd';

  constructor(
    public DeviceIndex: number,
    public Endpoint: string,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class RawUnsubscribeCmd extends ButtplugDeviceMessage {
  static Name = 'RawUnsubscribeCmd';

  constructor(
    public DeviceIndex: number,
    public Endpoint: string,
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

export class RawReading extends ButtplugDeviceMessage {
  static Name = 'RawReading';

  constructor(
    public DeviceIndex: number,
    public Endpoint: string,
    public Data: number[],
    public Id: number = DEFAULT_MESSAGE_ID
  ) {
    super(DeviceIndex, Id);
  }
}

// tslint:disable:max-classes-per-file
"use strict";

import {classToPlain, plainToClass} from "class-transformer";
import "reflect-metadata";

export abstract class ButtplugMessage {

  constructor(public Id: number) {
  }

  abstract get SchemaVersion(): number;

  /***
   * Returns the message type name
   *
   * Usually, the message type name will be the same as the message class
   * constructor, so the constructor name is used by default. However, in
   * instances where a message has different versions (i.e. DeviceAddedVersion0
   * and DeviceAddedVersion1), we will need to override this to set the message
   * name.
   */
  public get Type(): string {
    return this.constructor.name;
  }

  /***
   * [DEPRECATED] Function version of the this.Type getter
   *
   */
  public getType(): string {
    return this.Type;
  }

  public toJSON(): string {
    return JSON.stringify(this.toProtocolFormat());
  }

  public toProtocolFormat(): object {
    const jsonObj = {};
    jsonObj[this.Type] = classToPlain(this);
    return jsonObj;
  }
}

export abstract class ButtplugDeviceMessage extends ButtplugMessage {
  constructor(public DeviceIndex: number,
              public Id: number) {
    super(Id);
  }
}

export abstract class ButtplugSystemMessage extends ButtplugMessage {
  constructor(public Id: number = 0) {
    super(Id);
  }
}

export class Ok extends ButtplugSystemMessage {
  constructor(public Id: number) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class Ping extends ButtplugMessage {
  constructor(public Id: number) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class Test extends ButtplugMessage {
  constructor(public TestString: string,
              public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export enum ErrorClass {
  ERROR_UNKNOWN,
  ERROR_INIT,
  ERROR_PING,
  ERROR_MSG,
  ERROR_DEVICE,
}

export class Error extends ButtplugSystemMessage {

  constructor(public ErrorMessage: string,
              public ErrorCode: ErrorClass = ErrorClass.ERROR_UNKNOWN,
              public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class DeviceInfo {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: object) {
  }
}

export class DeviceList extends ButtplugSystemMessage {
  constructor(public Devices: DeviceInfo[],
              public Id: number) {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class DeviceAdded extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: object) {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class DeviceRemoved extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number) {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class RequestDeviceList extends ButtplugMessage {
  constructor(public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class StartScanning extends ButtplugMessage {
  constructor(public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class StopScanning extends ButtplugMessage {
  constructor(public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class ScanningFinished extends ButtplugSystemMessage {
  constructor() {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class RequestLog extends ButtplugMessage {
  constructor(public LogLevel: string,
              public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class Log extends ButtplugSystemMessage {
  constructor(public LogLevel: string,
              public LogMessage: string) {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class RequestServerInfo extends ButtplugMessage {
  constructor(public ClientName: string, public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class ServerInfo extends ButtplugSystemMessage {
  constructor(public MajorVersion: number,
              public MinorVersion: number,
              public BuildVersion: number,
              public MessageVersion: number,
              public MaxPingTime: number,
              public ServerName: string,
              public Id: number = 1) {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class FleshlightLaunchFW12Cmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public Position: number,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class KiirooCmd extends ButtplugDeviceMessage {
  constructor(public Command: string = "0",
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  public SetPosition(aPos: number) {
    if (aPos >= 0 && aPos <= 4) {
      this.Command = String(Math.round(aPos));
    } else {
      this.Command = "0";
    }
  }

  public GetPosition(): number {
    const pos: number = Number(this.Command) ? Number(this.Command) : 0;
    if (pos < 0 || pos > 4 ) {
      return 0;
    } else {
      return Math.round(pos);
    }
  }

  get SchemaVersion() { return 0; }
}

export class SingleMotorVibrateCmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class StopDeviceCmd extends ButtplugDeviceMessage {
  constructor(public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class StopAllDevices extends ButtplugMessage {
  constructor(public Id: number = 1) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class LovenseCmd extends ButtplugDeviceMessage {
  constructor(public Command: string,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class VorzeA10CycloneCmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public Clockwise: boolean,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class SpeedSubcommand {
  constructor(public Index: number,
              public Speed: number) {
  }
}

export class VibrateCmd extends ButtplugDeviceMessage {
  constructor(public Speeds: SpeedSubcommand[],
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 1; }
}

export class RotateSubcommand {
  constructor(public Index: number,
              public Speed: number,
              public Clockwise: boolean) {
  }
}

export class RotateCmd extends ButtplugDeviceMessage {
  constructor(public Rotations: RotateSubcommand[],
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 1; }
}

export class VectorSubcommand {
  constructor(public Index: number,
              public Position: number,
              public Duration: number) {
  }
}

export class LinearCmd extends ButtplugDeviceMessage {
  constructor(public Vectors: VectorSubcommand[],
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 1; }
}

export const Messages = {
  DeviceAdded,
  DeviceList,
  DeviceRemoved,
  Error,
  FleshlightLaunchFW12Cmd,
  KiirooCmd,
  LinearCmd,
  Log,
  LovenseCmd,
  Ok,
  Ping,
  RequestDeviceList,
  RequestLog,
  RequestServerInfo,
  RotateCmd,
  ScanningFinished,
  ServerInfo,
  SingleMotorVibrateCmd,
  StartScanning,
  StopAllDevices,
  StopDeviceCmd,
  StopScanning,
  Test,
  VibrateCmd,
  VorzeA10CycloneCmd,
};

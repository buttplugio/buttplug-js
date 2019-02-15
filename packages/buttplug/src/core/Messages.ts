// tslint:disable:max-classes-per-file
"use strict";

import {classToPlain, plainToClass} from "class-transformer";
import { ButtplugMessageException } from "./Exceptions";
import "reflect-metadata";

export const SYSTEM_MESSAGE_ID = 0;
export const DEFAULT_MESSAGE_ID = 1;
export const MAX_ID = 4294967295;

export abstract class ButtplugMessage {

  constructor(public Id: number) {
  }

  abstract get SchemaVersion(): number;

  public DowngradeMessage(): ButtplugMessage {
    throw new ButtplugMessageException("Message version downgrade required, but not defined for this message type.",
                                       this.Id);
  }

  /***
   * Returns the message type name
   *
   * Usually, the message type name will be the same as the message class
   * constructor, so the constructor name is used by default. However, in
   * instances where a message has different versions (i.e. DeviceAddedVersion0
   * and DeviceAddedVersion1), we will need to override this to set the message
   * name.
   */
  // tslint:disable-next-line:ban-types
  public get Type(): Function {
    return this.constructor;
  }

  /***
   * [DEPRECATED] Function version of the this.Type getter
   *
   */
  // tslint:disable-next-line:ban-types
  public getType(): Function {
    return this.Type;
  }

  public toJSON(): string {
    return JSON.stringify(this.toProtocolFormat());
  }

  public toProtocolFormat(): object {
    const jsonObj = {};
    jsonObj[this.Type.name] = classToPlain(this);
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
  constructor(public Id: number = SYSTEM_MESSAGE_ID) {
    super(Id);
  }
}

export class Ok extends ButtplugSystemMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }

  get SchemaVersion() { return 0; }

}

export class Ping extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class Test extends ButtplugMessage {
  constructor(public TestString: string,
              public Id: number = DEFAULT_MESSAGE_ID) {
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
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

/***
 * DeviceInfo Message class from v0 spec
 *
 * Uses a string array for messages, instead of a specifications object.
 */
export class DeviceInfo {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: string[]) {
  }
}

export class DeviceListVersion0 extends ButtplugSystemMessage {
  constructor(public Devices: DeviceInfo[],
              public Id: number) {
    super();
  }

  // tslint:disable-next-line:ban-types
  public get Type(): Function {
    return DeviceList.constructor;
  }
  get SchemaVersion() { return 0; }
}

export class DeviceInfoWithSpecifications {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: object) {
  }
}

export class DeviceList extends ButtplugSystemMessage {
  constructor(public Devices: DeviceInfoWithSpecifications[],
              public Id: number) {
    super();
  }

  public DowngradeMessage(): ButtplugMessage {
    // This is going to look mostly the same, we just need to reduce our devices
    // down to use string message lists instead of specification lists.
    const oldDevices: DeviceInfo[] = [];
    for (const newDevice of this.Devices) {
      oldDevices.push(new DeviceInfo(newDevice.DeviceIndex,
                                     newDevice.DeviceName,
                                     Object.keys(newDevice.DeviceMessages)));
    }
    return new DeviceListVersion0(oldDevices, this.Id);
  }

  get SchemaVersion() { return 1; }
}

export class DeviceAddedVersion0 extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: string[]) {
    super();
  }

  // This is used to fool our type checkers into thinking we're the canonical
  // version of the message. Gross, but necessary unless we want to use strings
  // (which we don't).
  // tslint:disable-next-line:ban-types
  public get Type(): Function {
    return DeviceAdded.constructor;
  }

  get SchemaVersion() { return 0; }
}

export class DeviceAdded extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: object) {
    super();
  }

  get SchemaVersion() { return 1; }

  public DowngradeMessage(): ButtplugMessage {
    // This is going to look mostly the same, we just need to reduce our devices
    // down to use string message lists instead of specification lists.
    return new DeviceAddedVersion0(this.DeviceIndex,
                                   this.DeviceName,
                                   Object.keys(this.DeviceMessages));
  }
}

export class DeviceRemoved extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number) {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class RequestDeviceList extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class StartScanning extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class StopScanning extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
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
              public Id: number = DEFAULT_MESSAGE_ID) {
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
  constructor(public ClientName: string, public MessageVersion: number = 0, public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }

  get SchemaVersion() { return 1; }
}

export class ServerInfo extends ButtplugSystemMessage {
  constructor(public MajorVersion: number,
              public MinorVersion: number,
              public BuildVersion: number,
              public MessageVersion: number,
              public MaxPingTime: number,
              public ServerName: string,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super();
  }

  get SchemaVersion() { return 0; }
}

export class FleshlightLaunchFW12Cmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public Position: number,
              public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class KiirooCmd extends ButtplugDeviceMessage {
  public Command: string = "0";
  constructor(aCommand: number = 0,
              public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
    this.Command = String(aCommand);
  }

  public set Position(aPos: number) {
    if (aPos >= 0 && aPos <= 4) {
      this.Command = String(Math.round(aPos));
    } else {
      this.Command = "0";
    }
  }

  public get Position(): number {
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
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class StopDeviceCmd extends ButtplugDeviceMessage {
  constructor(public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class StopAllDevices extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }

  get SchemaVersion() { return 0; }
}

export class LovenseCmd extends ButtplugDeviceMessage {
  constructor(public Command: string,
              public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class VorzeA10CycloneCmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public Clockwise: boolean,
              public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }

  get SchemaVersion() { return 0; }
}

export class GenericMessageSubcommand {
  protected constructor(public Index: number) {}
}

export class SpeedSubcommand extends GenericMessageSubcommand {
  constructor(Index: number,
              public Speed: number) {
    super(Index);
  }
}

export class VibrateCmd extends ButtplugDeviceMessage {

  get SchemaVersion() { return 1; }

  public static Create(aDeviceIndex: number,
                       aSpeeds: number[]): VibrateCmd {
    const cmdList: SpeedSubcommand[] = new Array<SpeedSubcommand>();

    let i = 0;
    for (const speed of aSpeeds) {
      cmdList.push(new SpeedSubcommand(i, speed));
      ++i;
    }

    return new VibrateCmd(cmdList, aDeviceIndex, DEFAULT_MESSAGE_ID);
  }
  constructor(public Speeds: SpeedSubcommand[],
              public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }
}

export class RotateSubcommand extends GenericMessageSubcommand {

  public static Create(aDeviceIndex: number,
                       aSpeeds: number[]): VibrateCmd {
    const cmdList: SpeedSubcommand[] = new Array<SpeedSubcommand>();

    let i = 0;
    for (const speed of aSpeeds) {
      cmdList.push(new SpeedSubcommand(i, speed));
      ++i;
    }

    return new VibrateCmd(cmdList, aDeviceIndex);
  }
  constructor(Index: number,
              public Speed: number,
              public Clockwise: boolean) {
    super(Index);
  }
}

export class RotateCmd extends ButtplugDeviceMessage {

  get SchemaVersion() { return 1; }

  public static Create(aDeviceIndex: number,
                       aCommands: Array<[number, boolean]>): RotateCmd {
    const cmdList: RotateSubcommand[] = new Array<RotateSubcommand>();

    let i = 0;
    for (const cmd of aCommands) {
      cmdList.push(new RotateSubcommand(i, cmd[0], cmd[1]));
      ++i;
    }

    return new RotateCmd(cmdList, aDeviceIndex);
  }
  constructor(public Rotations: RotateSubcommand[],
              public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }
}

export class VectorSubcommand extends GenericMessageSubcommand {
  constructor(Index: number,
              public Position: number,
              public Duration: number) {
    super(Index);
  }
}

export class LinearCmd extends ButtplugDeviceMessage {

  get SchemaVersion() { return 1; }

  public static Create(aDeviceIndex: number,
                       aCommands: Array<[number, number]>): LinearCmd {
    const cmdList: VectorSubcommand[] = new Array<VectorSubcommand>();

    let i = 0;
    for (const cmd of aCommands) {
      cmdList.push(new VectorSubcommand(i, cmd[0], cmd[1]));
      ++i;
    }

    return new LinearCmd(cmdList, aDeviceIndex);
  }
  constructor(public Vectors: VectorSubcommand[],
              public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }
}

export class MessageAttributes {
  constructor(public FeatureCount: number) {
  }
}

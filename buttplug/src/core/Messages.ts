/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

// tslint:disable:max-classes-per-file
"use strict";

import {classToPlain, plainToClass} from "class-transformer";
import { ButtplugMessageException } from "./Exceptions";
import "reflect-metadata";

export const SYSTEM_MESSAGE_ID = 0;
export const DEFAULT_MESSAGE_ID = 1;
export const MAX_ID = 4294967295;
export const MESSAGE_SPEC_VERSION = 1;

export abstract class ButtplugMessage {

  constructor(public Id: number) {
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
}

export class Ping extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class Test extends ButtplugMessage {
  constructor(public TestString: string,
              public Id: number = DEFAULT_MESSAGE_ID) {
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

export class Error extends ButtplugSystemMessage {

  constructor(public ErrorMessage: string,
              public ErrorCode: ErrorClass = ErrorClass.ERROR_UNKNOWN,
              public Id: number = DEFAULT_MESSAGE_ID) {
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
}

export class DeviceAdded extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: object) {
    super();
  }
}

export class DeviceRemoved extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number) {
    super();
  }
}

export class RequestDeviceList extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class StartScanning extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class StopScanning extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class ScanningFinished extends ButtplugSystemMessage {
  constructor() {
    super();
  }
}

export class RequestLog extends ButtplugMessage {
  constructor(public LogLevel: string,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class Log extends ButtplugSystemMessage {
  constructor(public LogLevel: string,
              public LogMessage: string) {
    super();
  }
}

export class RequestServerInfo extends ButtplugMessage {
  constructor(public ClientName: string, public MessageVersion: number = 0, public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
}

export class ServerInfo extends ButtplugSystemMessage {
  constructor(public MessageVersion: number,
              public MaxPingTime: number,
              public ServerName: string,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super();
  }
}

export class StopDeviceCmd extends ButtplugDeviceMessage {
  constructor(public DeviceIndex: number = -1,
              public Id: number = DEFAULT_MESSAGE_ID) {
    super(DeviceIndex, Id);
  }
}

export class StopAllDevices extends ButtplugMessage {
  constructor(public Id: number = DEFAULT_MESSAGE_ID) {
    super(Id);
  }
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

  public static Create(aDeviceIndex: number,
                       aCommands: [number, boolean][]): RotateCmd {
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

  public static Create(aDeviceIndex: number,
                       aCommands: [number, number][]): LinearCmd {
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

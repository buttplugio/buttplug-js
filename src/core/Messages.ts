// tslint:disable:max-classes-per-file
"use strict";

import {classToPlain, plainToClass} from "class-transformer";
import * as ajv from "ajv";
import "reflect-metadata";
const buttplugSchema = require("../../dependencies/buttplug-schema/schema/buttplug-schema.json");

export class ButtplugMessage {

  constructor(public Id: number) {
  }

  public getType(): string {
    return this.constructor.name;
  }

  public toJSON(): string {
    const jsonObj = {};
    const instance: any = this.constructor;
    jsonObj[instance.name] = classToPlain(this);
    return JSON.stringify(jsonObj);
  }
}

export class ButtplugDeviceMessage extends ButtplugMessage {
  constructor(public DeviceIndex: number,
              public Id: number) {
    super(Id);
  }
}

export class ButtplugSystemMessage extends ButtplugMessage {
  constructor(public Id: number = 0) {
    super(Id);
  }
}

export class Ok extends ButtplugSystemMessage {
  constructor(public Id: number) {
    super(Id);
  }
}

export class Ping extends ButtplugMessage {
  constructor(public Id: number) {
    super(Id);
  }
}

export class Test extends ButtplugMessage {
  constructor(public TestString: string,
              public Id: number = 1) {
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
                public Id: number = 1) {
    super(Id);
  }
}

export class DeviceInfo {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: string[]) {
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
              public DeviceMessages: string[]) {
    super();
  }
}

export class DeviceRemoved extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number) {
    super();
  }
}

export class RequestDeviceList extends ButtplugMessage {
  constructor(public Id: number = 1) {
    super(Id);
  }
}

export class StartScanning extends ButtplugMessage {
  constructor(public Id: number = 1) {
    super(Id);
  }
}

export class StopScanning extends ButtplugMessage {
    constructor(public Id: number = 1) {
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
              public Id: number = 1) {
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
  constructor(public ClientName: string, public Id: number = 1) {
    super(Id);
  }
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
}

export class FleshlightLaunchFW12Cmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public Position: number,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }
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
}

export class SingleMotorVibrateCmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }
}

export class StopDeviceCmd extends ButtplugDeviceMessage {
  constructor(public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }
}

export class StopAllDevices extends ButtplugMessage {
  constructor(public Id: number = 1) {
    super(Id);
  }
}

export class LovenseCmd extends ButtplugDeviceMessage {
  constructor(public Command: string,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }
}

export class VorzeA10CycloneCmd extends ButtplugDeviceMessage {
  constructor(public Speed: string,
              public Clockwise: boolean,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }
}

const Messages = {
  DeviceAdded,
  DeviceList,
  DeviceRemoved,
  Error,
  FleshlightLaunchFW12Cmd,
  KiirooCmd,
  Log,
  LovenseCmd,
  Ok,
  Ping,
  RequestDeviceList,
  RequestLog,
  RequestServerInfo,
  ScanningFinished,
  ServerInfo,
  SingleMotorVibrateCmd,
  StartScanning,
  StopAllDevices,
  StopDeviceCmd,
  StopScanning,
  Test,
  VorzeA10CycloneCmd,
};

const jsonValidator = ajv().compile(buttplugSchema);

export function FromJSON(str): ButtplugMessage[] {
  const msgarray = JSON.parse(str);
  if (!jsonValidator(msgarray)) {
    // Relay validator errors as an error message locally.
    const errorString = jsonValidator.errors!.map((error) => error.message).join("; ");
    return [new Error(errorString, ErrorClass.ERROR_MSG, 0)];
  }
  const msgs: ButtplugMessage[] = [];
  for (const x of Array.from(msgarray)) {
    // Can't get this to resolve nicely as a type, so just start from any and cast
    // after. Not sure how to resolve plainToClass to a type since this is
    // dynamic.
    const msg: any = plainToClass(Messages[Object.getOwnPropertyNames(x)[0]],
                                 x[Object.getOwnPropertyNames(x)[0]]);
    msgs.push(msg as ButtplugMessage);
  }
  return msgs;
}

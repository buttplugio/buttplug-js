"use strict";

import {classToPlain, plainToClass} from "class-transformer";
import "reflect-metadata";

export class ButtplugMessage {

  constructor(public Id: number) {
  }

  public getType(): string {
    return this.constructor.name;
  }

  public toJSON(): string {
    const json_obj = {};
    const instance: any = this.constructor;
    json_obj[instance.name] = classToPlain(this);
    return JSON.stringify(json_obj);
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

export class DeviceInfo
{
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
  constructor(public Position: number,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
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

const Messages = {
  Ok,
  Ping,
  Test,
  Error,
  DeviceList,
  DeviceAdded,
  DeviceRemoved,
  RequestDeviceList,
  StartScanning,
  StopScanning,
  ScanningFinished,
  RequestLog,
  Log,
  RequestServerInfo,
  ServerInfo,
  FleshlightLaunchFW12Cmd,
  KiirooCmd,
  StopDeviceCmd,
  StopAllDevices,
  SingleMotorVibrateCmd,
  LovenseCmd,
};

export function FromJSON(str): ButtplugMessage[] {
  // TODO We're assuming we'll always get valid json here. While it should pass
  // through the schema parser first, it'd probably be good to make sure it
  // deals with parse failures too.
  const msgarray = JSON.parse(str);
  const msgs: ButtplugMessage[] = [];
  for (const x of Array.from(msgarray)) {
    // Can't get this to resolve nicely as a type, so just start from any and cast
    // after. Not sure how to resolve plainToClass to a type since this is
    // dynamic.
    const msg: any = plainToClass(Messages[Object.getOwnPropertyNames(x)[0]],
                                 x[Object.getOwnPropertyNames(x)[0]]);
    msgs.push(msg as ButtplugMessage);
  }
  if (msgs.length == 0) {
    // Backup in case the server sent us a single object outside of an array.
    // Accoring to the schema, this should be illegal, so once schema checking
    // is added this should become dead code.
    const msg: any = plainToClass(Messages[Object.getOwnPropertyNames(msgarray)[0]],
                                msgarray[Object.getOwnPropertyNames(msgarray)[0]]);
    msgs.push(msg as ButtplugMessage);
  }
  return msgs;
}

'use strict';

import 'reflect-metadata';
import {plainToClass, classToPlain} from 'class-transformer';

export class ButtplugMessage {

  constructor(public Id: number) {
  }

  public getType() : string {
    return this.constructor.name;
  }

  public toJSON() : string {
    let json_obj = {};
    let instance: any = this.constructor;
    json_obj[instance.name] = classToPlain(this);
    return JSON.stringify(json_obj);
  }
}

export class ButtplugDeviceMessage extends ButtplugMessage {
  constructor(public DeviceIndex: number,
              public Id: number) {
    super(Id)
  }
}

export class ButtplugSystemMessage extends ButtplugMessage {
  constructor(public Id: number = 0) {
    super(Id)
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

export class Error extends ButtplugSystemMessage {
  constructor(public ErrorMessage: string,
              public Id: number = 1) {
    super(Id);
  }
}

export class DeviceInfo
{
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: Array<string>) {
  }
}


export class DeviceList extends ButtplugSystemMessage {
  constructor(public Devices: Array<DeviceInfo>,
              public Id: number) {
    super();
  }
}

export class DeviceAdded extends ButtplugSystemMessage {
  constructor(public DeviceIndex: number,
              public DeviceName: string,
              public DeviceMessages: Array<string>) {
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
  constructor(public Id: number = 1) {
    super(Id);
  }
}

export class ServerInfo extends ButtplugSystemMessage {
  constructor(public MajorVersion: number,
              public MinorVersion: number,
              public BuildVersion: number,
              public Id: number = 1) {
    super();
  }
}

export class FleshlightLaunchRawCmd extends ButtplugDeviceMessage {
  constructor(public Speed: number,
              public Position: number,
              public DeviceIndex: number = -1,
              public Id: number = 1) {
    super(DeviceIndex, Id);
  }
}

export class KiirooRawCmd extends ButtplugDeviceMessage {
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

let Messages = {
  Ok: Ok,
  Ping: Ping,
  Test: Test,
  Error: Error,
  DeviceList: DeviceList,
  DeviceAdded: DeviceAdded,
  DeviceRemoved: DeviceRemoved,
  RequestDeviceList: RequestDeviceList,
  StartScanning: StartScanning,
  StopScanning: StopScanning,
  RequestLog: RequestLog,
  Log: Log,
  RequestServerInfo: RequestServerInfo,
  ServerInfo: ServerInfo,
  FleshlightLaunchRawCmd: FleshlightLaunchRawCmd,
  KiirooRawCmd: KiirooRawCmd,
  SingleMotorVibrateCmd: SingleMotorVibrateCmd
};

export function FromJSON(str) : Array<ButtplugMessage> {
  // TODO We're assuming we'll always get valid json here. While it should pass
  // through the schema parser first, it'd probably be good to make sure it
  // deals with parse failures too.
  let msgarray = JSON.parse(str);
  let msgs : Array<ButtplugMessage> = [];
  for (let x of Array.from(msgarray)) {
    // Can't get this to resolve nicely as a type, so just start from any and cast
    // after. Not sure how to resolve plainToClass to a type since this is
    // dynamic.
    let msg : any = plainToClass(Messages[Object.getOwnPropertyNames(x)[0]],
                                 x[Object.getOwnPropertyNames(x)[0]]);
    msgs.push(msg as ButtplugMessage);
  }
  return msgs;
}


'use strict';

class ButtplugMessage
{
  constructor(Id)
  {
    this.Id = Id;
    Object.preventExtensions(this);
    if (typeof(Id) === "object")
    {
      Object.getOwnPropertyNames(Id).forEach((n) => this[n] = Id[n]);
    }
  }

  toJSON()
  {
    let json_obj = {};
    let val_obj = {};
    Object.getOwnPropertyNames(this).forEach((n) => val_obj[n] = this[n]);
    json_obj[this.constructor.name] = val_obj;
    return JSON.stringify(json_obj);
  }
}

class Ok extends ButtplugMessage
{
  constructor(Id)
  {
    super(Id);
  }

  static FromJSON(str)
  {
    let b = new Ok(1);
    return b;
  }
}

class Ping extends ButtplugMessage
{
  constructor(Id)
  {
    super(Id);
  }
}

class Test extends ButtplugMessage
{
  constructor(Id, TestString)
  {
    super(Id);
    this.TestString = TestString;
  }
}

class Error extends ButtplugMessage
{
  constructor(Id, ErrorMessage)
  {
    super(Id);
    this.ErrorMessage = ErrorMessage;
  }
}

class DeviceList extends ButtplugMessage
{
  constructor(Id, Devices)
  {
    super(Id);
    this.Devices = Devices;
  }
}

class DeviceAdded extends ButtplugMessage
{
  constructor(Id, Index, Name, Messages)
  {
    super(Id);
    this.DeviceIndex = Index;
    this.DeviceName = Name;
    this.DeviceMessages = Messages;
  }
}

class DeviceRemoved extends ButtplugMessage
{
  constructor(Id, Index)
  {
    super(Id);
    this.DeviceIndex = Index;
  }
}

class RequestDeviceList extends ButtplugMessage
{
  constructor(Id)
  {
    super(Id);
  }
}

class StartScanning extends ButtplugMessage
{
  constructor(Id)
  {
    super(Id);
  }
}

class StopScanning extends ButtplugMessage
{
  constructor(Id)
  {
    super(Id);
  }
}

class RequestLog extends ButtplugMessage
{
  constructor(Id, LogLevel)
  {
    this.LogLevel = LogLevel;
    super(Id);
  }
}

class Log extends ButtplugMessage
{
  constructor(Id, LogLevel, LogMessage)
  {
    this.LogLevel = LogLevel;
    this.LogMessage = LogMessage;
    super(Id);
  }
}

class RequestServerInfo extends ButtplugMessage
{
  constructor(Id)
  {
    super(Id);
  }
}

class ServerInfo extends ButtplugMessage
{
  constructor(Id, MajorVersion, MinorVersion, BuildVersion)
  {
    this.MajorVersion = MajorVersion;
    this.MinorVersion = MinorVersion;
    this.BuildVersion = BuildVersion;
    super(Id);
  }
}

class FleshlightLaunchRawCmd extends ButtplugMessage
{
  constructor(Id, Speed, Position)
  {
    this.Speed = Speed;
    this.Position = Position;
    super(Id);
  }
}

class KiirooRawCmd extends ButtplugMessage
{
  constructor(Id, Position)
  {
    this.Position = Position;
    super(Id);
  }
}

class SingleMotorVibrateCmd extends ButtplugMessage
{
  constructor(Id, Speed)
  {
    this.Speed = Speed;
    super(Id);
  }
}


let Messages = {
  Ok : Ok,
  Ping : Ping,
  Test : Test,
  Error : Error,
  DeviceList : DeviceList,
  DeviceAdded : DeviceAdded,
  DeviceRemoved : DeviceRemoved,
  RequestDeviceList : RequestDeviceList,
  StartScanning : StartScanning,
  StopScanning : StopScanning,
  RequestLog : RequestLog,
  Log : Log,
  RequestServerInfo : RequestServerInfo,
  ServerInfo : ServerInfo,
  FleshlightLaunchRawCmd : FleshlightLaunchRawCmd,
  KiirooRawCmd : KiirooRawCmd,
  SingleMotorVibrateCmd : SingleMotorVibrateCmd
};

let test_json = '[{"Ok":{"Id": 1}}]';

let msg_array = JSON.parse(test_json);

for (let msg of msg_array)
{
  console.log(typeof(msg));
  console.log(Object.getOwnPropertyNames(msg)[0]);
  console.log(Object.keys(msg));
  console.log(new Messages[Object.getOwnPropertyNames(msg)[0]](msg.Ok));
  let m = Messages[Object.getOwnPropertyNames(msg)[0]].FromJSON(msg.Ok);
}
{}

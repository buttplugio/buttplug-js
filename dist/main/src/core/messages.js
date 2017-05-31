'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
class ButtplugMessage {
    constructor(Id) {
        this.Id = Id;
    }
    getType() {
        return this.constructor.name;
    }
    toJSON() {
        let json_obj = {};
        let instance = this.constructor;
        json_obj[instance.name] = class_transformer_1.classToPlain(this);
        return JSON.stringify(json_obj);
    }
}
exports.ButtplugMessage = ButtplugMessage;
class ButtplugDeviceMessage extends ButtplugMessage {
    constructor(DeviceIndex, Id) {
        super(Id);
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
}
exports.ButtplugDeviceMessage = ButtplugDeviceMessage;
class ButtplugSystemMessage extends ButtplugMessage {
    constructor(Id = 0) {
        super(Id);
        this.Id = Id;
    }
}
exports.ButtplugSystemMessage = ButtplugSystemMessage;
class Ok extends ButtplugSystemMessage {
    constructor(Id) {
        super(Id);
        this.Id = Id;
    }
}
exports.Ok = Ok;
class Ping extends ButtplugMessage {
    constructor(Id) {
        super(Id);
        this.Id = Id;
    }
}
exports.Ping = Ping;
class Test extends ButtplugMessage {
    constructor(TestString, Id = 1) {
        super(Id);
        this.TestString = TestString;
        this.Id = Id;
    }
}
exports.Test = Test;
class Error extends ButtplugSystemMessage {
    constructor(ErrorMessage, Id = 1) {
        super(Id);
        this.ErrorMessage = ErrorMessage;
        this.Id = Id;
    }
}
exports.Error = Error;
class DeviceInfo {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
}
exports.DeviceInfo = DeviceInfo;
class DeviceList extends ButtplugSystemMessage {
    constructor(Devices, Id) {
        super();
        this.Devices = Devices;
        this.Id = Id;
    }
}
exports.DeviceList = DeviceList;
class DeviceAdded extends ButtplugSystemMessage {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        super();
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
}
exports.DeviceAdded = DeviceAdded;
class DeviceRemoved extends ButtplugSystemMessage {
    constructor(DeviceIndex) {
        super();
        this.DeviceIndex = DeviceIndex;
    }
}
exports.DeviceRemoved = DeviceRemoved;
class RequestDeviceList extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
}
exports.RequestDeviceList = RequestDeviceList;
class StartScanning extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
}
exports.StartScanning = StartScanning;
class StopScanning extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
}
exports.StopScanning = StopScanning;
class RequestLog extends ButtplugMessage {
    constructor(LogLevel, Id = 1) {
        super(Id);
        this.LogLevel = LogLevel;
        this.Id = Id;
    }
}
exports.RequestLog = RequestLog;
class Log extends ButtplugSystemMessage {
    constructor(LogLevel, LogMessage) {
        super();
        this.LogLevel = LogLevel;
        this.LogMessage = LogMessage;
    }
}
exports.Log = Log;
class RequestServerInfo extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
}
exports.RequestServerInfo = RequestServerInfo;
class ServerInfo extends ButtplugSystemMessage {
    constructor(MajorVersion, MinorVersion, BuildVersion, Id = 1) {
        super();
        this.MajorVersion = MajorVersion;
        this.MinorVersion = MinorVersion;
        this.BuildVersion = BuildVersion;
        this.Id = Id;
    }
}
exports.ServerInfo = ServerInfo;
class FleshlightLaunchRawCmd extends ButtplugDeviceMessage {
    constructor(Speed, Position, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.Position = Position;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
}
exports.FleshlightLaunchRawCmd = FleshlightLaunchRawCmd;
class KiirooRawCmd extends ButtplugDeviceMessage {
    constructor(Position, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Position = Position;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
}
exports.KiirooRawCmd = KiirooRawCmd;
class SingleMotorVibrateCmd extends ButtplugDeviceMessage {
    constructor(Speed, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
}
exports.SingleMotorVibrateCmd = SingleMotorVibrateCmd;
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
function FromJSON(str) {
    // TODO We're assuming we'll always get valid json here. While it should pass
    // through the schema parser first, it'd probably be good to make sure it
    // deals with parse failures too.
    let msgarray = JSON.parse(str);
    let msgs = [];
    for (let x of Array.from(msgarray)) {
        // Can't get this to resolve nicely as a type, so just start from any and cast
        // after. Not sure how to resolve plainToClass to a type since this is
        // dynamic.
        let msg = class_transformer_1.plainToClass(Messages[Object.getOwnPropertyNames(x)[0]], x[Object.getOwnPropertyNames(x)[0]]);
        msgs.push(msg);
    }
    return msgs;
}
exports.FromJSON = FromJSON;
//# sourceMappingURL=messages.js.map
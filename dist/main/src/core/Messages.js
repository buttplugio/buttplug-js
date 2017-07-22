// tslint:disable:max-classes-per-file
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_1 = require("class-transformer");
var ajv = require("ajv");
require("reflect-metadata");
var buttplugSchema = require("../../dependencies/buttplug-schema/schema/buttplug-schema.json");
var ButtplugMessage = (function () {
    function ButtplugMessage(Id) {
        this.Id = Id;
    }
    ButtplugMessage.prototype.getType = function () {
        return this.constructor.name;
    };
    ButtplugMessage.prototype.toJSON = function () {
        var jsonObj = {};
        var instance = this.constructor;
        jsonObj[instance.name] = class_transformer_1.classToPlain(this);
        return JSON.stringify(jsonObj);
    };
    return ButtplugMessage;
}());
exports.ButtplugMessage = ButtplugMessage;
var ButtplugDeviceMessage = (function (_super) {
    __extends(ButtplugDeviceMessage, _super);
    function ButtplugDeviceMessage(DeviceIndex, Id) {
        var _this = _super.call(this, Id) || this;
        _this.DeviceIndex = DeviceIndex;
        _this.Id = Id;
        return _this;
    }
    return ButtplugDeviceMessage;
}(ButtplugMessage));
exports.ButtplugDeviceMessage = ButtplugDeviceMessage;
var ButtplugSystemMessage = (function (_super) {
    __extends(ButtplugSystemMessage, _super);
    function ButtplugSystemMessage(Id) {
        if (Id === void 0) { Id = 0; }
        var _this = _super.call(this, Id) || this;
        _this.Id = Id;
        return _this;
    }
    return ButtplugSystemMessage;
}(ButtplugMessage));
exports.ButtplugSystemMessage = ButtplugSystemMessage;
var Ok = (function (_super) {
    __extends(Ok, _super);
    function Ok(Id) {
        var _this = _super.call(this, Id) || this;
        _this.Id = Id;
        return _this;
    }
    return Ok;
}(ButtplugSystemMessage));
exports.Ok = Ok;
var Ping = (function (_super) {
    __extends(Ping, _super);
    function Ping(Id) {
        var _this = _super.call(this, Id) || this;
        _this.Id = Id;
        return _this;
    }
    return Ping;
}(ButtplugMessage));
exports.Ping = Ping;
var Test = (function (_super) {
    __extends(Test, _super);
    function Test(TestString, Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.TestString = TestString;
        _this.Id = Id;
        return _this;
    }
    return Test;
}(ButtplugMessage));
exports.Test = Test;
var ErrorClass;
(function (ErrorClass) {
    ErrorClass[ErrorClass["ERROR_UNKNOWN"] = 0] = "ERROR_UNKNOWN";
    ErrorClass[ErrorClass["ERROR_INIT"] = 1] = "ERROR_INIT";
    ErrorClass[ErrorClass["ERROR_PING"] = 2] = "ERROR_PING";
    ErrorClass[ErrorClass["ERROR_MSG"] = 3] = "ERROR_MSG";
    ErrorClass[ErrorClass["ERROR_DEVICE"] = 4] = "ERROR_DEVICE";
})(ErrorClass = exports.ErrorClass || (exports.ErrorClass = {}));
var Error = (function (_super) {
    __extends(Error, _super);
    function Error(ErrorMessage, ErrorCode, Id) {
        if (ErrorCode === void 0) { ErrorCode = ErrorClass.ERROR_UNKNOWN; }
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.ErrorMessage = ErrorMessage;
        _this.ErrorCode = ErrorCode;
        _this.Id = Id;
        return _this;
    }
    return Error;
}(ButtplugSystemMessage));
exports.Error = Error;
var DeviceInfo = (function () {
    function DeviceInfo(DeviceIndex, DeviceName, DeviceMessages) {
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
    return DeviceInfo;
}());
exports.DeviceInfo = DeviceInfo;
var DeviceList = (function (_super) {
    __extends(DeviceList, _super);
    function DeviceList(Devices, Id) {
        var _this = _super.call(this) || this;
        _this.Devices = Devices;
        _this.Id = Id;
        return _this;
    }
    return DeviceList;
}(ButtplugSystemMessage));
exports.DeviceList = DeviceList;
var DeviceAdded = (function (_super) {
    __extends(DeviceAdded, _super);
    function DeviceAdded(DeviceIndex, DeviceName, DeviceMessages) {
        var _this = _super.call(this) || this;
        _this.DeviceIndex = DeviceIndex;
        _this.DeviceName = DeviceName;
        _this.DeviceMessages = DeviceMessages;
        return _this;
    }
    return DeviceAdded;
}(ButtplugSystemMessage));
exports.DeviceAdded = DeviceAdded;
var DeviceRemoved = (function (_super) {
    __extends(DeviceRemoved, _super);
    function DeviceRemoved(DeviceIndex) {
        var _this = _super.call(this) || this;
        _this.DeviceIndex = DeviceIndex;
        return _this;
    }
    return DeviceRemoved;
}(ButtplugSystemMessage));
exports.DeviceRemoved = DeviceRemoved;
var RequestDeviceList = (function (_super) {
    __extends(RequestDeviceList, _super);
    function RequestDeviceList(Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.Id = Id;
        return _this;
    }
    return RequestDeviceList;
}(ButtplugMessage));
exports.RequestDeviceList = RequestDeviceList;
var StartScanning = (function (_super) {
    __extends(StartScanning, _super);
    function StartScanning(Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.Id = Id;
        return _this;
    }
    return StartScanning;
}(ButtplugMessage));
exports.StartScanning = StartScanning;
var StopScanning = (function (_super) {
    __extends(StopScanning, _super);
    function StopScanning(Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.Id = Id;
        return _this;
    }
    return StopScanning;
}(ButtplugMessage));
exports.StopScanning = StopScanning;
var ScanningFinished = (function (_super) {
    __extends(ScanningFinished, _super);
    function ScanningFinished() {
        return _super.call(this) || this;
    }
    return ScanningFinished;
}(ButtplugSystemMessage));
exports.ScanningFinished = ScanningFinished;
var RequestLog = (function (_super) {
    __extends(RequestLog, _super);
    function RequestLog(LogLevel, Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.LogLevel = LogLevel;
        _this.Id = Id;
        return _this;
    }
    return RequestLog;
}(ButtplugMessage));
exports.RequestLog = RequestLog;
var Log = (function (_super) {
    __extends(Log, _super);
    function Log(LogLevel, LogMessage) {
        var _this = _super.call(this) || this;
        _this.LogLevel = LogLevel;
        _this.LogMessage = LogMessage;
        return _this;
    }
    return Log;
}(ButtplugSystemMessage));
exports.Log = Log;
var RequestServerInfo = (function (_super) {
    __extends(RequestServerInfo, _super);
    function RequestServerInfo(ClientName, Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.ClientName = ClientName;
        _this.Id = Id;
        return _this;
    }
    return RequestServerInfo;
}(ButtplugMessage));
exports.RequestServerInfo = RequestServerInfo;
var ServerInfo = (function (_super) {
    __extends(ServerInfo, _super);
    function ServerInfo(MajorVersion, MinorVersion, BuildVersion, MessageVersion, MaxPingTime, ServerName, Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this) || this;
        _this.MajorVersion = MajorVersion;
        _this.MinorVersion = MinorVersion;
        _this.BuildVersion = BuildVersion;
        _this.MessageVersion = MessageVersion;
        _this.MaxPingTime = MaxPingTime;
        _this.ServerName = ServerName;
        _this.Id = Id;
        return _this;
    }
    return ServerInfo;
}(ButtplugSystemMessage));
exports.ServerInfo = ServerInfo;
var FleshlightLaunchFW12Cmd = (function (_super) {
    __extends(FleshlightLaunchFW12Cmd, _super);
    function FleshlightLaunchFW12Cmd(Speed, Position, DeviceIndex, Id) {
        if (DeviceIndex === void 0) { DeviceIndex = -1; }
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, DeviceIndex, Id) || this;
        _this.Speed = Speed;
        _this.Position = Position;
        _this.DeviceIndex = DeviceIndex;
        _this.Id = Id;
        return _this;
    }
    return FleshlightLaunchFW12Cmd;
}(ButtplugDeviceMessage));
exports.FleshlightLaunchFW12Cmd = FleshlightLaunchFW12Cmd;
var KiirooCmd = (function (_super) {
    __extends(KiirooCmd, _super);
    function KiirooCmd(Position, DeviceIndex, Id) {
        if (DeviceIndex === void 0) { DeviceIndex = -1; }
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, DeviceIndex, Id) || this;
        _this.Position = Position;
        _this.DeviceIndex = DeviceIndex;
        _this.Id = Id;
        return _this;
    }
    return KiirooCmd;
}(ButtplugDeviceMessage));
exports.KiirooCmd = KiirooCmd;
var SingleMotorVibrateCmd = (function (_super) {
    __extends(SingleMotorVibrateCmd, _super);
    function SingleMotorVibrateCmd(Speed, DeviceIndex, Id) {
        if (DeviceIndex === void 0) { DeviceIndex = -1; }
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, DeviceIndex, Id) || this;
        _this.Speed = Speed;
        _this.DeviceIndex = DeviceIndex;
        _this.Id = Id;
        return _this;
    }
    return SingleMotorVibrateCmd;
}(ButtplugDeviceMessage));
exports.SingleMotorVibrateCmd = SingleMotorVibrateCmd;
var StopDeviceCmd = (function (_super) {
    __extends(StopDeviceCmd, _super);
    function StopDeviceCmd(DeviceIndex, Id) {
        if (DeviceIndex === void 0) { DeviceIndex = -1; }
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, DeviceIndex, Id) || this;
        _this.DeviceIndex = DeviceIndex;
        _this.Id = Id;
        return _this;
    }
    return StopDeviceCmd;
}(ButtplugDeviceMessage));
exports.StopDeviceCmd = StopDeviceCmd;
var StopAllDevices = (function (_super) {
    __extends(StopAllDevices, _super);
    function StopAllDevices(Id) {
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, Id) || this;
        _this.Id = Id;
        return _this;
    }
    return StopAllDevices;
}(ButtplugMessage));
exports.StopAllDevices = StopAllDevices;
var LovenseCmd = (function (_super) {
    __extends(LovenseCmd, _super);
    function LovenseCmd(Command, DeviceIndex, Id) {
        if (DeviceIndex === void 0) { DeviceIndex = -1; }
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, DeviceIndex, Id) || this;
        _this.Command = Command;
        _this.DeviceIndex = DeviceIndex;
        _this.Id = Id;
        return _this;
    }
    return LovenseCmd;
}(ButtplugDeviceMessage));
exports.LovenseCmd = LovenseCmd;
var VorzeA10CycloneCmd = (function (_super) {
    __extends(VorzeA10CycloneCmd, _super);
    function VorzeA10CycloneCmd(Speed, Clockwise, DeviceIndex, Id) {
        if (DeviceIndex === void 0) { DeviceIndex = -1; }
        if (Id === void 0) { Id = 1; }
        var _this = _super.call(this, DeviceIndex, Id) || this;
        _this.Speed = Speed;
        _this.Clockwise = Clockwise;
        _this.DeviceIndex = DeviceIndex;
        _this.Id = Id;
        return _this;
    }
    return VorzeA10CycloneCmd;
}(ButtplugDeviceMessage));
exports.VorzeA10CycloneCmd = VorzeA10CycloneCmd;
var Messages = {
    DeviceAdded: DeviceAdded,
    DeviceList: DeviceList,
    DeviceRemoved: DeviceRemoved,
    Error: Error,
    FleshlightLaunchFW12Cmd: FleshlightLaunchFW12Cmd,
    KiirooCmd: KiirooCmd,
    Log: Log,
    LovenseCmd: LovenseCmd,
    Ok: Ok,
    Ping: Ping,
    RequestDeviceList: RequestDeviceList,
    RequestLog: RequestLog,
    RequestServerInfo: RequestServerInfo,
    ScanningFinished: ScanningFinished,
    ServerInfo: ServerInfo,
    SingleMotorVibrateCmd: SingleMotorVibrateCmd,
    StartScanning: StartScanning,
    StopAllDevices: StopAllDevices,
    StopDeviceCmd: StopDeviceCmd,
    StopScanning: StopScanning,
    Test: Test,
    VorzeA10CycloneCmd: VorzeA10CycloneCmd,
};
var jsonValidator = ajv().compile(buttplugSchema);
function FromJSON(str) {
    var msgarray = JSON.parse(str);
    if (!jsonValidator(msgarray)) {
        // Relay validator errors as an error message locally.
        var errorString = jsonValidator.errors.map(function (error) { return error.message; }).join("; ");
        return [new Error(errorString, ErrorClass.ERROR_MSG, 0)];
    }
    var msgs = [];
    for (var _i = 0, _a = Array.from(msgarray); _i < _a.length; _i++) {
        var x = _a[_i];
        // Can't get this to resolve nicely as a type, so just start from any and cast
        // after. Not sure how to resolve plainToClass to a type since this is
        // dynamic.
        var msg = class_transformer_1.plainToClass(Messages[Object.getOwnPropertyNames(x)[0]], x[Object.getOwnPropertyNames(x)[0]]);
        msgs.push(msg);
    }
    return msgs;
}
exports.FromJSON = FromJSON;
//# sourceMappingURL=Messages.js.map
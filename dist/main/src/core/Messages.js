// tslint:disable:max-classes-per-file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
class ButtplugMessage {
    constructor(Id) {
        this.Id = Id;
    }
    DowngradeMessage() {
        return new Error("Message version downgrade required, but not defined for this message type.", ErrorClass.ERROR_MSG, this.Id);
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
    get Type() {
        return this.constructor.name;
    }
    /***
     * [DEPRECATED] Function version of the this.Type getter
     *
     */
    getType() {
        return this.Type;
    }
    toJSON() {
        return JSON.stringify(this.toProtocolFormat());
    }
    toProtocolFormat() {
        const jsonObj = {};
        jsonObj[this.Type] = class_transformer_1.classToPlain(this);
        return jsonObj;
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
    get SchemaVersion() { return 0; }
}
exports.Ok = Ok;
class Ping extends ButtplugMessage {
    constructor(Id) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.Ping = Ping;
class Test extends ButtplugMessage {
    constructor(TestString, Id = 1) {
        super(Id);
        this.TestString = TestString;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.Test = Test;
var ErrorClass;
(function (ErrorClass) {
    ErrorClass[ErrorClass["ERROR_UNKNOWN"] = 0] = "ERROR_UNKNOWN";
    ErrorClass[ErrorClass["ERROR_INIT"] = 1] = "ERROR_INIT";
    ErrorClass[ErrorClass["ERROR_PING"] = 2] = "ERROR_PING";
    ErrorClass[ErrorClass["ERROR_MSG"] = 3] = "ERROR_MSG";
    ErrorClass[ErrorClass["ERROR_DEVICE"] = 4] = "ERROR_DEVICE";
})(ErrorClass = exports.ErrorClass || (exports.ErrorClass = {}));
class Error extends ButtplugSystemMessage {
    constructor(ErrorMessage, ErrorCode = ErrorClass.ERROR_UNKNOWN, Id = 1) {
        super(Id);
        this.ErrorMessage = ErrorMessage;
        this.ErrorCode = ErrorCode;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.Error = Error;
/***
 * DeviceInfo Message class from v0 spec
 *
 * Uses a string array for messages, instead of a specifications object.
 */
class DeviceInfo {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
}
exports.DeviceInfo = DeviceInfo;
class DeviceListVersion0 extends ButtplugSystemMessage {
    constructor(Devices, Id) {
        super();
        this.Devices = Devices;
        this.Id = Id;
    }
    get Type() {
        return "DeviceList";
    }
    get SchemaVersion() { return 0; }
}
exports.DeviceListVersion0 = DeviceListVersion0;
class DeviceInfoWithSpecifications {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
}
exports.DeviceInfoWithSpecifications = DeviceInfoWithSpecifications;
class DeviceListVersion1 extends ButtplugSystemMessage {
    constructor(Devices, Id) {
        super();
        this.Devices = Devices;
        this.Id = Id;
    }
    get Type() {
        return "DeviceList";
    }
    DowngradeMessage() {
        // This is going to look mostly the same, we just need to reduce our devices
        // down to use string message lists instead of specification lists.
        const oldDevices = [];
        for (const newDevice of this.Devices) {
            oldDevices.push(new DeviceInfo(newDevice.DeviceIndex, newDevice.DeviceName, Object.keys(newDevice.DeviceMessages)));
        }
        return new DeviceListVersion0(oldDevices, this.Id);
    }
    get SchemaVersion() { return 1; }
}
exports.DeviceListVersion1 = DeviceListVersion1;
exports.DeviceList = DeviceListVersion1;
class DeviceAddedVersion0 extends ButtplugSystemMessage {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        super();
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
    get Type() {
        return "DeviceAdded";
    }
    get SchemaVersion() { return 0; }
}
exports.DeviceAddedVersion0 = DeviceAddedVersion0;
class DeviceAddedVersion1 extends ButtplugSystemMessage {
    constructor(DeviceIndex, DeviceName, DeviceMessages) {
        super();
        this.DeviceIndex = DeviceIndex;
        this.DeviceName = DeviceName;
        this.DeviceMessages = DeviceMessages;
    }
    get Type() {
        return "DeviceAdded";
    }
    get SchemaVersion() { return 1; }
    DowngradeMessage() {
        // This is going to look mostly the same, we just need to reduce our devices
        // down to use string message lists instead of specification lists.
        return new DeviceAddedVersion0(this.DeviceIndex, this.DeviceName, Object.keys(this.DeviceMessages));
    }
}
exports.DeviceAddedVersion1 = DeviceAddedVersion1;
exports.DeviceAdded = DeviceAddedVersion1;
class DeviceRemoved extends ButtplugSystemMessage {
    constructor(DeviceIndex) {
        super();
        this.DeviceIndex = DeviceIndex;
    }
    get SchemaVersion() { return 0; }
}
exports.DeviceRemoved = DeviceRemoved;
class RequestDeviceList extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.RequestDeviceList = RequestDeviceList;
class StartScanning extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StartScanning = StartScanning;
class StopScanning extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StopScanning = StopScanning;
class ScanningFinished extends ButtplugSystemMessage {
    constructor() {
        super();
    }
    get SchemaVersion() { return 0; }
}
exports.ScanningFinished = ScanningFinished;
class RequestLog extends ButtplugMessage {
    constructor(LogLevel, Id = 1) {
        super(Id);
        this.LogLevel = LogLevel;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.RequestLog = RequestLog;
class Log extends ButtplugSystemMessage {
    constructor(LogLevel, LogMessage) {
        super();
        this.LogLevel = LogLevel;
        this.LogMessage = LogMessage;
    }
    get SchemaVersion() { return 0; }
}
exports.Log = Log;
class RequestServerInfo extends ButtplugMessage {
    constructor(ClientName, MessageVersion = 0, Id = 1) {
        super(Id);
        this.ClientName = ClientName;
        this.MessageVersion = MessageVersion;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.RequestServerInfo = RequestServerInfo;
class ServerInfo extends ButtplugSystemMessage {
    constructor(MajorVersion, MinorVersion, BuildVersion, MessageVersion, MaxPingTime, ServerName, Id = 1) {
        super();
        this.MajorVersion = MajorVersion;
        this.MinorVersion = MinorVersion;
        this.BuildVersion = BuildVersion;
        this.MessageVersion = MessageVersion;
        this.MaxPingTime = MaxPingTime;
        this.ServerName = ServerName;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.ServerInfo = ServerInfo;
class FleshlightLaunchFW12Cmd extends ButtplugDeviceMessage {
    constructor(Speed, Position, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.Position = Position;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.FleshlightLaunchFW12Cmd = FleshlightLaunchFW12Cmd;
class KiirooCmd extends ButtplugDeviceMessage {
    constructor(Command = "0", DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Command = Command;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    SetPosition(aPos) {
        if (aPos >= 0 && aPos <= 4) {
            this.Command = String(Math.round(aPos));
        }
        else {
            this.Command = "0";
        }
    }
    GetPosition() {
        const pos = Number(this.Command) ? Number(this.Command) : 0;
        if (pos < 0 || pos > 4) {
            return 0;
        }
        else {
            return Math.round(pos);
        }
    }
    get SchemaVersion() { return 0; }
}
exports.KiirooCmd = KiirooCmd;
class SingleMotorVibrateCmd extends ButtplugDeviceMessage {
    constructor(Speed, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.SingleMotorVibrateCmd = SingleMotorVibrateCmd;
class StopDeviceCmd extends ButtplugDeviceMessage {
    constructor(DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StopDeviceCmd = StopDeviceCmd;
class StopAllDevices extends ButtplugMessage {
    constructor(Id = 1) {
        super(Id);
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.StopAllDevices = StopAllDevices;
class LovenseCmd extends ButtplugDeviceMessage {
    constructor(Command, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Command = Command;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.LovenseCmd = LovenseCmd;
class VorzeA10CycloneCmd extends ButtplugDeviceMessage {
    constructor(Speed, Clockwise, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speed = Speed;
        this.Clockwise = Clockwise;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 0; }
}
exports.VorzeA10CycloneCmd = VorzeA10CycloneCmd;
class SpeedSubcommand {
    constructor(Index, Speed) {
        this.Index = Index;
        this.Speed = Speed;
    }
}
exports.SpeedSubcommand = SpeedSubcommand;
class VibrateCmd extends ButtplugDeviceMessage {
    constructor(Speeds, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Speeds = Speeds;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.VibrateCmd = VibrateCmd;
class RotateSubcommand {
    constructor(Index, Speed, Clockwise) {
        this.Index = Index;
        this.Speed = Speed;
        this.Clockwise = Clockwise;
    }
}
exports.RotateSubcommand = RotateSubcommand;
class RotateCmd extends ButtplugDeviceMessage {
    constructor(Rotations, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Rotations = Rotations;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.RotateCmd = RotateCmd;
class VectorSubcommand {
    constructor(Index, Position, Duration) {
        this.Index = Index;
        this.Position = Position;
        this.Duration = Duration;
    }
}
exports.VectorSubcommand = VectorSubcommand;
class LinearCmd extends ButtplugDeviceMessage {
    constructor(Vectors, DeviceIndex = -1, Id = 1) {
        super(DeviceIndex, Id);
        this.Vectors = Vectors;
        this.DeviceIndex = DeviceIndex;
        this.Id = Id;
    }
    get SchemaVersion() { return 1; }
}
exports.LinearCmd = LinearCmd;
//# sourceMappingURL=Messages.js.map
import "reflect-metadata";
export declare abstract class ButtplugMessage {
    Id: number;
    constructor(Id: number);
    abstract readonly SchemaVersion: number;
    DowngradeMessage(): ButtplugMessage;
    /***
     * Returns the message type name
     *
     * Usually, the message type name will be the same as the message class
     * constructor, so the constructor name is used by default. However, in
     * instances where a message has different versions (i.e. DeviceAddedVersion0
     * and DeviceAddedVersion1), we will need to override this to set the message
     * name.
     */
    readonly Type: string;
    /***
     * [DEPRECATED] Function version of the this.Type getter
     *
     */
    getType(): string;
    toJSON(): string;
    toProtocolFormat(): object;
}
export declare abstract class ButtplugDeviceMessage extends ButtplugMessage {
    DeviceIndex: number;
    Id: number;
    constructor(DeviceIndex: number, Id: number);
}
export declare abstract class ButtplugSystemMessage extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
}
export declare class Ok extends ButtplugSystemMessage {
    Id: number;
    constructor(Id: number);
    readonly SchemaVersion: number;
}
export declare class Ping extends ButtplugMessage {
    Id: number;
    constructor(Id: number);
    readonly SchemaVersion: number;
}
export declare class Test extends ButtplugMessage {
    TestString: string;
    Id: number;
    constructor(TestString: string, Id?: number);
    readonly SchemaVersion: number;
}
export declare enum ErrorClass {
    ERROR_UNKNOWN = 0,
    ERROR_INIT = 1,
    ERROR_PING = 2,
    ERROR_MSG = 3,
    ERROR_DEVICE = 4
}
export declare class Error extends ButtplugSystemMessage {
    ErrorMessage: string;
    ErrorCode: ErrorClass;
    Id: number;
    constructor(ErrorMessage: string, ErrorCode?: ErrorClass, Id?: number);
    readonly SchemaVersion: number;
}
/***
 * DeviceInfo Message class from v0 spec
 *
 * Uses a string array for messages, instead of a specifications object.
 */
export declare class DeviceInfo {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: string[];
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: string[]);
}
export declare class DeviceListVersion0 extends ButtplugSystemMessage {
    Devices: DeviceInfo[];
    Id: number;
    constructor(Devices: DeviceInfo[], Id: number);
    readonly Type: string;
    readonly SchemaVersion: number;
}
export declare class DeviceInfoWithSpecifications {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: object;
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: object);
}
export declare class DeviceListVersion1 extends ButtplugSystemMessage {
    Devices: DeviceInfoWithSpecifications[];
    Id: number;
    constructor(Devices: DeviceInfoWithSpecifications[], Id: number);
    readonly Type: string;
    DowngradeMessage(): ButtplugMessage;
    readonly SchemaVersion: number;
}
export declare class DeviceAddedVersion0 extends ButtplugSystemMessage {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: string[];
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: string[]);
    readonly Type: string;
    readonly SchemaVersion: number;
}
export declare class DeviceAddedVersion1 extends ButtplugSystemMessage {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: object;
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: object);
    readonly Type: string;
    readonly SchemaVersion: number;
    DowngradeMessage(): ButtplugMessage;
}
export declare class DeviceRemoved extends ButtplugSystemMessage {
    DeviceIndex: number;
    constructor(DeviceIndex: number);
    readonly SchemaVersion: number;
}
export declare class RequestDeviceList extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
    readonly SchemaVersion: number;
}
export declare class StartScanning extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
    readonly SchemaVersion: number;
}
export declare class StopScanning extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
    readonly SchemaVersion: number;
}
export declare class ScanningFinished extends ButtplugSystemMessage {
    constructor();
    readonly SchemaVersion: number;
}
export declare class RequestLog extends ButtplugMessage {
    LogLevel: string;
    Id: number;
    constructor(LogLevel: string, Id?: number);
    readonly SchemaVersion: number;
}
export declare class Log extends ButtplugSystemMessage {
    LogLevel: string;
    LogMessage: string;
    constructor(LogLevel: string, LogMessage: string);
    readonly SchemaVersion: number;
}
export declare class RequestServerInfo extends ButtplugMessage {
    ClientName: string;
    MessageVersion: number;
    Id: number;
    constructor(ClientName: string, MessageVersion?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class ServerInfo extends ButtplugSystemMessage {
    MajorVersion: number;
    MinorVersion: number;
    BuildVersion: number;
    MessageVersion: number;
    MaxPingTime: number;
    ServerName: string;
    Id: number;
    constructor(MajorVersion: number, MinorVersion: number, BuildVersion: number, MessageVersion: number, MaxPingTime: number, ServerName: string, Id?: number);
    readonly SchemaVersion: number;
}
export declare class FleshlightLaunchFW12Cmd extends ButtplugDeviceMessage {
    Speed: number;
    Position: number;
    DeviceIndex: number;
    Id: number;
    constructor(Speed: number, Position: number, DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class KiirooCmd extends ButtplugDeviceMessage {
    Command: string;
    DeviceIndex: number;
    Id: number;
    constructor(Command?: string, DeviceIndex?: number, Id?: number);
    SetPosition(aPos: number): void;
    GetPosition(): number;
    readonly SchemaVersion: number;
}
export declare class SingleMotorVibrateCmd extends ButtplugDeviceMessage {
    Speed: number;
    DeviceIndex: number;
    Id: number;
    constructor(Speed: number, DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class StopDeviceCmd extends ButtplugDeviceMessage {
    DeviceIndex: number;
    Id: number;
    constructor(DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class StopAllDevices extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
    readonly SchemaVersion: number;
}
export declare class LovenseCmd extends ButtplugDeviceMessage {
    Command: string;
    DeviceIndex: number;
    Id: number;
    constructor(Command: string, DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class VorzeA10CycloneCmd extends ButtplugDeviceMessage {
    Speed: number;
    Clockwise: boolean;
    DeviceIndex: number;
    Id: number;
    constructor(Speed: number, Clockwise: boolean, DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class SpeedSubcommand {
    Index: number;
    Speed: number;
    constructor(Index: number, Speed: number);
}
export declare class VibrateCmd extends ButtplugDeviceMessage {
    Speeds: SpeedSubcommand[];
    DeviceIndex: number;
    Id: number;
    constructor(Speeds: SpeedSubcommand[], DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class RotateSubcommand {
    Index: number;
    Speed: number;
    Clockwise: boolean;
    constructor(Index: number, Speed: number, Clockwise: boolean);
}
export declare class RotateCmd extends ButtplugDeviceMessage {
    Rotations: RotateSubcommand[];
    DeviceIndex: number;
    Id: number;
    constructor(Rotations: RotateSubcommand[], DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class VectorSubcommand {
    Index: number;
    Position: number;
    Duration: number;
    constructor(Index: number, Position: number, Duration: number);
}
export declare class LinearCmd extends ButtplugDeviceMessage {
    Vectors: VectorSubcommand[];
    DeviceIndex: number;
    Id: number;
    constructor(Vectors: VectorSubcommand[], DeviceIndex?: number, Id?: number);
    readonly SchemaVersion: number;
}
export declare class MessageAttributes {
    FeatureCount: number;
    constructor(FeatureCount: number);
}
export { DeviceListVersion1 as DeviceList };
export { DeviceAddedVersion1 as DeviceAdded };

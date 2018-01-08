import "reflect-metadata";
export declare class ButtplugMessage {
    Id: number;
    constructor(Id: number);
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
export declare class ButtplugDeviceMessage extends ButtplugMessage {
    DeviceIndex: number;
    Id: number;
    constructor(DeviceIndex: number, Id: number);
}
export declare class ButtplugSystemMessage extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
}
export declare class Ok extends ButtplugSystemMessage {
    Id: number;
    constructor(Id: number);
}
export declare class Ping extends ButtplugMessage {
    Id: number;
    constructor(Id: number);
}
export declare class Test extends ButtplugMessage {
    TestString: string;
    Id: number;
    constructor(TestString: string, Id?: number);
}
export declare enum ErrorClass {
    ERROR_UNKNOWN = 0,
    ERROR_INIT = 1,
    ERROR_PING = 2,
    ERROR_MSG = 3,
    ERROR_DEVICE = 4,
}
export declare class Error extends ButtplugSystemMessage {
    ErrorMessage: string;
    ErrorCode: ErrorClass;
    Id: number;
    constructor(ErrorMessage: string, ErrorCode?: ErrorClass, Id?: number);
}
export declare class DeviceInfo {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: string[];
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: string[]);
}
export declare class DeviceList extends ButtplugSystemMessage {
    Devices: DeviceInfo[];
    Id: number;
    constructor(Devices: DeviceInfo[], Id: number);
}
export declare class DeviceAdded extends ButtplugSystemMessage {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: string[];
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: string[]);
}
export declare class DeviceRemoved extends ButtplugSystemMessage {
    DeviceIndex: number;
    constructor(DeviceIndex: number);
}
export declare class RequestDeviceList extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
}
export declare class StartScanning extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
}
export declare class StopScanning extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
}
export declare class ScanningFinished extends ButtplugSystemMessage {
    constructor();
}
export declare class RequestLog extends ButtplugMessage {
    LogLevel: string;
    Id: number;
    constructor(LogLevel: string, Id?: number);
}
export declare class Log extends ButtplugSystemMessage {
    LogLevel: string;
    LogMessage: string;
    constructor(LogLevel: string, LogMessage: string);
}
export declare class RequestServerInfo extends ButtplugMessage {
    ClientName: string;
    Id: number;
    constructor(ClientName: string, Id?: number);
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
}
export declare class FleshlightLaunchFW12Cmd extends ButtplugDeviceMessage {
    Speed: number;
    Position: number;
    DeviceIndex: number;
    Id: number;
    constructor(Speed: number, Position: number, DeviceIndex?: number, Id?: number);
}
export declare class KiirooCmd extends ButtplugDeviceMessage {
    Command: string;
    DeviceIndex: number;
    Id: number;
    constructor(Command?: string, DeviceIndex?: number, Id?: number);
    SetPosition(aPos: number): void;
    GetPosition(): number;
}
export declare class SingleMotorVibrateCmd extends ButtplugDeviceMessage {
    Speed: number;
    DeviceIndex: number;
    Id: number;
    constructor(Speed: number, DeviceIndex?: number, Id?: number);
}
export declare class StopDeviceCmd extends ButtplugDeviceMessage {
    DeviceIndex: number;
    Id: number;
    constructor(DeviceIndex?: number, Id?: number);
}
export declare class StopAllDevices extends ButtplugMessage {
    Id: number;
    constructor(Id?: number);
}
export declare class LovenseCmd extends ButtplugDeviceMessage {
    Command: string;
    DeviceIndex: number;
    Id: number;
    constructor(Command: string, DeviceIndex?: number, Id?: number);
}
export declare class VorzeA10CycloneCmd extends ButtplugDeviceMessage {
    Speed: number;
    Clockwise: boolean;
    DeviceIndex: number;
    Id: number;
    constructor(Speed: number, Clockwise: boolean, DeviceIndex?: number, Id?: number);
}
export declare const Messages: {
    DeviceAdded: typeof DeviceAdded;
    DeviceList: typeof DeviceList;
    DeviceRemoved: typeof DeviceRemoved;
    Error: typeof Error;
    FleshlightLaunchFW12Cmd: typeof FleshlightLaunchFW12Cmd;
    KiirooCmd: typeof KiirooCmd;
    Log: typeof Log;
    LovenseCmd: typeof LovenseCmd;
    Ok: typeof Ok;
    Ping: typeof Ping;
    RequestDeviceList: typeof RequestDeviceList;
    RequestLog: typeof RequestLog;
    RequestServerInfo: typeof RequestServerInfo;
    ScanningFinished: typeof ScanningFinished;
    ServerInfo: typeof ServerInfo;
    SingleMotorVibrateCmd: typeof SingleMotorVibrateCmd;
    StartScanning: typeof StartScanning;
    StopAllDevices: typeof StopAllDevices;
    StopDeviceCmd: typeof StopDeviceCmd;
    StopScanning: typeof StopScanning;
    Test: typeof Test;
    VorzeA10CycloneCmd: typeof VorzeA10CycloneCmd;
};

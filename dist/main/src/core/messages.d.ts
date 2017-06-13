import 'reflect-metadata';
export declare class ButtplugMessage {
    Id: number;
    constructor(Id: number);
    getType(): string;
    toJSON(): string;
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
export declare class Error extends ButtplugSystemMessage {
    ErrorMessage: string;
    Id: number;
    constructor(ErrorMessage: string, Id?: number);
}
export declare class DeviceInfo {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: Array<string>;
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: Array<string>);
}
export declare class DeviceList extends ButtplugSystemMessage {
    Devices: Array<DeviceInfo>;
    Id: number;
    constructor(Devices: Array<DeviceInfo>, Id: number);
}
export declare class DeviceAdded extends ButtplugSystemMessage {
    DeviceIndex: number;
    DeviceName: string;
    DeviceMessages: Array<string>;
    constructor(DeviceIndex: number, DeviceName: string, DeviceMessages: Array<string>);
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
    Position: number;
    DeviceIndex: number;
    Id: number;
    constructor(Position: number, DeviceIndex?: number, Id?: number);
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
export declare function FromJSON(str: any): Array<ButtplugMessage>;

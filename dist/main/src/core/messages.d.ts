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
    Id: number;
    constructor(Id?: number);
}
export declare class ServerInfo extends ButtplugSystemMessage {
    MajorVersion: number;
    MinorVersion: number;
    BuildVersion: number;
    Id: number;
    constructor(MajorVersion: number, MinorVersion: number, BuildVersion: number, Id?: number);
}
export declare class FleshlightLaunchRawCmd extends ButtplugDeviceMessage {
    Speed: number;
    Position: number;
    DeviceIndex: number;
    Id: number;
    constructor(Speed: number, Position: number, DeviceIndex?: number, Id?: number);
}
export declare class KiirooRawCmd extends ButtplugDeviceMessage {
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
export declare function FromJSON(str: any): Array<ButtplugMessage>;

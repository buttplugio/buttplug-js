/// <reference types="node" />
import * as Messages from "../core/Messages";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
import { EventEmitter } from "events";
export declare class DeviceManager extends EventEmitter {
    private _subtypeManagers;
    private _devices;
    private _deviceCounter;
    private _logger;
    constructor();
    readonly DeviceManagers: IDeviceSubtypeManager[];
    ClearDeviceManagers: () => void;
    AddDeviceManager: (aManager: IDeviceSubtypeManager) => void;
    SendMessage: (aMessage: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>;
    private OnDeviceAdded;
    private OnDeviceRemoved;
    private OnScanningFinished;
}

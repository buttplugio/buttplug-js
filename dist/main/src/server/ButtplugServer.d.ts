/// <reference types="node" />
import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
export declare class ButtplugServer extends EventEmitter {
    private _serverName;
    private _maxPingTime;
    private _clientSchemaVersion;
    private _clientName;
    private _deviceManager;
    private _pingTimedOut;
    private _receivedRequestServerInfo;
    private _logger;
    private _outgoingLogLevel;
    constructor(_serverName?: string, _maxPingTime?: number);
    AddDeviceManager: (aManager: IDeviceSubtypeManager) => void;
    readonly DeviceManagers: IDeviceSubtypeManager[];
    ClearDeviceManagers: () => void;
    SendMessage: (aMessage: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>;
    Shutdown: () => Promise<void>;
    private OnLogMessage;
    private OnOutgoingMessage;
}

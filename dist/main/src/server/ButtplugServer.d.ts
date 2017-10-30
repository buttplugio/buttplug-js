/// <reference types="node" />
import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
export declare class ButtplugServer extends EventEmitter {
    private _serverName;
    private _maxPingTime;
    static CanUseBluetooth: () => Promise<boolean>;
    private _deviceManager;
    private _pingTimedOut;
    private _receivedRequestServerInfo;
    private _logger;
    private _outgoingLogLevel;
    constructor(_serverName?: string, _maxPingTime?: number);
    AddDeviceManager: (aManager: IDeviceSubtypeManager) => void;
    SendMessage: (aMessage: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>;
    Shutdown: () => Promise<void>;
    private OnLogMessage;
    private OnOutgoingMessage;
}

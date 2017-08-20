/// <reference types="node" />
import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
export default class ButtplugServer extends EventEmitter {
    private _serverName;
    private _maxPingTime;
    private _deviceManager;
    private _pingTimedOut;
    private _receivedRequestServerInfo;
    private _logger;
    private _outgoingLogLevel;
    constructor(_serverName?: string, _maxPingTime?: number);
    SendMessage: (aMessage: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>;
    Shutdown: () => Promise<void>;
    private OnLogMessage;
    private OnOutgoingMessage;
}

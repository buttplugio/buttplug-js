/// <reference types="node" />
import { EventEmitter } from "events";
import { Device } from "../core/Device";
import * as Messages from "../core/Messages";
export declare abstract class ButtplugClient extends EventEmitter {
    abstract Connect: (aUrl: string) => Promise<void>;
    abstract Disconnect: () => void;
    protected abstract Send: (aMsg: string) => void;
    readonly abstract Connected: boolean;
    protected _pingTimer: NodeJS.Timer;
    private _devices;
    private _counter;
    private _waitingMsgs;
    private _clientName;
    constructor(aClientName: string);
    RequestDeviceList: () => Promise<void>;
    getDevices(): Device[];
    StartScanning: () => Promise<void>;
    StopScanning: () => Promise<void>;
    RequestLog: (aLogLevel: string) => Promise<void>;
    StopAllDevices: () => Promise<void>;
    SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void>;
    ParseJSONMessage: (aJSONMsg: string) => void;
    ParseIncomingMessage: (aEvent: MessageEvent) => void;
    protected InitializeConnection: () => Promise<boolean>;
    protected ShutdownConnection: () => void;
    private SendMessage(aMsg);
    private SendMsgExpectOk;
    private OnReaderLoad(aEvent);
}

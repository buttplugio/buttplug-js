/// <reference types="node" />
import { EventEmitter } from "events";
import { Device } from "./device";
import * as Messages from "./messages";
export declare class ButtplugClient extends EventEmitter {
    private _devices;
    private _ws;
    private _counter;
    private _waitingMsgs;
    private _clientName;
    private _pingTimer;
    constructor(aClientName: string);
    readonly Connected: boolean;
    Connect: (aUrl: string) => Promise<void>;
    Disconnect: () => void;
    RequestDeviceList: () => Promise<void>;
    getDevices(): Device[];
    StartScanning: () => Promise<void>;
    StopScanning: () => Promise<void>;
    RequestLog: (aLogLevel: string) => Promise<void>;
    SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void>;
    ParseJSONMessage: (aJSONMsg: string) => void;
    ParseIncomingMessage: (aEvent: MessageEvent) => void;
    private onWebsocketClose;
    private SendMessage(aMsg);
    private SendMsgExpectOk;
    private OnReaderLoad(aEvent);
}

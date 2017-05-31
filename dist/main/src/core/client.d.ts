/// <reference types="node" />
import { EventEmitter } from 'events';
import * as Messages from './messages';
import { Device } from './device';
export declare class ButtplugClient extends EventEmitter {
    private _devices;
    private _ws;
    private _counter;
    private _waitingMsgs;
    constructor();
    Connect: (aUrl: string) => void;
    private SendMessage(aMsg);
    private SendMsgExpectOk;
    RequestDeviceList: () => Promise<void>;
    StartScanning: () => Promise<void>;
    StopScanning: () => Promise<void>;
    RequestLog: (aLogLevel: string) => Promise<void>;
    private OnReaderLoad(aEvent);
    SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void>;
    ParseJSONMessage: (aJSONMsg: string) => void;
    ParseIncomingMessage: (aEvent: MessageEvent) => void;
}

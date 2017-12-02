/// <reference types="node" />
import { EventEmitter } from "events";
import { Device } from "../core/Device";
import { IButtplugConnector } from "./IButtplugConnector";
import * as Messages from "../core/Messages";
export declare class ButtplugClient extends EventEmitter {
    protected _pingTimer: NodeJS.Timer;
    protected _connector: IButtplugConnector | null;
    private _devices;
    private _counter;
    private _waitingMsgs;
    private _clientName;
    constructor(aClientName: string);
    ConnectWebsocket: (aAddress: string) => Promise<void>;
    ConnectLocal: () => Promise<void>;
    Connect: (aConnector: IButtplugConnector) => Promise<void>;
    readonly Connected: boolean;
    Disconnect(): void;
    RequestDeviceList: () => Promise<void>;
    getDevices(): Device[];
    StartScanning: () => Promise<void>;
    StopScanning: () => Promise<void>;
    RequestLog: (aLogLevel: string) => Promise<void>;
    StopAllDevices: () => Promise<void>;
    SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void>;
    ParseMessages: (aMsgs: Messages.ButtplugMessage[]) => void;
    protected InitializeConnection: () => Promise<boolean>;
    protected ShutdownConnection: () => void;
    private CheckConnector();
    private SendMessage(aMsg);
    private SendMsgExpectOk;
}

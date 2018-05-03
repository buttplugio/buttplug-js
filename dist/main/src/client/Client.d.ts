/// <reference types="node" />
import { ButtplugLogger } from "../core/Logging";
import { EventEmitter } from "events";
import { Device } from "../core/Device";
import { IButtplugConnector } from "./IButtplugConnector";
import * as Messages from "../core/Messages";
export declare class ButtplugClient extends EventEmitter {
    protected _pingTimer: NodeJS.Timer | null;
    protected _connector: IButtplugConnector | null;
    protected _devices: Map<number, Device>;
    protected _counter: number;
    protected _waitingMsgs: Map<number, (val: Messages.ButtplugMessage) => void>;
    protected _clientName: string;
    protected _logger: ButtplugLogger;
    protected _messageVersion: number;
    constructor(aClientName?: string);
    readonly Connector: IButtplugConnector | null;
    readonly Connected: boolean;
    readonly Devices: Device[];
    ConnectWebsocket: (aAddress: string) => Promise<void>;
    ConnectLocal: () => Promise<void>;
    Connect: (aConnector: IButtplugConnector) => Promise<void>;
    Disconnect: () => Promise<void>;
    StartScanning: () => Promise<void>;
    StopScanning: () => Promise<void>;
    RequestLog: (aLogLevel: string) => Promise<void>;
    StopAllDevices: () => Promise<void>;
    SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void>;
    ParseMessages: (aMsgs: Messages.ButtplugMessage[]) => void;
    protected DisconnectHandler: () => void;
    protected ParseMessagesInternal(aMsgs: Messages.ButtplugMessage[]): void;
    protected InitializeConnection: () => Promise<boolean>;
    protected RequestDeviceList: () => Promise<void>;
    protected ShutdownConnection: () => Promise<void>;
    protected SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>;
    protected CheckConnector(): void;
    protected SendMsgExpectOk: (aMsg: Messages.ButtplugMessage) => Promise<void>;
}

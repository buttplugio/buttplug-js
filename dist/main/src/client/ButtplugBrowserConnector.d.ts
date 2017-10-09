/// <reference types="node" />
import { EventEmitter } from "events";
import { ButtplugMessage } from "../core/Messages";
import { IButtplugConnector } from "./IButtplugConnector";
export declare class ButtplugBrowserConnector extends EventEmitter implements IButtplugConnector {
    private _connected;
    private _server;
    IsConnected(): boolean;
    Connect: () => Promise<void>;
    Disconnect: () => void;
    Send: (aMsg: ButtplugMessage) => Promise<void>;
    private OnMessageReceived;
}

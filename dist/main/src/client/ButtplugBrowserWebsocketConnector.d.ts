/// <reference types="node" />
import { EventEmitter } from "events";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugMessage } from "../core/Messages";
export declare class ButtplugBrowserWebsocketConnector extends EventEmitter implements IButtplugConnector {
    private _url;
    private _ws;
    constructor(_url: string);
    readonly Connected: boolean;
    Connect: () => Promise<void>;
    Disconnect: () => void;
    Send: (aMsg: ButtplugMessage) => void;
    private ParseIncomingMessage;
    private OnReaderLoad;
}

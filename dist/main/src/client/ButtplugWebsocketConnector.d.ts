/// <reference types="node" />
import { EventEmitter } from "events";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugMessage } from "../core/Messages";
export declare class ButtplugWebsocketConnector extends EventEmitter implements IButtplugConnector {
    private _ws;
    IsConnected(): boolean;
    ParseIncomingMessage: (aEvent: MessageEvent) => void;
    Connect: (aUrl: string) => Promise<void>;
    Disconnect: () => void;
    Send: (aMsg: ButtplugMessage) => void;
    private OnReaderLoad(aEvent);
}

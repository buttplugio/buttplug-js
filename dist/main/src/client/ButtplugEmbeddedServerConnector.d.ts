/// <reference types="node" />
import { EventEmitter } from "events";
import { ButtplugMessage } from "../core/Messages";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugServer } from "../server/ButtplugServer";
export declare class ButtplugEmbeddedServerConnector extends EventEmitter implements IButtplugConnector {
    private _connected;
    private _server;
    Server: ButtplugServer | null;
    IsConnected(): boolean;
    Connect: () => Promise<void>;
    Disconnect: () => void;
    Send: (aMsg: ButtplugMessage) => Promise<void>;
    private OnMessageReceived;
}

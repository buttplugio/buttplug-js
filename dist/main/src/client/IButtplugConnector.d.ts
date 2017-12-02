/// <reference types="node" />
import { ButtplugMessage } from "../core/Messages";
import { EventEmitter } from "events";
export interface IButtplugConnector extends EventEmitter {
    Connect: () => Promise<void>;
    Disconnect: () => void;
    Send: (aMsg: ButtplugMessage) => void;
    IsConnected(): boolean;
}

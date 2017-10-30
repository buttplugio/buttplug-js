/// <reference types="node" />
import { ButtplugMessage } from "../core/Messages";
import { EventEmitter } from "events";
export declare class ServerMessageHub extends EventEmitter {
    private static sInstance;
    static readonly Instance: ServerMessageHub;
    emitMessage(aMsg: ButtplugMessage): void;
}

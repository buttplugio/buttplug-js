/// <reference types="node" />
import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IButtplugDevice } from "./IButtplugDevice";
export declare abstract class ButtplugDevice extends EventEmitter implements IButtplugDevice {
    protected _name: string;
    protected readonly MsgFuncs: Map<string, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>>;
    constructor(_name: string);
    readonly abstract MessageSpecifications: object;
    readonly Name: string;
    readonly AllowedMessageTypes: string[];
    ParseMessage: (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>;
}

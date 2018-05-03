/// <reference types="node" />
import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IButtplugDevice } from "./IButtplugDevice";
export declare abstract class ButtplugDevice extends EventEmitter implements IButtplugDevice {
    protected _name: string;
    protected _id: string;
    protected readonly MsgFuncs: Map<string, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>>;
    constructor(_name: string, _id: string);
    readonly abstract MessageSpecifications: object;
    abstract Disconnect(): any;
    readonly Name: string;
    readonly Id: string;
    readonly AllowedMessageTypes: string[];
    ParseMessage: (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>;
}

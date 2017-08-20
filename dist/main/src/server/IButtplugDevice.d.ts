/// <reference types="node" />
import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
export default interface IButtplugDevice extends EventEmitter {
    Name: string;
    GetAllowedMessageTypes(): string[];
    ParseMessage(aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage>;
}

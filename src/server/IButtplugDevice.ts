import * as Messages from "../core/Messages";
import { EventEmitter } from "events";

export interface IButtplugDevice extends EventEmitter {
  readonly MessageSpecifications: object;
  readonly AllowedMessageTypes: string[];
  Name: string;
  ParseMessage(aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage>;
}

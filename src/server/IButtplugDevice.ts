import * as Messages from "../core/Messages";
import { EventEmitter } from "events";

export interface IButtplugDevice extends EventEmitter {
  Name: string;
  GetAllowedMessageTypes(): string[];
  ParseMessage(aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage>;
}

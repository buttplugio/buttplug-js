import * as Messages from "../core/Messages";
import { EventEmitter } from "events";

export interface IButtplugDevice extends EventEmitter {
  Name: string;
  GetMessageSpecifications(): object;
  GetAllowedMessageTypes(): string[];
  ParseMessage(aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage>;
}

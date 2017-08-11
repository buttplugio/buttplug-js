import * as Messages from "../core/Messages";

export default interface IButtplugDevice {
  Name: string;
  Identifier: string;
  GetAllowedMessageTypes(): string[];
  ParseMessage(aMsg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage>;
  Initialize(): Promise<Messages.ButtplugMessage>;
  Disconnect();
}

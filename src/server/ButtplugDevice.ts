import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import IButtplugDevice from "./IButtplugDevice";

export default class ButtplugDevice extends EventEmitter implements IButtplugDevice {
  protected readonly MsgFuncs: Map<string, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>> =
    new Map<string, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>>();

  public constructor(protected _name: string) {
    super();
  }

  public get Name() {
    return this._name;
  }

  public GetAllowedMessageTypes = (): string[] => {
    return Array.from(this.MsgFuncs.keys());
  }

  public ParseMessage = async (aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    if (!this.MsgFuncs.has(aMsg.getType())) {
      return new Messages.Error("${this._name} cannot handle message of type ${aMsg.getType()} )",
                                Messages.ErrorClass.ERROR_MSG,
                                aMsg.Id);
    }
    // Boy non-null assurance in the middle of functions looks weird.
    return this.MsgFuncs.get(aMsg.getType())!(aMsg);
  }
}

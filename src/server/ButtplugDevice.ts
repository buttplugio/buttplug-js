import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IButtplugDevice } from "./IButtplugDevice";

export class ButtplugDevice extends EventEmitter implements IButtplugDevice {
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
    if (!this.MsgFuncs.has(aMsg.Type)) {
      return new Messages.Error("${this._name} cannot handle message of type ${aMsg.Type} )",
                                Messages.ErrorClass.ERROR_MSG,
                                aMsg.Id);
    }
    // Boy non-null assurance in the middle of functions looks weird.
    return this.MsgFuncs.get(aMsg.Type)!(aMsg);
  }
}

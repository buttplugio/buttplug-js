import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IButtplugDevice } from "./IButtplugDevice";

export abstract class ButtplugDevice extends EventEmitter implements IButtplugDevice {
  protected readonly MsgFuncs: Map<string, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>> =
    new Map<string, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>>();

  public constructor(protected _name: string, protected _id: string) {
    super();
  }

  public abstract get MessageSpecifications(): object;

  public get Name() {
    return this._name;
  }

  public get Id() {
    return this._id;
  }

  public get AllowedMessageTypes(): string[] {
    return Object.keys(this.MessageSpecifications);
  }

  public ParseMessage = async (aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    if (!this.MsgFuncs.has(aMsg.Type)) {
      return new Messages.Error(`${this._name} cannot handle message of type ${aMsg.Type}`,
                                Messages.ErrorClass.ERROR_MSG,
                                aMsg.Id);
    }
    // Non-null assurance in the middle of functions looks weird.
    return this.MsgFuncs.get(aMsg.Type)!(aMsg);
  }
}

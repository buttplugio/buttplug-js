import * as Messages from "../core/Messages";
import { EventEmitter } from "events";
import { IButtplugDevice } from "./IButtplugDevice";
import { ButtplugMessageException } from "../core/Exceptions";

export abstract class ButtplugDevice extends EventEmitter implements IButtplugDevice {
  // tslint:disable-next-line:ban-types
  protected readonly MsgFuncs: Map<Function, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>> =
    // tslint:disable-next-line:ban-types
    new Map<Function, (aMsg: Messages.ButtplugMessage) => Promise<Messages.ButtplugMessage>>();

  public constructor(protected _name: string, protected _id: string) {
    super();
  }

  public abstract get MessageSpecifications(): object;

  public abstract Disconnect();

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
      throw new ButtplugMessageException(`${this._name} cannot handle message of type ${aMsg.Type}`, aMsg.Id);
    }
    // Non-null assurance in the middle of functions looks weird.
    return this.MsgFuncs.get(aMsg.Type)!(aMsg);
  }
}

import { ButtplugMessage } from "../core/Messages";
import { EventEmitter } from "events";

export default class ServerMessageHub extends EventEmitter {
  private static sInstance: ServerMessageHub = new ServerMessageHub();

  public static get Instance(): ServerMessageHub {
    return ServerMessageHub.sInstance;
  }

  public emitMessage(aMsg: ButtplugMessage) {
    this.emit("message", aMsg);
  }
}

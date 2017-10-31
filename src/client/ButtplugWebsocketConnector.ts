"use strict";

import { EventEmitter } from "events";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugMessage } from "../core/Messages";
import { FromJSON } from "../core/MessageUtils";

export class ButtplugWebsocketConnector extends EventEmitter implements IButtplugConnector {
  private _ws: WebSocket | undefined;

  public IsConnected(): boolean {
    return this._ws !== undefined;
  }

  public ParseIncomingMessage = (aEvent: MessageEvent) => {
    if (typeof (aEvent.data) === "string") {
      const msgs = FromJSON(aEvent.data);
      this.emit("message", msgs);
    } else if (aEvent.data instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
      reader.readAsText(aEvent.data);
    }
  }

  public Connect = async (aUrl: string): Promise<void> => {
    const ws = new WebSocket(aUrl);
    let res;
    let rej;
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    // In websockets, our error rarely tells us much, as for security reasons
    // browsers usually only throw Error Code 1006. It's up to those using this
    // library to state what the problem might be.
    const conErrorCallback = (ev) => rej();
    ws.addEventListener("open", async (ev) => {
      this._ws = ws;
      this._ws.addEventListener("message", (aMsg) => { this.ParseIncomingMessage(aMsg); });
      this._ws.removeEventListener("close", conErrorCallback);
      this._ws.addEventListener("close", this.Disconnect);
      res();
    });
    ws.addEventListener("close", conErrorCallback);
    return p;
  }

  public Disconnect = () => {
    if (!this.IsConnected()) {
      return;
    }
    this._ws!.close();
    this._ws = undefined;
    this.emit("close");
  }

  public Send = (aMsg: ButtplugMessage) => {
    if (!this.IsConnected()) {
      throw new Error("ButtplugClient not connected");
    }
    this._ws!.send("[" + aMsg.toJSON() + "]");
  }

  private OnReaderLoad(aEvent: Event) {
    const msgs = FromJSON((aEvent.target as FileReader).result);
    this.emit("message", msgs);
  }
}

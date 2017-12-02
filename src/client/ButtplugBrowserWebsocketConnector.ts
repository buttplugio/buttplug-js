"use strict";

import { EventEmitter } from "events";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugMessage } from "../core/Messages";
import { FromJSON } from "../core/MessageUtils";

export class ButtplugBrowserWebsocketConnector extends EventEmitter implements IButtplugConnector {

  private _ws: WebSocket | undefined;

  public constructor(private _url: string) {
    super();
  }

  public IsConnected(): boolean {
    return this._ws !== undefined;
  }

  public Connect = async (): Promise<void> => {
    const ws = new WebSocket(this._url);
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

  private ParseIncomingMessage = (aEvent: MessageEvent) => {
    if (typeof (aEvent.data) === "string") {
      const msgs = FromJSON(aEvent.data);
      this.emit("message", msgs);
    } else if (aEvent.data instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
      reader.readAsText(aEvent.data);
    }
  }

  private OnReaderLoad(aEvent: Event) {
    const msgs = FromJSON((aEvent.target as FileReader).result);
    this.emit("message", msgs);
  }
}

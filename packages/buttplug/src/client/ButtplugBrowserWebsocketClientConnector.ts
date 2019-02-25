/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";

import { EventEmitter } from "events";
import { IButtplugClientConnector } from "./IButtplugClientConnector";
import { ButtplugMessage } from "../core/Messages";
import { FromJSON } from "../core/MessageUtils";
import { ButtplugMessageSorter } from "./ButtplugMessageSorter";

export class ButtplugBrowserWebsocketClientConnector extends EventEmitter implements IButtplugClientConnector {

  private _sorter: ButtplugMessageSorter = new ButtplugMessageSorter();
  private _ws: WebSocket | undefined;

  public constructor(private _url: string) {
    super();
  }

  public get Connected(): boolean {
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

  public Disconnect = async (): Promise<void> => {
    if (!this.Connected) {
      return;
    }
    this._ws!.close();
    this._ws = undefined;
    this.emit("disconnect");
  }

  public Send = async (aMsg: ButtplugMessage): Promise<ButtplugMessage> => {
    if (!this.Connected) {
      throw new Error("ButtplugClient not connected");
    }
    const p = this._sorter.PrepareOutgoingMessage(aMsg);
    this._ws!.send("[" + aMsg.toJSON() + "]");
    return await p;
  }

  private ParseIncomingMessage = (aEvent: MessageEvent) => {
    if (typeof (aEvent.data) === "string") {
      const msgs = FromJSON(aEvent.data);
      const emitMsgs = this._sorter.ParseIncomingMessages(msgs);
      this.emit("message", emitMsgs);
    } else if (aEvent.data instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
      reader.readAsText(aEvent.data);
    }
  }

  private OnReaderLoad(aEvent: Event) {
    const msgs = FromJSON((aEvent.target as FileReader).result);
    const emitMsgs = this._sorter.ParseIncomingMessages(msgs);
    this.emit("message", emitMsgs);
  }
}

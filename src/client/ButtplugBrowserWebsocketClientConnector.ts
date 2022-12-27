/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";

import { IButtplugClientConnector } from "./IButtplugClientConnector";
import { ButtplugMessage } from "../core/Messages";
import { FromJSON } from "../core/MessageUtils";
import { ButtplugMessageSorter } from "../utils/ButtplugMessageSorter";
import { ButtplugBrowserWebsocketConnector } from "../utils/ButtplugBrowserWebsocketConnector";

export class ButtplugBrowserWebsocketClientConnector extends ButtplugBrowserWebsocketConnector implements IButtplugClientConnector {

  private _sorter: ButtplugMessageSorter = new ButtplugMessageSorter(true);
  protected _ws: WebSocket | undefined;

  public constructor(_url: string) {
    super(_url);
  }

  public get Connected(): boolean {
    return this._ws !== undefined;
  }

  public Send = async (msg: ButtplugMessage): Promise<ButtplugMessage> => {
    if (!this.Connected) {
      throw new Error("ButtplugClient not connected");
    }
    const p = this._sorter.PrepareOutgoingMessage(msg);
    this.SendMessage(msg);
    return await p;
  }

  protected ParseIncomingMessage = (event: MessageEvent) => {
    if (typeof (event.data) === "string") {
      const msgs = FromJSON(event.data);
      const emitMsgs = this._sorter.ParseIncomingMessages(msgs);
      this.emit("message", emitMsgs);
    } else if (event.data instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
      reader.readAsText(event.data);
    }
  }

  protected OnReaderLoad(event: Event) {
    const msgs = FromJSON((event.target as FileReader).result);
    const emitMsgs = this._sorter.ParseIncomingMessages(msgs);
    this.emit("message", emitMsgs);
  }
}

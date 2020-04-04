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

  public Send = async (aMsg: ButtplugMessage): Promise<ButtplugMessage> => {
    if (!this.Connected) {
      throw new Error("ButtplugClient not connected");
    }
    const p = this._sorter.PrepareOutgoingMessage(aMsg);
    this.SendMessage(aMsg);
    return await p;
  }

  protected ParseIncomingMessage = (aEvent: MessageEvent) => {
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

  protected OnReaderLoad(aEvent: Event) {
    const msgs = FromJSON((aEvent.target as FileReader).result);
    const emitMsgs = this._sorter.ParseIncomingMessages(msgs);
    this.emit("message", emitMsgs);
  }
}

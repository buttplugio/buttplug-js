/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";
import * as WebSocket from "ws";
import { EventEmitter } from "events";
import { FromJSON, IButtplugClientConnector, ButtplugLogger, ButtplugMessage, ButtplugMessageSorter,
         ButtplugClientConnectorException, ButtplugMessageException } from "buttplug";

/**
 * Connector class for using the node ws library as a websocket client to a
 * buttplug server. Users should build an instance of this class and pass it to
 * the ButtplugClient.Connect() function.
 */
export class ButtplugNodeWebsocketClientConnector extends EventEmitter implements IButtplugClientConnector {

  private _sorter: ButtplugMessageSorter = new ButtplugMessageSorter();
  /// Websocket client
  private wsClient: WebSocket | null = null;
  /// URL to connect to
  private url: string;
  /// If true, reject unauthorized certificates that fail verification
  private rejectUnauthorized: boolean = true;

  /***
   * @param url URL of buttplug server to connect to
   * @param rejectUnauthorized If true, reject unauthorized certificates that fail verification
   */
  constructor(url: string, rejectUnauthorized: boolean) {
    super();
    this.rejectUnauthorized = rejectUnauthorized;
    this.url = url;
  }

  /***
   * Called by ButtplugClient to establish websocket connection.
   */
  public Connect = async () => {
    let res: () => void;
    let rej: () => void;
    const ws = new WebSocket(this.url, {
      rejectUnauthorized: this.rejectUnauthorized,
    });
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    // In websockets, our error rarely tells us much, as for security reasons
    // browsers usually only throw Error Code 1006. It's up to those using this
    // library to state what the problem might be.
    const conErrorCallback = (ev) => rej();
    ws.on("open", async (ev) => {
      ws.removeAllListeners();
      this.wsClient = ws;
      this.wsClient.on("message", (aMsg) => this.ParseIncomingMessage(aMsg));
      this.wsClient.on("close", this.Disconnect);
      this.wsClient.on("error", (e) =>
                       ButtplugLogger.Logger.Info("Websocket Error (Happens on close, possibly ignorable): " + e));
      res();
    });
    ws.on("close", conErrorCallback);
    return p;
  }

  /***
   * Called by ButtplugClient to disconnect websocket connection.
   */
  public Disconnect = () => {
    if (!this.Connected) {
      return;
    }
    this.wsClient!.close();
    this.wsClient = null;
  }

  /***
   * Called by ButtplugClient to send a message over the websocket.
   */
  public Send = async (aMsg: ButtplugMessage): Promise<ButtplugMessage> => {
    if (!this.Connected) {
      throw new ButtplugClientConnectorException("ButtplugClient not connected");
    }
    const p = this._sorter.PrepareOutgoingMessage(aMsg);
    this.wsClient!.send("[" + aMsg.toJSON() + "]");
    return await p;
  }

  private ParseIncomingMessage = (aMsg: WebSocket.Data) => {
    if (typeof (aMsg) === "string") {
      const msgs = FromJSON(aMsg);
      const emitMsgs = this._sorter.ParseIncomingMessages(msgs);
      this.emit("message", emitMsgs);
    } else {
      throw new ButtplugMessageException("Unknown message transfer type");
    }
  }

  /***
   * Called by ButtplugClient to verify connection status.
   */
  public get Connected(): boolean {
    return this.wsClient !== null;
  }
}

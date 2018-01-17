"use strict";
import * as WebSocket from "ws";
import { EventEmitter } from "events";
import { FromJSON, IButtplugConnector } from "..";

/**
 * Connector class for using the node ws library as a websocket client to a
 * buttplug server. Users should build an instance of this class and pass it to
 * the ButtplugClient.Connect() function.
 */
export class ButtplugNodeWebsocketClientConnector extends EventEmitter implements IButtplugConnector {

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
  public async Connect() {
    let res;
    let rej;
    const ws = new WebSocket(this.url, {
      rejectUnauthorized: this.rejectUnauthorized,
    });
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    // In websockets, our error rarely tells us much, as for security reasons
    // browsers usually only throw Error Code 1006. It's up to those using this
    // library to state what the problem might be.
    const conErrorCallback = (ev) => rej();
    ws.on("open", async (ev) => {
      this.wsClient = ws;
      this.wsClient.on("message", (aMsg) => { this.emit("message", FromJSON(aMsg)); });
      this.wsClient.on("close", this.Disconnect);
      res();
    });
    ws.on("close", conErrorCallback);
    return p;
  }

  /***
   * Called by ButtplugClient to disconnect websocket connection.
   */
  public Disconnect() {
    if (!this.IsConnected()) {
      throw new Error("Not connected!");
    }
    this.wsClient!.close();
  }

  /***
   * Called by ButtplugClient to send a message over the websocket.
   */
  public Send(msg) {
    if (!this.IsConnected()) {
      throw new Error("Not connected!");
    }
    // Make sure our message is packed in an array. Messy.
    this.wsClient!.send("[" + msg.toJSON() + "]");
  }

  /***
   * Called by ButtplugClient to verify connection status.
   */
  public IsConnected() {
    return this.wsClient !== null;
  }
}

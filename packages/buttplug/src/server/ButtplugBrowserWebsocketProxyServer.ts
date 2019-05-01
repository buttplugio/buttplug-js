/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";

import { ButtplugServer } from "./ButtplugServer";
import { FromJSON } from "../core/MessageUtils";

export class ButtplugBrowserWebsocketProxyServer {
  private _server: ButtplugServer | undefined;
  private _serverFactory: () => ButtplugServer;
  private _ws: WebSocket | undefined;
  private _url: string;

  public constructor(aUrl: string,
                     aFactory: () => ButtplugServer) {
    this._url = aUrl;
    this._serverFactory = aFactory;
  }

  public get Connected(): boolean {
    return this._ws !== undefined;
  }

  public Connect() {
    const ws = new WebSocket(this._url);
    let res;
    let rej;
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    // In websockets, our error rarely tells us much, as for security reasons
    // browsers usually only throw Error Code 1006. It's up to those using this
    // library to state what the problem might be.
    const conErrorCallback = (ev) => {
      this._ws = undefined;
      this._server = undefined;
      rej();
    };
    ws.addEventListener("open", async (ev) => {
      this._ws = ws;
      this._ws.removeEventListener("close", conErrorCallback);
      this._ws.addEventListener("close", this.Disconnect);
      this.InitServer();
      res();
    });
    ws.addEventListener("close", conErrorCallback);
    return p;
  }

  public Disconnect() {
    if (this._ws === undefined) {
      throw new Error("Websocket client is not connected");
    }
    this._ws.close();
    this._ws = undefined;
    this._server = undefined;
  }

  private InitServer = () => {
    if (this._ws === undefined) {
      throw new Error("Websocket client is not connected");
    }
    this._server = this._serverFactory();
    this._ws.addEventListener("message", async (message) => {
      if (this._ws === undefined || this._server === undefined) {
        return;
      }
      const msg = FromJSON(message);
      for (const m of msg) {
        const outgoing = await this._server.SendMessage(m);
        // Make sure our message is packed in an array, as the buttplug spec
        // requires.
        this._ws.send("[" + outgoing.toJSON() + "]");
      }
    });

    this._server.on("message", (message) => {
      if (this._ws === undefined) {
        return;
      }
      // Make sure our message is packed in an array, as the buttplug spec
      // requires.
      this._ws.send("[" + message.toJSON() + "]");
    });
  }

}

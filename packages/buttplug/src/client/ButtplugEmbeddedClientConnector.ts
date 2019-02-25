/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";

import { EventEmitter } from "events";
import { ButtplugMessage } from "../core/Messages";
import { IButtplugClientConnector } from "./IButtplugClientConnector";
import { ButtplugServer } from "../server/ButtplugServer";
import { ButtplugClientConnectorException } from "./ButtplugClientConnectorException";

export class ButtplugEmbeddedClientConnector extends EventEmitter implements IButtplugClientConnector {
  private _connected: boolean = false;
  private _server: ButtplugServer | null = null;

  public set Server(server: ButtplugServer | null) {
    this._server = server;
  }

  public get Server(): ButtplugServer | null {
    return this._server;
  }

  public get Connected(): boolean {
    return this._connected;
  }

  public Connect = async (): Promise<void> => {
    this._connected = true;
    if (this._server === null) {
      this._server = new ButtplugServer();
    }
    this._server.addListener("message", this.OnMessageReceived);
  }

  public Disconnect = () => {
    if (!this._connected) {
      return;
    }
    this._server!.Shutdown();
    this._connected = false;
    this._server = null;
    this.emit("disconnect");
  }

  public Send = async (aMsg: ButtplugMessage): Promise<ButtplugMessage> => {
    if (!this._connected) {
      throw new ButtplugClientConnectorException("Client not connected.");
    }
    return await this._server!.SendMessage(aMsg);
  }

  private OnMessageReceived = (aMsg: ButtplugMessage) => {
    this.emit("message", [aMsg]);
  }
}

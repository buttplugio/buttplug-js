"use strict";

import { EventEmitter } from "events";
import { ButtplugMessage } from "../core/Messages";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugServer } from "../server/ButtplugServer";
import { ButtplugException } from "../core/Exceptions";
import { ButtplugClientConnectorException } from "./ButtplugClientConnectorException";

export class ButtplugEmbeddedServerConnector extends EventEmitter implements IButtplugConnector {
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

  public Connect = (): Promise<void> => {
    this._connected = true;
    if (this._server === null) {
      this._server = new ButtplugServer();
    }
    this._server.addListener("message", this.OnMessageReceived);
    return Promise.resolve();
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
      return Promise.reject(new ButtplugClientConnectorException("Client not connected."));
    }
    return await this._server!.SendMessage(aMsg);
  }

  private OnMessageReceived = (aMsg: ButtplugMessage) => {
    this.emit("message", [aMsg]);
  }
}

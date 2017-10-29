"use strict";

import { EventEmitter } from "events";
import { ButtplugMessage } from "../core/Messages";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugServer } from "../server/ButtplugServer";

export class ButtplugBrowserConnector extends EventEmitter implements IButtplugConnector {
  private _connected: boolean = false;
  private _server: ButtplugServer | null = null;

  public IsConnected(): boolean {
    return this._connected;
  }

  public Connect = async (): Promise<void> => {
    this._connected = true;
    this._server = new ButtplugServer();
    this._server.addListener("message", this.OnMessageReceived);
    return Promise.resolve();
  }

  public Disconnect = () => {
    if (!this._connected) {
      return;
    }
    this._connected = false;
    this._server = null;
    this.emit("close");
  }

  public Send = async (aMsg: ButtplugMessage) => {
    if (!this._connected) {
      throw new Error("ButtplugClient not connected");
    }
    const returnMsg = await this._server!.SendMessage(aMsg);
    this.emit("message", [returnMsg]);
  }

  private OnMessageReceived = (aMsg: ButtplugMessage) => {
    this.emit("message", [aMsg]);
  }
}

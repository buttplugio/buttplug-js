"use strict";

import { EventEmitter } from "events";
import { ButtplugClient } from "./Client";
import { ButtplugMessage } from "../core/Messages";
import ButtplugServer from "../server/ButtplugServer";

export class ButtplugBrowserClient extends ButtplugClient {
  private _connected: boolean = false;
  private _server: ButtplugServer | null = null;

  constructor(aClientName: string) {
    super(aClientName);
  }

  public get Connected(): boolean {
    return this._connected;
  }

  public Connect = async (aUrl: string): Promise<void> => {
    this._connected = true;
    this._server = new ButtplugServer();
    // We'll never fail this.
    await this.InitializeConnection();
    return Promise.resolve();
  }

  public Disconnect = () => {
    if (!this.Connected) {
      return;
    }
    this._connected = false;
    this._server = null;
    this.emit("close");
  }

  protected Send = async (aMsg: ButtplugMessage) => {
    if (!this.Connected) {
      throw new Error("ButtplugClient not connected");
    }
    const returnMsg = await this._server!.SendMessage(aMsg);
    this.ParseMessages([returnMsg]);
  }
}

"use strict";

import { ButtplugLogger } from "../core/Logging";
import { EventEmitter } from "events";
import { Device } from "../core/Device";
import { IButtplugConnector } from "./IButtplugConnector";
import { ButtplugBrowserWebsocketConnector } from "./ButtplugBrowserWebsocketConnector";
import { ButtplugEmbeddedServerConnector } from "./ButtplugEmbeddedServerConnector";
import * as Messages from "../core/Messages";
import { CheckMessage } from "../core/MessageUtils";

export class ButtplugClient extends EventEmitter {
  protected _pingTimer: NodeJS.Timer | null = null;
  protected _connector: IButtplugConnector | null = null;
  protected _devices: Map<number, Device> = new Map();
  protected _counter: number = 1;
  protected _waitingMsgs: Map<number, (val: Messages.ButtplugMessage) => void> = new Map();
  protected _clientName: string;
  protected _logger = ButtplugLogger.Logger;
  // TODO This should be set on schema load
  protected _messageVersion: number = 1;

  constructor(aClientName: string = "Generic Buttplug Client") {
    super();
    this._clientName = aClientName;
    this._logger.Debug(`ButtplugClient: Client ${aClientName} created.`);
  }

  public ConnectWebsocket = async (aAddress: string) => {
    this._logger.Info(`ButtplugClient: Connecting to ${aAddress}`);
    await this.Connect(new ButtplugBrowserWebsocketConnector(aAddress));
  }

  public ConnectLocal = async () => {
    this._logger.Info(`ButtplugClient: Connecting to In-Browser Server`);
    await this.Connect(new ButtplugEmbeddedServerConnector());
  }

  public Connect = async (aConnector: IButtplugConnector) => {
    this._logger.Info(`ButtplugClient: Connecting using ${aConnector.constructor.name}`);
    await aConnector.Connect();
    this._connector = aConnector;
    this._connector.addListener("message", this.ParseMessages);
    this._connector.addListener("disconnect", this.DisconnectHandler);
    await this.InitializeConnection();
  }

  public get Connected(): boolean {
    return this._connector !== null && this._connector.IsConnected();
  }

  public Disconnect() {
    this._logger.Debug(`ButtplugClient: Disconnect called`);
    this.CheckConnector();
    this.ShutdownConnection();
    this._connector!.Disconnect();
  }

  public RequestDeviceList = async () => {
    this.CheckConnector();
    this._logger.Debug(`ButtplugClient: ReceiveDeviceList called`);
    const deviceList = (await this.SendMessage(new Messages.RequestDeviceList())) as Messages.DeviceList;
    deviceList.Devices.forEach((d) => {
      if (!this._devices.has(d.DeviceIndex)) {
        const device = Device.fromMsg(d);
        this._logger.Debug(`ButtplugClient: Adding Device: ${device}`);
        this._devices.set(d.DeviceIndex, device);
        this.emit("deviceadded", device);
      } else {
        this._logger.Debug(`ButtplugClient: Device already added: ${d}`);
      }
    });
  }

  public getDevices(): Device[] {
    // While this function doesn't actually send a message, if we don't have a
    // connector, we shouldn't have devices.
    this.CheckConnector();
    const devices: Device[] = [];
    this._devices.forEach((d, i) => {
      devices.push(d);
    });
    return devices;
  }

  public StartScanning = async (): Promise<void> => {
    this._logger.Debug(`ButtplugClient: StartScanning called`);
    return await this.SendMsgExpectOk(new Messages.StartScanning());
  }

  public StopScanning = async (): Promise<void> => {
    this._logger.Debug(`ButtplugClient: StopScanning called`);
    return await this.SendMsgExpectOk(new Messages.StopScanning());
  }

  public RequestLog = async (aLogLevel: string): Promise<void> => {
    this._logger.Debug(`ButtplugClient: RequestLog called with level ${aLogLevel}`);
    return await this.SendMsgExpectOk(new Messages.RequestLog(aLogLevel));
  }

  public StopAllDevices = async (): Promise<void> => {
    this._logger.Debug(`ButtplugClient: StopAllDevices`);
    return await this.SendMsgExpectOk(new Messages.StopAllDevices());
  }

  public async SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void> {
    this.CheckConnector();
    const dev = this._devices.get(aDevice.Index);
    if (dev === undefined) {
      this._logger.Error(`Device ${aDevice} not available.`);
      return Promise.reject(new Error("Device not available."));
    }
    if (dev.AllowedMessages.indexOf(aDeviceMsg.Type) === -1) {
      this._logger.Error(`Device ${aDevice} does not accept message type ${aDeviceMsg.Type}.`);
      return Promise.reject(new Error(`Device ${aDevice} does not accept message type ${aDeviceMsg.Type}.`));
    }
    aDeviceMsg.DeviceIndex = aDevice.Index;
    return await this.SendMsgExpectOk(aDeviceMsg);
  }

  public ParseMessages = (aMsgs: Messages.ButtplugMessage[]) => {
    this.ParseMessagesInternal(aMsgs);
  }

  protected DisconnectHandler = () => {
    this._logger.Info(`ButtplugClient: Disconnect event receieved.`);
    this.emit("disconnect");
  }

  protected ParseMessagesInternal(aMsgs: Messages.ButtplugMessage[]) {
    for (const x of aMsgs) {
      if (x.Id > 0 && this._waitingMsgs.has(x.Id)) {
        const res = this._waitingMsgs.get(x.Id);
        res!(x);
        return;
      }
      switch (x.Type) {
      case "Log":
        this.emit("log", x);
        break;
      case "DeviceAdded":
        const addedMsg = x as Messages.DeviceAdded;
        const addedDevice = Device.fromMsg(addedMsg);
        this._devices.set(addedMsg.DeviceIndex, addedDevice);
        this.emit("deviceadded", addedDevice);
        break;
      case "DeviceRemoved":
        const removedMsg = x as Messages.DeviceRemoved;
        if (this._devices.has(removedMsg.DeviceIndex)) {
          const removedDevice = this._devices.get(removedMsg.DeviceIndex);
          this._devices.delete(removedMsg.DeviceIndex);
          this.emit("deviceremoved", removedDevice);
        }
        break;
      case "ScanningFinished":
        this.emit("scanningfinished", x);
        break;
      }
    }
  }

  protected InitializeConnection = async (): Promise<boolean> => {
    this.CheckConnector();
    const msg = await this.SendMessage(new Messages.RequestServerInfo(this._clientName, 1));
    switch (msg.Type) {
    case "ServerInfo": {
      const info = msg as Messages.ServerInfo;
      this._logger.Info(`ButtplugClient: Connected to Server ${info.ServerName}`);
      // TODO: maybe store server name, do something with message template version?
      const ping = (msg as Messages.ServerInfo).MaxPingTime;
      if (ping > 0) {
        this._pingTimer = setInterval(() => {
          // If we've disconnected, stop trying to ping the server.
          if (!this.Connected) {
            this.ShutdownConnection();
            return;
          }
          this.SendMessage(new Messages.Ping(this._counter));
        } , Math.round(ping / 2));
      }
      return true;
    }
    case "Error": {
      const err = msg as Messages.Error;
      this._logger.Error(`ButtplugClient: Cannot connect to server. ${err.ErrorMessage}`);
      this._connector!.Disconnect();
    }
    }
    return false;
  }

  protected ShutdownConnection = () => {
    if (this._pingTimer !== null) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
  }

  protected async SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    this.CheckConnector();
    // This will throw if our message is invalid
    CheckMessage(aMsg);
    let res;
    aMsg.Id = this._counter;
    const msgPromise = new Promise<Messages.ButtplugMessage>((resolve) => { res = resolve; });
    this._waitingMsgs.set(this._counter, res);
    this._counter += 1;
    this._connector!.Send(aMsg);
    return await msgPromise;
  }

  protected CheckConnector() {
    if (!this.Connected) {
      throw new Error("ButtplugClient not connected");
    }
  }

  protected SendMsgExpectOk = async (aMsg: Messages.ButtplugMessage): Promise<void> => {
    let res;
    let rej;
    const msg = await this.SendMessage(aMsg);
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    switch (msg.Type) {
    case "Ok":
      res();
      break;
    default:
      rej(msg);
      break;
    }
    return p;
  }
}

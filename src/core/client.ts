"use strict";

import { EventEmitter } from "events";
import { Device } from "./device";
import * as Messages from "./messages";

export class ButtplugClient extends EventEmitter {
  private _devices: Map<number, Device> = new Map();
  private _ws: WebSocket | undefined;
  private _counter: number = 1;
  private _waitingMsgs: Map<number, (val: Messages.ButtplugMessage) => void> = new Map();
  private _clientName: string;
  private _pingTimer: NodeJS.Timer;

  constructor(aClientName: string) {
    super();
    this._clientName = aClientName;
  }

  get Connected(): boolean {
    return this._ws !== undefined;
  }

  public Connect = async (aUrl: string): Promise<void> => {
    const ws = new WebSocket(aUrl);
    ws.addEventListener("message", (ev) => { this.ParseIncomingMessage(ev); });
    let res;
    let rej;
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    const conErrorCallback = (ev) => { rej(ev); };
    ws.addEventListener("open", async (ev) => {
      this._ws = ws;
      const msg = await this.SendMessage(new Messages.RequestServerInfo(this._clientName));
      switch (msg.getType()) {
        case "ServerInfo": {
          // TODO: maybe store server name, do something with message template version?
          const ping = (msg as Messages.ServerInfo).MaxPingTime;
          if (ping > 0) {
            this._pingTimer = setInterval(() =>
              this.SendMessage(new Messages.Ping(this._counter)), Math.round(ping / 2));
          }
          this._ws.removeEventListener("close", conErrorCallback);
          this._ws.addEventListener("close", this.Disconnect);
          res();
          break;
        }
        case "Error": {
          this.Disconnect();
          rej();
          break;
        }
      }
    });
    ws.addEventListener("close", conErrorCallback);
    return p;
  }

  public Disconnect = () => {
    if (this._pingTimer) {
      clearInterval(this._pingTimer);
    }
    if (this._ws === undefined) {
      return;
    }
    this._ws.close();
    this._ws = undefined;
    this.emit("close");
  }

  public RequestDeviceList = async () => {
    if (this._ws === undefined) {
      throw new Error("ButtplugClient not connected");
    }
    const deviceList = (await this.SendMessage(new Messages.RequestDeviceList())) as Messages.DeviceList;
    deviceList.Devices.forEach((d) => {
      if (!this._devices.has(d.DeviceIndex)) {
        const device = Device.fromMsg(d);
        this._devices.set(d.DeviceIndex, device);
        this.emit("deviceadded", device);
      }
    });
  }

  public getDevices(): Device[] {
    if (this._ws === undefined) {
      throw new Error("ButtplugClient not connected");
    }
    const devices: Device[] = [];
    this._devices.forEach((d, i) => {
      devices.push(d);
    });
    return devices;
  }

  public StartScanning = async (): Promise<void> => {
    return await this.SendMsgExpectOk(new Messages.StartScanning());
  }

  public StopScanning = async (): Promise<void> => {
    return await this.SendMsgExpectOk(new Messages.StopScanning());
  }

  public RequestLog = async (aLogLevel: string): Promise<void> => {
    return await this.SendMsgExpectOk(new Messages.RequestLog(aLogLevel));
  }

  public StopAllDevices = async (): Promise<void> => {
    return await this.SendMsgExpectOk(new Messages.StopAllDevices());
  }

  public async SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void> {
    if (this._ws === undefined) {
      throw new Error("ButtplugClient not connected");
    }
    const dev = this._devices.get(aDevice.Index);
    if (dev === undefined) {
      return Promise.reject(new Error("Device not available."));
    }
    if (dev.AllowedMessages.indexOf(aDeviceMsg.getType()) === -1) {
      return Promise.reject(new Error("Device does not accept that message type."));
    }
    aDeviceMsg.DeviceIndex = aDevice.Index;
    return await this.SendMsgExpectOk(aDeviceMsg);
  }

  public ParseJSONMessage = (aJSONMsg: string) => {
    const msgs = Messages.FromJSON(aJSONMsg);
    msgs.forEach((x: Messages.ButtplugMessage) => {
      if (x.Id > 0 && this._waitingMsgs.has(x.Id)) {
        const res = this._waitingMsgs.get(x.Id);
        res!(x);
        return;
      }
      switch (x.constructor.name) {
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
    });
  }

  public ParseIncomingMessage = (aEvent: MessageEvent) => {
    if (typeof (aEvent.data) === "string") {
      this.ParseJSONMessage(aEvent.data);
    } else if (aEvent.data instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
      reader.readAsText(aEvent.data);
    }
  }

  private onWebsocketClose = (ev: Event) => {
    const a = 1;
  }

  private async SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    if (this._ws === undefined) {
      throw new Error("ButtplugClient not connected");
    }
    let res;
    aMsg.Id = this._counter;
    const msgPromise = new Promise<Messages.ButtplugMessage>((resolve) => { res = resolve; });
    this._waitingMsgs.set(this._counter, res);
    this._counter += 1;
    this._ws.send("[" + aMsg.toJSON() + "]");
    return await msgPromise;
  }

  private SendMsgExpectOk = async (aMsg: Messages.ButtplugMessage): Promise<void> => {
    let res;
    let rej;
    const msg = await this.SendMessage(aMsg);
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    switch (msg.getType()) {
      case "Ok":
        res();
        break;
      default:
        rej();
        break;
    }
    return p;
  }

  private OnReaderLoad(aEvent: Event) {
    this.ParseJSONMessage((aEvent.target as FileReader).result);
  }
}

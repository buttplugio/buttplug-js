"use strict";

import { EventEmitter } from "events";
import { Device } from "./device";
import * as Messages from "./messages";

export class ButtplugClient extends EventEmitter {
  private _devices: Map<number, Device> = new Map();
  private _ws: WebSocket;
  private _counter: number = 1;
  private _waitingMsgs: Map<number, (val: Messages.ButtplugMessage) => void> = new Map();
  private _clientName: string;
  private _pingTimer;

  constructor(aClientName: string) {
    super();
    this._clientName = aClientName;
  }

  public Connect = async (aUrl: string): Promise<void> => {
    this._ws = new WebSocket(aUrl);
    this._ws.addEventListener("message", (ev) => { this.ParseIncomingMessage(ev); });
    let res, rej;
    const p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    this._ws.addEventListener("open", async (ev) => {
      const msg = await this.SendMessage(new Messages.RequestServerInfo(this._clientName));
      switch (msg.getType()) {
        case "ServerInfo":
          // TODO: maybe store server name, do something with message template version?
          const ping = (msg as Messages.ServerInfo).MaxPingTime;
          if (ping > 0) {
            this._pingTimer = setInterval(() =>
              this.SendMessage(new Messages.Ping(this._counter)), Math.round(ping / 2));
          }
          res();
          break;
        case "Error":
          rej();
          break;
      }
    });
    this._ws.addEventListener("close", (ev) => { rej(ev); });
    return p;
  }

  private async SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    let res;
    aMsg.Id = this._counter;
    const msgPromise = new Promise<Messages.ButtplugMessage>((resolve) => { res = resolve; });
    this._waitingMsgs.set(this._counter, res);
    this._counter += 1;
    this._ws.send("[" + aMsg.toJSON() + "]");
    return await msgPromise;
  }

  private SendMsgExpectOk = async (aMsg: Messages.ButtplugMessage): Promise<void> => {
    let res, rej;
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

  public RequestDeviceList = async () => {
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

  private OnReaderLoad(aEvent: Event) {
    this.ParseJSONMessage((aEvent.target as FileReader).result);
  }

  public async SendDeviceMessage(aDevice: Device, aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void> {
    const dev = this._devices.get(aDevice.Index);
    if (dev === undefined) {
      return Promise.reject(new Error("Device not available."));
    }
    if (dev.AllowedMessages.indexOf(aDeviceMsg.getType()) == -1) {
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
        // We already checked for this via has, but typescript is bitching if I
        // don't do it again.
        if (res === undefined) {
          return;
        }
        res(x);
        return;
      }
      switch (x.constructor.name) {
        case "Log":
          this.emit("log", x);
          break;
        case "DeviceAdded":
          const added_msg = x as Messages.DeviceAdded;
          const d = Device.fromMsg(added_msg);
          this._devices.set(added_msg.DeviceIndex, d);
          this.emit("deviceadded", d);
          break;
        case "DeviceRemoved":
          const removed_msg = x as Messages.DeviceRemoved;
          if (this._devices.has(removed_msg.DeviceIndex)) {
            const d = this._devices.get(removed_msg.DeviceIndex);
            this._devices.delete(removed_msg.DeviceIndex);
            this.emit("deviceremoved", d);
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
    }
    else if (aEvent.data instanceof Blob) {
      const reader = new FileReader();
      reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
      reader.readAsText(aEvent.data);
    }
  }
}

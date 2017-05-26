'use strict';

import { EventEmitter } from 'events';
import * as Messages from './messages';
import { Device } from './device';

export class ButtplugClient extends EventEmitter {
  private _devices: Map<number, Device> = new Map();
  private _ws: WebSocket;
  private _counter: number = 1;
  private _waitingMsgs: Map<number, (val: Messages.ButtplugMessage) => void> = new Map();

  constructor() {
    super();
  }

  public Connect = (aUrl: string) => {
    this._ws = new WebSocket(aUrl);
    this._ws.addEventListener('message', (ev) => { this.ParseIncomingMessage(ev) });
  }

  private async SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    let res;
    aMsg.Id = this._counter;
    let msgPromise = new Promise<Messages.ButtplugMessage>(resolve => { res = resolve; });
    this._waitingMsgs.set(this._counter, res);
    this._counter += 1;
    this._ws.send("[" + aMsg.toJSON() + "]");
    return await msgPromise;
  }

  private SendMsgExpectOk = async (aMsg: Messages.ButtplugMessage): Promise<void> => {
    let res, rej;
    let msg = await this.SendMessage(aMsg);
    let p = new Promise<void>((resolve, reject) => { res = resolve; rej = reject; });
    switch (msg.getType()) {
      case 'Ok':
        res();
        break
      default:
        rej();
        break;
    }
    return p;
  }

  public RequestDeviceList = async () => {
    let deviceList = await this.SendMessage(new Messages.RequestDeviceList());
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

  public async SendDeviceMessage(aDevice: Device,
    aDeviceMsg: Messages.ButtplugDeviceMessage)
    : Promise<void> {
    if (aDevice.AllowedMessages.indexOf(aDeviceMsg.getType()) == -1) {
      return Promise.reject(new Error("Device does not accept that message type."));
    }
    return await this.SendMsgExpectOk(aDeviceMsg);
  }

  public ParseJSONMessage = (aJSONMsg: string) => {
    let msgs = Messages.FromJSON(aJSONMsg);
    msgs.forEach((x: Messages.ButtplugMessage) => {
      if (x.Id > 0 && this._waitingMsgs.has(x.Id)) {
        let res = this._waitingMsgs.get(x.Id);
        // We already checked for this via has, but typescript is bitching if I
        // don't do it again.
        if (res === undefined) {
          return;
        }
        res(x);
        return;
      }
      switch (x.constructor.name) {
        case 'Log':
          this.emit('log', x);
          break;
        case 'DeviceAdded':
          let added_msg = x as Messages.DeviceAdded;
          let d = Device.fromMsg(added_msg)
          this._devices.set(added_msg.DeviceIndex, d);
          this.emit('deviceadded', d);
          break;
        case 'DeviceRemoved':
          let removed_msg = x as Messages.DeviceRemoved;
          if (this._devices.has(removed_msg.DeviceIndex)) {
            let d = this._devices.get(removed_msg.DeviceIndex);
            this._devices.delete(removed_msg.DeviceIndex);
            this.emit('deviceremoved', d);
          }
          break;
      };
    });
  }

  public ParseIncomingMessage = (aEvent: MessageEvent) => {
    if (typeof (aEvent.data) === 'string') {
      this.ParseJSONMessage(aEvent.data);
    }
    else if (aEvent.data instanceof Blob) {
      let reader = new FileReader();
      reader.addEventListener('load', (ev) => { this.OnReaderLoad(ev) });
      reader.readAsText(aEvent.data);
    }
  }
}

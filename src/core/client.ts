'use strict';

import {EventEmitter} from 'events';
import * as Messages from './messages';
import {Device} from './device';

export class ButtplugClient extends EventEmitter
{
  private _devices : Map<number, Device> = new Map();
  private _ws : WebSocket;
  private _counter : number = 1;
  private _waitingMsgs : Map<number, (val: Messages.ButtplugMessage) => void > = new Map();

  constructor()
  {
    super();
  }

  public Connect = (aUrl: string) =>
  {
    this._ws = new WebSocket(aUrl);
    this._ws.addEventListener('message', (ev) => { this.ParseIncomingMessage(ev) });
  }

  private async SendMessage(aMsg: Messages.ButtplugMessage) : Promise<Messages.ButtplugMessage>
  {
    let res;
    aMsg.Id = this._counter;
    let msgPromise = new Promise<Messages.ButtplugMessage>(resolve => { res=resolve; });
    this._waitingMsgs.set(this._counter, res);
    this._counter += 1;
    this._ws.send("[" + aMsg.toJSON() + "]");
    return await msgPromise;
  }

  public async RequestDeviceList()
  {
    return await this.SendMessage(new Messages.RequestDeviceList());
  }

  public async StartScanning()
  {
    return await this.SendMessage(new Messages.StartScanning());
  }

  public async StopScanning()
  {
    return await this.SendMessage(new Messages.StopScanning());
  }

  public async RequestLog(aLogLevel: string)
  {
    return await this.SendMessage(new Messages.RequestLog(aLogLevel));
  }

  public OnReaderLoad(aEvent: Event) {
    this.ParseJSONMessage((aEvent.target as FileReader).result);
  }

  public ParseJSONMessage = (aJSONMsg: string) => {
    let msgs = Messages.FromJSON(aJSONMsg);
    msgs.forEach((x : Messages.ButtplugMessage) => {
      if (this._waitingMsgs.has(x.Id))
      {
        let res = this._waitingMsgs.get(x.Id);
        if (res === undefined)
        {
          return;
        }
        res(x);
      }
    });
  }

  public ParseIncomingMessage = (aEvent: MessageEvent) =>
  {
    if (typeof(aEvent.data) === 'string')
    {
      this.ParseJSONMessage(aEvent.data);
    }
    else if (aEvent.data instanceof Blob)
    {
      let reader = new FileReader();
      reader.addEventListener('load', (ev) => { this.OnReaderLoad(ev) });
      reader.readAsText(aEvent.data);
    }
  }
}

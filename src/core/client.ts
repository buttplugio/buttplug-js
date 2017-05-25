'use strict';

//import EventEmitter from 'events';
import * as Messages from './messages';

export class ButtplugClient //extends EventEmitter
{
  private _devices : object;
  private _ws : WebSocket;

  constructor()
  {
  //  super();
    this._devices = new Map();

  }

  public Connect = (aUrl: string) =>
  {
    this._ws = new WebSocket(aUrl);
    this._ws.addEventListener('message', (ev) => { this.ParseIncomingMessage(ev) });
  }

  private async SendMessage(aMsg: Messages.ButtplugMessage)
  {
    this._ws.send(aMsg.toJSON());
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

  public OnReaderLoad(aEvent: Event)
  {
    this.ParseJSONMessage((aEvent.target as FileReader).result);
  }

  public ParseJSONMessage(aJSONMsg: string)
  {
    let msgs = Messages.FromJSON(aJSONMsg);
    console.log(msgs)
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

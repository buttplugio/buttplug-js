'use strict';

import EventEmitter from 'events';
import * as Messages from './messages';

class ButtplugClient extends EventEmitter
{
  private _devices : object = new Map();
  private _ws : WebSocket;
  private _reader : FileReader = new FileReader();

  constructor()
  {
    super();
    this._reader.onload = this.OnReaderLoad;
  }

  public Connect(aUrl: string)
  {
    this._ws = new WebSocket(aUrl);
    this._ws.onmessage = this.ParseIncomingMessage;
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
    this.ParseJSONMessage(this._reader.result);
  }

  public ParseJSONMessage(aJSONMsg: string)
  {
    let msgs = Messages.FromJSON(aJSONMsg);
    console.log(msgs)
  }

  public ParseIncomingMessage(aEvent: MessageEvent)
  {
    if (typeof(aEvent.data) === 'string')
    {
      this.ParseJSONMessage(aEvent.data);
    }
    else if (aEvent.data instanceof Blob)
    {
      this._reader.readAsText(aEvent.data);
    }
  }
}

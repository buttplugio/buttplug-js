'use strict'
import * as Messages from './messages';

export class Device {
  constructor(private _index: number,
    private _name: string,
    private _allowedMessages: Array<string>) {
  }

  static fromMsg(aMsg: Messages.DeviceAdded | Messages.Device): Device {
    return new Device(aMsg.DeviceIndex,
      aMsg.DeviceName,
      aMsg.DeviceMessages);
  }

  public get Name(): string {
    return this._name;
  }

  public get Index(): number {
    return this._index;
  }

  public get AllowedMessages(): Array<string> {
    return this._allowedMessages;
  }
}

"use strict";
import * as Messages from "./Messages";

export class Device {
  public static fromMsg(aMsg: Messages.DeviceAdded | Messages.DeviceInfo): Device {
    return new Device(aMsg.DeviceIndex,
                      aMsg.DeviceName,
                      aMsg.DeviceMessages);
  }

  constructor(private _index: number,
              private _name: string,
              private _allowedMessages: string[]) {
  }

  public get Name(): string {
    return this._name;
  }

  public get Index(): number {
    return this._index;
  }

  public get AllowedMessages(): string[] {
    return this._allowedMessages;
  }

  public newMessage(allowedMsg: number): Messages.ButtplugMessage {
    const msg = this._allowedMessages[allowedMsg];
    return Messages[msg];
  }
}

"use strict";
import * as Messages from "./Messages";

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class Device {
  public static fromMsg(aMsg: Messages.DeviceAdded | Messages.DeviceInfo): Device {
    return new Device(aMsg.DeviceIndex,
                      aMsg.DeviceName,
                      aMsg.DeviceMessages);
  }

  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param _allowedMsgs Buttplug messages the device can receive.
   */
  constructor(private index: number,
              private name: string,
              private allowedMsgs: object) {
  }

  /**
   * Return the name of the device.
   */
  public get Name(): string {
    return this.name;
  }

  /**
   * Return the index of the device.
   */
  public get Index(): number {
    return this.index;
  }

  /**
   * Return a list of message types the device accepts.
   */
  public get AllowedMessages(): string[] {
    return Object.keys(this.allowedMsgs);
  }
}

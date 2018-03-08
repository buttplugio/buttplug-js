"use strict";
import * as Messages from "./Messages";

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class Device {
  public static fromMsg(aMsg: Messages.DeviceAddedVersion1 | Messages.DeviceInfoWithSpecifications): Device {
    return new Device(aMsg.DeviceIndex,
                      aMsg.DeviceName,
                      aMsg.DeviceMessages);
  }

  // Map of messages and their attributes (feature count, etc...)
  private allowedMsgs: Map<string, Messages.MessageAttributes> = new Map<string, Messages.MessageAttributes>();

  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param _allowedMsgs Buttplug messages the device can receive.
   */
  constructor(private index: number,
              private name: string,
              allowedMsgsObj: object) {
    for (const k of Object.keys(allowedMsgsObj)) {
      this.allowedMsgs.set(k, allowedMsgsObj[k]);
    }
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
    return Array.from(this.allowedMsgs.keys());
  }

  /**
   * Return the message attributes related to the given message
   */
  public MessageAttributes(messageName: string): Messages.MessageAttributes {
    if (this.AllowedMessages.indexOf(messageName) === -1) {
      throw new Error(`Message ${messageName} does not exist on device ${this.name}`);
    }
    return this.allowedMsgs.get(messageName)!;
  }
}

"use strict";
"use strict";
import * as Messages from "../core/Messages";
import { ButtplugDeviceException } from "../core/Exceptions";

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice {
  public static fromMsg(aMsg: Messages.DeviceAdded | Messages.DeviceInfoWithSpecifications): ButtplugClientDevice {
    return new ButtplugClientDevice(aMsg.DeviceIndex,
                                    aMsg.DeviceName,
                                    aMsg.DeviceMessages);
  }

  // Map of messages and their attributes (feature count, etc...)
  private allowedMsgs: Map<string, Messages.MessageAttributes> = new Map<string, Messages.MessageAttributes>();

  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param allowedMsgs Buttplug messages the device can receive.
   */
  constructor(private _index: number,
              private _name: string,
              allowedMsgsObj: object) {
    for (const k of Object.keys(allowedMsgsObj)) {
      this.allowedMsgs.set(k, allowedMsgsObj[k]);
    }
  }

  /**
   * Return the name of the device.
   */
  public get Name(): string {
    return this._name;
  }

  /**
   * Return the index of the device.
   */
  public get Index(): number {
    return this._index;
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
      throw new ButtplugDeviceException(`Message ${messageName} does not exist on device ${this._name}`);
    }
    return this.allowedMsgs.get(messageName)!;
  }
}

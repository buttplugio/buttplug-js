/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";
import * as Messages from "../core/Messages";
import { ButtplugDeviceException } from "../core/Exceptions";
import { EventEmitter } from "events";

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice extends EventEmitter {

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

  public get AllowedMessagesObject(): object {
    const obj = {};
    this.allowedMsgs.forEach((value, key) => { obj[key] = value; });
    return obj;
  }

  public static fromMsg(msg: Messages.DeviceAdded | Messages.DeviceInfo,
                        sendClosure: (device: ButtplugClientDevice,
                                      msg: Messages.ButtplugDeviceMessage) => Promise<void>): ButtplugClientDevice {
    return new ButtplugClientDevice(msg.DeviceIndex,
                                    msg.DeviceName,
                                    msg.DeviceMessages,
                                    sendClosure);
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
              allowedMsgsObj: object,
              private _sendClosure: (device: ButtplugClientDevice,
                                     msg: Messages.ButtplugDeviceMessage) => Promise<void>) {
    super();
    for (const k of Object.keys(allowedMsgsObj)) {
      this.allowedMsgs.set(k, allowedMsgsObj[k]);
    }
  }

  public CheckAllowedMessageType(name: string) {
    if (this.AllowedMessages.indexOf(name) === -1) {
      throw new ButtplugDeviceException(`Message ${name} does not exist on device ${this._name}`);
    }
  }

  /**
   * Return the message attributes related to the given message
   */
  public MessageAttributes(messageName: string): Messages.MessageAttributes {
    this.CheckAllowedMessageType(messageName);
    return this.allowedMsgs.get(messageName)!;
  }

  public async SendMessageAsync(msg: Messages.ButtplugDeviceMessage): Promise<void> {
    // Assume we're getting the closure from ButtplugClient, which does all of
    // the index/existence/connection/message checks for us.
    await this._sendClosure(this, msg);
  }

  public async SendVibrateCmd(speed: number | number[]): Promise<void> {
    this.CheckAllowedMessageType(Messages.VibrateCmd.name);
    let msg: Messages.VibrateCmd;
    if (typeof(speed) === "number") {
      // We can skip the check here since we're building the command array ourselves.
      const features = this.MessageAttributes(Messages.VibrateCmd.name).FeatureCount;
      msg = Messages.VibrateCmd.Create(this._index,
                                       new Array(features).fill(speed));
    } else if (Array.isArray(speed)) {
      msg = Messages.VibrateCmd.Create(this._index,
                                       speed);
      this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name,
                                      msg.Speeds,
                                      this.MessageAttributes(Messages.VibrateCmd.name).FeatureCount);
    } else {
      throw new ButtplugDeviceException("SendVibrateCmd can only take numbers or arrays of numbers.");
    }
    await this.SendMessageAsync(msg);
  }

  public async SendRotateCmd(values: number | [number, boolean][], clockwise?: boolean): Promise<void> {
    this.CheckAllowedMessageType(Messages.RotateCmd.name);
    let msg: Messages.RotateCmd;
    if (typeof(values) === "number") {
      // We can skip the check here since we're building the command array ourselves.
      const features = this.MessageAttributes(Messages.RotateCmd.name).FeatureCount;
      msg = Messages.RotateCmd.Create(this._index,
                                      new Array(features).fill([values, clockwise]));
    } else if (Array.isArray(values)) {
      msg = Messages.RotateCmd.Create(this._index,
                                      values);
      this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name,
                                      msg.Rotations,
                                      this.MessageAttributes(Messages.RotateCmd.name).FeatureCount);
    } else {
      throw new ButtplugDeviceException(
        "SendRotateCmd can only take a number and boolean, or an array of number/boolean tuples");
    }
    await this.SendMessageAsync(msg);
  }

  public async SendLinearCmd(values: number | [number, number][], duration?: number): Promise<void> {
    this.CheckAllowedMessageType(Messages.LinearCmd.name);
    let msg: Messages.LinearCmd;
    if (typeof(values) === "number") {
      // We can skip the check here since we're building the command array ourselves.
      const features = this.MessageAttributes(Messages.LinearCmd.name).FeatureCount;
      msg = Messages.LinearCmd.Create(this._index,
                                      new Array(features).fill([values, duration]));
    } else if (Array.isArray(values)) {
      msg = Messages.LinearCmd.Create(this._index,
                                      values);
      this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name,
                                      msg.Vectors,
                                      this.MessageAttributes(Messages.LinearCmd.name).FeatureCount);
    } else {
      throw new ButtplugDeviceException(
        "SendLinearCmd can only take a number and number, or an array of number/number tuples");
    }
    await this.SendMessageAsync(msg);
  }

  public async SendStopDeviceCmd(): Promise<void> {
    // Every message should support this, but it doesn't hurt to check
    this.CheckAllowedMessageType(Messages.StopDeviceCmd.name);
    await this.SendMessageAsync(new Messages.StopDeviceCmd(this._index));
  }

  public EmitDisconnected() {
    this.emit("deviceremoved");
  }

  private CheckGenericSubcommandList<T extends Messages.GenericMessageSubcommand>(type: string,
                                                                                  cmdList: T[],
                                                                                  limitValue: number) {
    if (cmdList.length === 0 || cmdList.length > limitValue) {
      if (limitValue === 1) {
        throw new ButtplugDeviceException(
          `${type} requires 1 subcommand for this device, ${cmdList.length} present.`);
      }

      throw new ButtplugDeviceException(
        `${type} requires between 1 and ${limitValue} subcommands for this device, ${cmdList.length} present.`);
    }

    for (const cmd of cmdList) {
      if (cmd.Index >= limitValue) {
        throw new ButtplugDeviceException(`Index ${cmd.Index} is out of bounds for ${type} for this device.`);
      }
    }
  }
}

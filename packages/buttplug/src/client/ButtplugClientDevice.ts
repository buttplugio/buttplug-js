"use strict";
import * as Messages from "../core/Messages";
import { ButtplugDeviceException } from "../core/Exceptions";

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice {

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
  public static fromMsg(aMsg: Messages.DeviceAdded | Messages.DeviceInfoWithSpecifications,
                        sendClosure: (aDevice: ButtplugClientDevice,
                                      aMsg: Messages.ButtplugDeviceMessage) => Promise<void>): ButtplugClientDevice {
    return new ButtplugClientDevice(aMsg.DeviceIndex,
                                    aMsg.DeviceName,
                                    aMsg.DeviceMessages,
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
              private _sendClosure: (aDevice: ButtplugClientDevice,
                                     aMsg: Messages.ButtplugDeviceMessage) => Promise<void>) {
    for (const k of Object.keys(allowedMsgsObj)) {
      this.allowedMsgs.set(k, allowedMsgsObj[k]);
    }
  }

  public CheckAllowedMessageType(aName: string) {
    if (this.AllowedMessages.indexOf(aName) === -1) {
      throw new ButtplugDeviceException(`Message ${aName} does not exist on device ${this._name}`);
    }
  }

  /**
   * Return the message attributes related to the given message
   */
  public MessageAttributes(messageName: string): Messages.MessageAttributes {
    this.CheckAllowedMessageType(messageName);
    return this.allowedMsgs.get(messageName)!;
  }

  public async SendMessageAsync(aMsg: Messages.ButtplugDeviceMessage): Promise<void> {
    // Assume we're getting the closure from ButtplugClient, which does all of
    // the index/existence/connection/message checks for us.
    await this._sendClosure(this, aMsg);
  }

  public async SendVibrateCmd(aSpeed: number | number[]): Promise<void> {
    this.CheckAllowedMessageType(Messages.VibrateCmd.name);
    let msg: Messages.VibrateCmd;
    if (typeof(aSpeed) === "number") {
      // We can skip the check here since we're building the command array ourselves.
      const features = this.MessageAttributes(Messages.VibrateCmd.name).FeatureCount;
      msg = Messages.VibrateCmd.Create(this._index,
                                       new Array(features).fill(aSpeed));
    } else if (Array.isArray(aSpeed)) {
      msg = Messages.VibrateCmd.Create(this._index,
                                       aSpeed);
      this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name,
                                      msg.Speeds,
                                      this.MessageAttributes(Messages.VibrateCmd.name).FeatureCount);
    } else {
      throw new ButtplugDeviceException("SendVibrateCmd can only take numbers or arrays of numbers.");
    }
    await this.SendMessageAsync(msg);
  }

  public async SendRotateCmd(aValues: number | Array<[number, boolean]>, aClockwise?: boolean): Promise<void> {
    this.CheckAllowedMessageType(Messages.RotateCmd.name);
    let msg: Messages.RotateCmd;
    if (typeof(aValues) === "number") {
      // We can skip the check here since we're building the command array ourselves.
      const features = this.MessageAttributes(Messages.RotateCmd.name).FeatureCount;
      msg = Messages.RotateCmd.Create(this._index,
                                      new Array(features).fill([aValues, aClockwise]));
    } else if (Array.isArray(aValues)) {
      msg = Messages.RotateCmd.Create(this._index,
                                      aValues);
      this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name,
                                      msg.Rotations,
                                      this.MessageAttributes(Messages.RotateCmd.name).FeatureCount);
    } else {
      throw new ButtplugDeviceException(
        "SendRotateCmd can only take a number and boolean, or an array of number/boolean tuples");
    }
    await this.SendMessageAsync(msg);
  }

  public async SendLinearCmd(aValues: number | Array<[number, number]>, aDuration?: number): Promise<void> {
    this.CheckAllowedMessageType(Messages.LinearCmd.name);
    let msg: Messages.LinearCmd;
    if (typeof(aValues) === "number") {
      // We can skip the check here since we're building the command array ourselves.
      const features = this.MessageAttributes(Messages.LinearCmd.name).FeatureCount;
      msg = Messages.LinearCmd.Create(this._index,
                                      new Array(features).fill([aValues, aDuration]));
    } else if (Array.isArray(aValues)) {
      msg = Messages.LinearCmd.Create(this._index,
                                      aValues);
      this.CheckGenericSubcommandList(Messages.SpeedSubcommand.name,
                                      msg.Vectors,
                                      this.MessageAttributes(Messages.LinearCmd.name).FeatureCount);
    } else {
      throw new ButtplugDeviceException(
        "SendLinearCmd can only take a number and number, or an array of number/number tuples");
    }
    await this.SendMessageAsync(msg);
  }

  public async SendFleshlightLaunchFW12Cmd(aSpeed: number, aPosition: number) {
    this.CheckAllowedMessageType(Messages.FleshlightLaunchFW12Cmd.name);
    await this.SendMessageAsync(new Messages.FleshlightLaunchFW12Cmd(aSpeed, aPosition, this._index));
  }

  public async SendLovenseCmd(aDeviceCmd: string) {
    this.CheckAllowedMessageType(Messages.LovenseCmd.name);
    await this.SendMessageAsync(new Messages.LovenseCmd(aDeviceCmd, this._index));
  }

  public async SendVorzeA10CycloneCmd(aSpeed: number, aClockwise: boolean) {
    this.CheckAllowedMessageType(Messages.VorzeA10CycloneCmd.name);
    await this.SendMessageAsync(new Messages.VorzeA10CycloneCmd(aSpeed, aClockwise, this._index));
  }

  public async SendStopDeviceCmd() {
    // Every message should support this, but it doesn't hurt to check
    this.CheckAllowedMessageType(Messages.StopDeviceCmd.name);
    await this.SendMessageAsync(new Messages.StopDeviceCmd(this._index));
  }

  public async SendKiirooCmd(aPosition: number) {
    this.CheckAllowedMessageType(Messages.KiirooCmd.name);
    await this.SendMessageAsync(new Messages.KiirooCmd(aPosition, this._index));
  }

  private CheckGenericSubcommandList<T extends Messages.GenericMessageSubcommand>(aType: string,
                                                                                  aCmdList: T[],
                                                                                  aLimitValue: number) {
    if (aCmdList.length === 0 || aCmdList.length > aLimitValue) {
      if (aLimitValue === 1) {
        throw new ButtplugDeviceException(
          `${aType} requires 1 subcommand for this device, ${aCmdList.length} present.`);
      }

      throw new ButtplugDeviceException(
        `${aType} requires between 1 and ${aLimitValue} subcommands for this device, ${aCmdList.length} present.`);
    }

    for (const cmd of aCmdList) {
      if (cmd.Index >= aLimitValue) {
        throw new ButtplugDeviceException(`Index ${cmd.Index} is out of bounds for ${aType} for this device.`);
      }
    }
  }
}

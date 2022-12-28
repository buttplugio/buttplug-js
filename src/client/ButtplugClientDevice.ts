/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";
import * as Messages from "../core/Messages";
import { ButtplugDeviceException, ButtplugException, ButtplugMessageException } from "../core/Exceptions";
import { EventEmitter } from "events";

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice extends EventEmitter {

  /**
   * Return the name of the device.
   */
  public get Name(): string {
    return this._deviceInfo.DeviceName;
  }

  /**
   * Return the user set name of the device.
   */
    public get DisplayName(): string | undefined {
      return this._deviceInfo.DeviceDisplayName;
    }
  
  /**
   * Return the index of the device.
   */
  public get Index(): number {
    return this._deviceInfo.DeviceIndex;
  }

  /**
   * Return the index of the device.
   */
  public get MessageTimingGap(): number | undefined {
    return this._deviceInfo.DeviceMessageTimingGap;
  }

  /**
   * Return a list of message types the device accepts.
   */
  public get AllowedMessages(): Messages.MessageAttributes {
    return this._deviceInfo.DeviceMessages;
  }

  public static fromMsg(msg: Messages.DeviceInfo,
                        sendClosure: (device: ButtplugClientDevice,
                                      msg: Messages.ButtplugDeviceMessage) => Promise<Messages.ButtplugMessage>): ButtplugClientDevice {
    return new ButtplugClientDevice(msg,
                                    sendClosure);
  }

  // Map of messages and their attributes (feature count, etc...)
  private allowedMsgs: Map<string, Messages.MessageAttributes> = new Map<string, Messages.MessageAttributes>();

  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param allowedMsgs Buttplug messages the device can receive.
   */
  constructor(private _deviceInfo: Messages.DeviceInfo,
              private _sendClosure: (device: ButtplugClientDevice,
                                     msg: Messages.ButtplugDeviceMessage) => Promise<Messages.ButtplugMessage>) {
    super();
    _deviceInfo.DeviceMessages.update();
  }

  public async send(msg: Messages.ButtplugDeviceMessage): Promise<Messages.ButtplugMessage> {
    // Assume we're getting the closure from ButtplugClient, which does all of
    // the index/existence/connection/message checks for us.
    return await this._sendClosure(this, msg);
  }

  public async sendExpectOk(msg: Messages.ButtplugDeviceMessage): Promise<void> {
    const response = await this.send(msg);
    switch (response.constructor) {
      case Messages.Ok:
        return;
      case Messages.Error:
        throw ButtplugException.FromError(response as Messages.Error);
      default:
        throw new ButtplugMessageException(`Message type ${response.constructor} not handled by SendMsgExpectOk`);    
    }
  }

  public async scalar(scalar: Messages.ScalarSubcommand | Messages.ScalarSubcommand[]): Promise<void> {
    if (Array.isArray(scalar)) {
      await this.sendExpectOk(new Messages.ScalarCmd(scalar, this.Index));
    } else {
      await this.sendExpectOk(new Messages.ScalarCmd([scalar], this.Index));
    }
  }

  private async scalarCommandBuilder(speed: number | number[], actuator: Messages.ActuatorType) {
    let scalarAttrs = this.AllowedMessages.ScalarCmd?.filter((x) => x.ActuatorType == actuator);
    if (!scalarAttrs || scalarAttrs.length == 0) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no ${actuator} capabilities`);
    }
    let cmds: Messages.ScalarSubcommand[] = [];
    if (typeof(speed) === "number") {
      scalarAttrs.forEach((x) => cmds.push(new Messages.ScalarSubcommand(x.Index, speed, actuator)));
    } else if (Array.isArray(speed)) {
      if (speed.length > scalarAttrs.length) {
        throw new ButtplugDeviceException(`${speed.length} commands send to a device with ${scalarAttrs.length} vibrators`);
      }
      scalarAttrs.forEach((x, i) => {
        cmds.push(new Messages.ScalarSubcommand(x.Index, speed[i], actuator))
      });
    } else {
      throw new ButtplugDeviceException(`${actuator} can only take numbers or arrays of numbers.`);
    }
    await this.scalar(cmds);
  }

  public async vibrate(speed: number | number[]): Promise<void> {
    await this.scalarCommandBuilder(speed, Messages.ActuatorType.Vibrate);
  }

  public async oscillate(speed: number | number[]): Promise<void> {
    await this.scalarCommandBuilder(speed, Messages.ActuatorType.Oscillate);
  }

  public async rotate(values: number | [number, boolean][], clockwise?: boolean): Promise<void> {
    let rotateAttrs = this.AllowedMessages.RotateCmd;
    if (!rotateAttrs || rotateAttrs.length == 0) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no Rotate capabilities`);
    }
    let msg: Messages.RotateCmd;
    if (typeof(values) === "number") {
      msg = Messages.RotateCmd.Create(this.Index,
                                      new Array(rotateAttrs.length).fill([values, clockwise]));
    } else if (Array.isArray(values)) {
      msg = Messages.RotateCmd.Create(this.Index, values);
    } else {
      throw new ButtplugDeviceException(
        "SendRotateCmd can only take a number and boolean, or an array of number/boolean tuples");
    }
    await this.sendExpectOk(msg);
  }

  public async linear(values: number | [number, number][], duration?: number): Promise<void> {
    let linearAttrs = this.AllowedMessages.LinearCmd;
    if (!linearAttrs || linearAttrs.length == 0) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no Linear capabilities`);
    }
    let msg: Messages.LinearCmd;
    if (typeof(values) === "number") {
      msg = Messages.LinearCmd.Create(this.Index,
                                      new Array(linearAttrs.length).fill([values, duration]));
    } else if (Array.isArray(values)) {
      msg = Messages.LinearCmd.Create(this.Index, values);
    } else {
      throw new ButtplugDeviceException(
        "SendLinearCmd can only take a number and number, or an array of number/number tuples");
    }
    await this.sendExpectOk(msg);
  }

  public async sensorRead(sensorIndex: number, sensorType: Messages.SensorType): Promise<number[]> {
    let response = await this.send(new Messages.SensorReadCmd(this.Index, sensorIndex, sensorType));
    switch (response.constructor) {
      case Messages.SensorReading:
        return (response as Messages.SensorReading).Data;
      case Messages.Error:
        throw ButtplugException.FromError(response as Messages.Error);
      default:
        throw new ButtplugMessageException(`Message type ${response.constructor} not handled by sensorRead`);    
    }
  }

  public async battery(): Promise<number> {
    let batteryAttrs = this.AllowedMessages.SensorReadCmd?.filter((x) => x.SensorType == Messages.SensorType.Battery);
    if (!batteryAttrs || batteryAttrs.length == 0) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no Battery capabilities`);
    }
    // Find the battery sensor, we'll need its index.
    let result = await this.sensorRead(batteryAttrs[0].Index, Messages.SensorType.Battery);
    return result[0] / 100.0;
  }

  public async rssi(): Promise<number> {
    let rssiAttrs = this.AllowedMessages.SensorReadCmd?.filter((x) => x.SensorType == Messages.SensorType.RSSI);
    if (!rssiAttrs || rssiAttrs.length == 0) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no RSSI capabilities`);
    }
    // Find the battery sensor, we'll need its index.
    let result = await this.sensorRead(rssiAttrs[0].Index, Messages.SensorType.RSSI);
    return result[0];
  }

  public async rawRead(endpoint: string, expectedLength: number, timeout: number): Promise<Uint8Array> {
    if (!this.AllowedMessages.RawReadCmd) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw read capabilities`);
    }
    if (this.AllowedMessages.RawReadCmd.Endpoints.indexOf(endpoint) == -1) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw readable endpoint ${endpoint}`);
    }
    let response = await this.send(new Messages.RawReadCmd(this.Index, endpoint, expectedLength, timeout));
    switch (response.constructor) {
      case Messages.RawReading:
        return new Uint8Array((response as Messages.RawReading).Data);
      case Messages.Error:
        throw ButtplugException.FromError(response as Messages.Error);
      default:
        throw new ButtplugMessageException(`Message type ${response.constructor} not handled by rawRead`);    
    }
  }

  public async rawWrite(endpoint: string, data: Uint8Array, writeWithResponse: boolean): Promise<void> {
    if (!this.AllowedMessages.RawWriteCmd) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw write capabilities`);
    }
    if (this.AllowedMessages.RawWriteCmd.Endpoints.indexOf(endpoint) == -1) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw writable endpoint ${endpoint}`);
    }
    await this.sendExpectOk(new Messages.RawWriteCmd(this.Index, endpoint, data, writeWithResponse));
  }

  public async rawSubscribe(endpoint: string): Promise<void> {
    if (!this.AllowedMessages.RawSubscribeCmd) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw subscribe capabilities`);
    }
    if (this.AllowedMessages.RawSubscribeCmd.Endpoints.indexOf(endpoint) == -1) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw subscribable endpoint ${endpoint}`);
    }
    await this.sendExpectOk(new Messages.RawSubscribeCmd(this.Index, endpoint));    
  }

  public async rawUnsubscribe(endpoint: string): Promise<void> {
    // This reuses raw subscribe's info.
    if (!this.AllowedMessages.RawSubscribeCmd) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw unsubscribe capabilities`);
    }
    if (this.AllowedMessages.RawSubscribeCmd.Endpoints.indexOf(endpoint) == -1) {
      throw new ButtplugDeviceException(`Device ${this.Name} has no raw unsubscribable endpoint ${endpoint}`);
    }
    await this.sendExpectOk(new Messages.RawUnsubscribeCmd(this.Index, endpoint));    
  }

  public async stop(): Promise<void> {
    await this.sendExpectOk(new Messages.StopDeviceCmd(this.Index));
  }

  public EmitDisconnected() {
    this.emit("deviceremoved");
  }
}

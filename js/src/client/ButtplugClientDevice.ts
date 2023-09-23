/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

'use strict';
import * as Messages from '../core/Messages';
import {
  ButtplugDeviceError,
  ButtplugError,
  ButtplugMessageError,
} from '../core/Exceptions';
import { EventEmitter } from 'eventemitter3';
import { getMessageClassFromMessage } from '../core/MessageUtils';

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice extends EventEmitter {
  /**
   * Return the name of the device.
   */
  public get name(): string {
    return this._deviceInfo.DeviceName;
  }

  /**
   * Return the user set name of the device.
   */
  public get displayName(): string | undefined {
    return this._deviceInfo.DeviceDisplayName;
  }

  /**
   * Return the index of the device.
   */
  public get index(): number {
    return this._deviceInfo.DeviceIndex;
  }

  /**
   * Return the index of the device.
   */
  public get messageTimingGap(): number | undefined {
    return this._deviceInfo.DeviceMessageTimingGap;
  }

  /**
   * Return a list of message types the device accepts.
   */
  public get messageAttributes(): Messages.MessageAttributes {
    return this._deviceInfo.DeviceMessages;
  }

  public static fromMsg(
    msg: Messages.DeviceInfo,
    sendClosure: (
      device: ButtplugClientDevice,
      msg: Messages.ButtplugDeviceMessage
    ) => Promise<Messages.ButtplugMessage>
  ): ButtplugClientDevice {
    return new ButtplugClientDevice(msg, sendClosure);
  }

  // Map of messages and their attributes (feature count, etc...)
  private allowedMsgs: Map<string, Messages.MessageAttributes> = new Map<
    string,
    Messages.MessageAttributes
  >();

  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param allowedMsgs Buttplug messages the device can receive.
   */
  constructor(
    private _deviceInfo: Messages.DeviceInfo,
    private _sendClosure: (
      device: ButtplugClientDevice,
      msg: Messages.ButtplugDeviceMessage
    ) => Promise<Messages.ButtplugMessage>
  ) {
    super();
    _deviceInfo.DeviceMessages.update();
  }

  public async send(
    msg: Messages.ButtplugDeviceMessage
  ): Promise<Messages.ButtplugMessage> {
    // Assume we're getting the closure from ButtplugClient, which does all of
    // the index/existence/connection/message checks for us.
    return await this._sendClosure(this, msg);
  }

  public async sendExpectOk(
    msg: Messages.ButtplugDeviceMessage
  ): Promise<void> {
    const response = await this.send(msg);
    switch (getMessageClassFromMessage(response)) {
      case Messages.Ok:
        return;
      case Messages.Error:
        throw ButtplugError.FromError(response as Messages.Error);
      default:
        throw new ButtplugMessageError(
          `Message type ${response.constructor} not handled by SendMsgExpectOk`
        );
    }
  }

  public async scalar(
    scalar: Messages.ScalarSubcommand | Messages.ScalarSubcommand[]
  ): Promise<void> {
    if (Array.isArray(scalar)) {
      await this.sendExpectOk(new Messages.ScalarCmd(scalar, this.index));
    } else {
      await this.sendExpectOk(new Messages.ScalarCmd([scalar], this.index));
    }
  }

  private async scalarCommandBuilder(
    speed: number | number[],
    actuator: Messages.ActuatorType
  ) {
    const scalarAttrs = this.messageAttributes.ScalarCmd?.filter(
      (x) => x.ActuatorType === actuator
    );
    if (!scalarAttrs || scalarAttrs.length === 0) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no ${actuator} capabilities`
      );
    }
    const cmds: Messages.ScalarSubcommand[] = [];
    if (typeof speed === 'number') {
      scalarAttrs.forEach((x) =>
        cmds.push(new Messages.ScalarSubcommand(x.Index, speed, actuator))
      );
    } else if (Array.isArray(speed)) {
      if (speed.length > scalarAttrs.length) {
        throw new ButtplugDeviceError(
          `${speed.length} commands send to a device with ${scalarAttrs.length} vibrators`
        );
      }
      scalarAttrs.forEach((x, i) => {
        cmds.push(new Messages.ScalarSubcommand(x.Index, speed[i], actuator));
      });
    } else {
      throw new ButtplugDeviceError(
        `${actuator} can only take numbers or arrays of numbers.`
      );
    }
    await this.scalar(cmds);
  }

  public get vibrateAttributes(): Messages.GenericDeviceMessageAttributes[] {
    return (
      this.messageAttributes.ScalarCmd?.filter(
        (x) => x.ActuatorType === Messages.ActuatorType.Vibrate
      ) ?? []
    );
  }

  public async vibrate(speed: number | number[]): Promise<void> {
    await this.scalarCommandBuilder(speed, Messages.ActuatorType.Vibrate);
  }

  public get oscillateAttributes(): Messages.GenericDeviceMessageAttributes[] {
    return (
      this.messageAttributes.ScalarCmd?.filter(
        (x) => x.ActuatorType === Messages.ActuatorType.Oscillate
      ) ?? []
    );
  }

  public async oscillate(speed: number | number[]): Promise<void> {
    await this.scalarCommandBuilder(speed, Messages.ActuatorType.Oscillate);
  }

  public get rotateAttributes(): Messages.GenericDeviceMessageAttributes[] {
    return this.messageAttributes.RotateCmd ?? [];
  }

  public async rotate(
    values: number | [number, boolean][],
    clockwise?: boolean
  ): Promise<void> {
    const rotateAttrs = this.messageAttributes.RotateCmd;
    if (!rotateAttrs || rotateAttrs.length === 0) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no Rotate capabilities`
      );
    }
    let msg: Messages.RotateCmd;
    if (typeof values === 'number') {
      msg = Messages.RotateCmd.Create(
        this.index,
        new Array(rotateAttrs.length).fill([values, clockwise])
      );
    } else if (Array.isArray(values)) {
      msg = Messages.RotateCmd.Create(this.index, values);
    } else {
      throw new ButtplugDeviceError(
        'SendRotateCmd can only take a number and boolean, or an array of number/boolean tuples'
      );
    }
    await this.sendExpectOk(msg);
  }

  public get linearAttributes(): Messages.GenericDeviceMessageAttributes[] {
    return this.messageAttributes.LinearCmd ?? [];
  }

  public async linear(
    values: number | [number, number][],
    duration?: number
  ): Promise<void> {
    const linearAttrs = this.messageAttributes.LinearCmd;
    if (!linearAttrs || linearAttrs.length === 0) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no Linear capabilities`
      );
    }
    let msg: Messages.LinearCmd;
    if (typeof values === 'number') {
      msg = Messages.LinearCmd.Create(
        this.index,
        new Array(linearAttrs.length).fill([values, duration])
      );
    } else if (Array.isArray(values)) {
      msg = Messages.LinearCmd.Create(this.index, values);
    } else {
      throw new ButtplugDeviceError(
        'SendLinearCmd can only take a number and number, or an array of number/number tuples'
      );
    }
    await this.sendExpectOk(msg);
  }

  public async sensorRead(
    sensorIndex: number,
    sensorType: Messages.SensorType
  ): Promise<number[]> {
    const response = await this.send(
      new Messages.SensorReadCmd(this.index, sensorIndex, sensorType)
    );
    switch (getMessageClassFromMessage(response)) {
      case Messages.SensorReading:
        return (response as Messages.SensorReading).Data;
      case Messages.Error:
        throw ButtplugError.FromError(response as Messages.Error);
      default:
        throw new ButtplugMessageError(
          `Message type ${response.constructor} not handled by sensorRead`
        );
    }
  }

  public get hasBattery(): boolean {
    const batteryAttrs = this.messageAttributes.SensorReadCmd?.filter(
      (x) => x.SensorType === Messages.SensorType.Battery
    );
    return batteryAttrs !== undefined && batteryAttrs.length > 0;
  }

  public async battery(): Promise<number> {
    if (!this.hasBattery) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no Battery capabilities`
      );
    }
    const batteryAttrs = this.messageAttributes.SensorReadCmd?.filter(
      (x) => x.SensorType === Messages.SensorType.Battery
    );
    // Find the battery sensor, we'll need its index.
    const result = await this.sensorRead(
      batteryAttrs![0].Index,
      Messages.SensorType.Battery
    );
    return result[0] / 100.0;
  }

  public get hasRssi(): boolean {
    const rssiAttrs = this.messageAttributes.SensorReadCmd?.filter(
      (x) => x.SensorType === Messages.SensorType.RSSI
    );
    return rssiAttrs !== undefined && rssiAttrs.length === 0;
  }

  public async rssi(): Promise<number> {
    if (!this.hasRssi) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no RSSI capabilities`
      );
    }
    const rssiAttrs = this.messageAttributes.SensorReadCmd?.filter(
      (x) => x.SensorType === Messages.SensorType.RSSI
    );
    // Find the battery sensor, we'll need its index.
    const result = await this.sensorRead(
      rssiAttrs![0].Index,
      Messages.SensorType.RSSI
    );
    return result[0];
  }

  public async rawRead(
    endpoint: string,
    expectedLength: number,
    timeout: number
  ): Promise<Uint8Array> {
    if (!this.messageAttributes.RawReadCmd) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw read capabilities`
      );
    }
    if (this.messageAttributes.RawReadCmd.Endpoints.indexOf(endpoint) === -1) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw readable endpoint ${endpoint}`
      );
    }
    const response = await this.send(
      new Messages.RawReadCmd(this.index, endpoint, expectedLength, timeout)
    );
    switch (getMessageClassFromMessage(response)) {
      case Messages.RawReading:
        return new Uint8Array((response as Messages.RawReading).Data);
      case Messages.Error:
        throw ButtplugError.FromError(response as Messages.Error);
      default:
        throw new ButtplugMessageError(
          `Message type ${response.constructor} not handled by rawRead`
        );
    }
  }

  public async rawWrite(
    endpoint: string,
    data: Uint8Array,
    writeWithResponse: boolean
  ): Promise<void> {
    if (!this.messageAttributes.RawWriteCmd) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw write capabilities`
      );
    }
    if (this.messageAttributes.RawWriteCmd.Endpoints.indexOf(endpoint) === -1) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw writable endpoint ${endpoint}`
      );
    }
    await this.sendExpectOk(
      new Messages.RawWriteCmd(this.index, endpoint, data, writeWithResponse)
    );
  }

  public async rawSubscribe(endpoint: string): Promise<void> {
    if (!this.messageAttributes.RawSubscribeCmd) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw subscribe capabilities`
      );
    }
    if (
      this.messageAttributes.RawSubscribeCmd.Endpoints.indexOf(endpoint) === -1
    ) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw subscribable endpoint ${endpoint}`
      );
    }
    await this.sendExpectOk(new Messages.RawSubscribeCmd(this.index, endpoint));
  }

  public async rawUnsubscribe(endpoint: string): Promise<void> {
    // This reuses raw subscribe's info.
    if (!this.messageAttributes.RawSubscribeCmd) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw unsubscribe capabilities`
      );
    }
    if (
      this.messageAttributes.RawSubscribeCmd.Endpoints.indexOf(endpoint) === -1
    ) {
      throw new ButtplugDeviceError(
        `Device ${this.name} has no raw unsubscribable endpoint ${endpoint}`
      );
    }
    await this.sendExpectOk(
      new Messages.RawUnsubscribeCmd(this.index, endpoint)
    );
  }

  public async stop(): Promise<void> {
    await this.sendExpectOk(new Messages.StopDeviceCmd(this.index));
  }

  public emitDisconnected() {
    this.emit('deviceremoved');
  }
}

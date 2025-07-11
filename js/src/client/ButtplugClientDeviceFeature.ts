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
  ButtplugError,
  ButtplugMessageError,
} from '../core/Exceptions';
import { EventEmitter } from 'eventemitter3';
import { getMessageClassFromMessage } from '../core/MessageUtils';

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDeviceFeature extends EventEmitter {
  /**
   * Return the index of the device.
   */
  public get index(): number {
    return this._deviceFeature.FeatureIndex;
  }

  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param allowedMsgs Buttplug messages the device can receive.
   */
  constructor(
    private _deviceFeature: Messages.DeviceFeature,
    private _sendClosure: (
      msg: Messages.ButtplugDeviceMessage
    ) => Promise<Messages.ButtplugMessage>
  ) {
    super();
  }

  public async send(
    msg: Messages.ButtplugDeviceMessage
  ): Promise<Messages.ButtplugMessage> {
    // Assume we're getting the closure from ButtplugClient, which does all of
    // the index/existence/connection/message checks for us.
    return await this._sendClosure(msg);
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

  public hasOutputType(type: Messages.OutputType): boolean {
    return this._deviceFeature.Output != undefined && this._deviceFeature.Output!.has(type);
  }

  setFeatureValuesWithOutput(type: Messages.OutputType, cmd: Messages.OutputCommand) {
    return this.sendExpectOk(new Messages.OutputCmd(this.index, this._deviceFeature.FeatureIndex, cmd));
  }

  setFeatureValuesWithOutputType(type: Messages.OutputType, value: number) {
    return this.setFeatureValuesWithOutput(type, Messages.OutputCommand.fromOutputTypeAndValue(type, value));
  }

  public get canVibrate(): boolean {
    return this.hasOutputType(Messages.OutputType.Vibrate);
  }

  public async vibrate(speed: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Vibrate, speed);
  }

  public get canOscillate(): boolean {
    return this.hasOutputType(Messages.OutputType.Oscillate);
  }

  public async oscillate(speed: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Oscillate, speed);
  }

  public get canRotate(): boolean {
    return this.hasOutputType(Messages.OutputType.Rotate);
  }

  public async rotate(speed: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Rotate, speed);
  }

  public get canConstrict(): boolean {
    return this.hasOutputType(Messages.OutputType.Constrict);
  }

  public async constrict(level: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Constrict, level);
  }

  public get canSpray(): boolean {
    return this.hasOutputType(Messages.OutputType.Spray);
  }

  public async spray(level: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Spray, level);
  }

  public get canPosition(): boolean {
    return this.hasOutputType(Messages.OutputType.Position);
  }

  public async position(level: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Position, level);
  }

  public get canPositionWithDuration(): boolean {
    return this.hasOutputType(Messages.OutputType.PositionWithDuration);
  }

  public async positionWithDuration(position: number, duration: number): Promise<void> {
    let cmd = new Messages.OutputCommand();
    cmd.PositionWithDuration = new Messages.CommandPositionWithDuration(position, duration);
    return this.setFeatureValuesWithOutput(Messages.OutputType.PositionWithDuration, cmd);
  }

  public get canRotateWithDirection(): boolean {
    return this.hasOutputType(Messages.OutputType.RotateWithDirection);
  }

  public async rotateWithDirection(speed: number, clockwise: boolean): Promise<void> {
    let cmd = new Messages.OutputCommand();
    cmd.RotateWithDirection = new Messages.CommandRotateWithDirection(speed, clockwise);
    return this.setFeatureValuesWithOutput(Messages.OutputType.RotateWithDirection, cmd);
  }

  /*
  public async sensorRead(
    sensorIndex: number,
    sensorType: Messages.InputType
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
      (x) => x.SensorType === Messages.InputType.Battery
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
      (x) => x.SensorType === Messages.InputType.Battery
    );
    // Find the battery sensor, we'll need its index.
    const result = await this.sensorRead(
      batteryAttrs![0].Index,
      Messages.InputType.Battery
    );
    return result[0] / 100.0;
  }
*/
}

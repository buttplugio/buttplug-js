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
  public get features(): Messages.DeviceFeature[] {
    return this._deviceInfo.DeviceFeatures;
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

  getFeaturesWithOutputType(type: Messages.OutputType): Messages.DeviceFeature[] {
    return this._deviceInfo.DeviceFeatures.filter(
      (x) => {
        if (x.Output != undefined) {
          return x.Output!.has(type);
        }
        return false;
      }
    );
  }

  setFeatureValuesWithOutput(type: Messages.OutputType, cmd: Messages.OutputCommand) {
    let outputCmds: Messages.OutputCmd[] = this.getFeaturesWithOutputType(type).map((x) => {
      return new Messages.OutputCmd(this.index, x.FeatureIndex, cmd);
    });
    // TODO This should all be sent as one messages in a packed array.
    outputCmds.forEach(async (x) => { await this.sendExpectOk(x); })
  }

  setFeatureValuesWithOutputType(type: Messages.OutputType, value: number) {
    return this.setFeatureValuesWithOutput(type, Messages.OutputCommand.fromOutputTypeAndValue(type, value));
  }

  public get canVibrate(): boolean {
    return this.vibrateFeatures.length > 0;
  }

  public get vibrateFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.Vibrate);
  }

  public async vibrate(speed: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Vibrate, speed);
  }

  public get canOscillate(): boolean {
    return this.oscillateFeatures.length > 0;
  }

  public get oscillateFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.Oscillate);
  }

  public async oscillate(speed: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Oscillate, speed);
  }

  public get canRotate(): boolean {
    return this.rotateFeatures.length > 0;
  }

  public get rotateFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.Rotate);
  }

  public async rotate(speed: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Rotate, speed);
  }

  public get canConstrict(): boolean {
    return this.constrictFeatures.length > 0;
  }

  public get constrictFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.Constrict);
  }

  public async constrict(level: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Constrict, level);
  }

  public get canSpray(): boolean {
    return this.sprayFeatures.length > 0;
  }

  public get sprayFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.Spray);
  }

  public async spray(level: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Spray, level);
  }

  public get canPosition(): boolean {
    return this.positionFeatures.length > 0;
  }

  public get positionFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.Position);
  }

  public async position(level: number): Promise<void> {
    return this.setFeatureValuesWithOutputType(Messages.OutputType.Position, level);
  }

  public get canPositionWithDuration(): boolean {
    return this.positionFeatures.length > 0;
  }

  public get positionWithDurationFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.PositionWithDuration);
  }

  public async positionWithDuration(position: number, duration: number): Promise<void> {
    let cmd = new Messages.OutputCommand();
    cmd.PositionWithDuration = new Messages.CommandPositionWithDuration(position, duration);
    return this.setFeatureValuesWithOutput(Messages.OutputType.PositionWithDuration, cmd);
  }

  public get canRotateWithDirection(): boolean {
    return this.positionFeatures.length > 0;
  }

  public get rotateWithDirectionFeatures(): Messages.DeviceFeature[] {
    return this.getFeaturesWithOutputType(Messages.OutputType.PositionWithDuration);
  }

  public async rotateWithDirection(speed: number, clockwise: boolean): Promise<void> {
    let cmd = new Messages.OutputCommand();
    cmd.RotateWithDirection = new Messages.CommandRotateWithDirection(speed, clockwise);
    return this.setFeatureValuesWithOutput(Messages.OutputType.RotateWithDirection, cmd);
  }

  public async stop(): Promise<void> {
    await this.sendExpectOk(new Messages.StopDeviceCmd(this.index));
  }

  public emitDisconnected() {
    this.emit('deviceremoved');
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

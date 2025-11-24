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
import { ButtplugClientDeviceFeature } from './ButtplugClientDeviceFeature';

export class ButtplugCmdValue {
  private constructor(
    private _steps: number | undefined,
    private _float: number | undefined
  ) {
  }

  public get steps(): number | undefined {
    return this._steps;
  }

  public get float(): number | undefined {
    return this._float;
  }

  public static fromSteps(steps: number): ButtplugCmdValue {
    return new ButtplugCmdValue(steps, undefined);
  }

  public static fromFloat(float: number): ButtplugCmdValue {
    return new ButtplugCmdValue(undefined, float);
  }
}

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice extends EventEmitter {

  private _features: Map<number, ButtplugClientDeviceFeature>;

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

  public get features(): Map<number, ButtplugClientDeviceFeature> {
    return this._features;
  }

//  /**
//   * Return a list of message types the device accepts.
//   */
//  public get messageAttributes(): Messages.MessageAttributes {
//    return this._deviceInfo.DeviceMessages;
//  }
//
  public static fromMsg(
    msg: Messages.DeviceInfo,
    sendClosure: (
      msg: Messages.ButtplugMessage
    ) => Promise<Messages.ButtplugMessage>
  ): ButtplugClientDevice {
    return new ButtplugClientDevice(msg, sendClosure);
  }
//
//  // Map of messages and their attributes (feature count, etc...)
//  private allowedMsgs: Map<string, Messages.MessageAttributes> = new Map<
//    string,
//    Messages.MessageAttributes
//  >();
//
  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param allowedMsgs Buttplug messages the device can receive.
   */
  private constructor(
    private _deviceInfo: Messages.DeviceInfo,
    private _sendClosure: (
      msg: Messages.ButtplugMessage
    ) => Promise<Messages.ButtplugMessage>
  ) {
    super();
    this._features = new Map(Object.entries(_deviceInfo.DeviceFeatures).map(([index, v]) => [parseInt(index), new ButtplugClientDeviceFeature(_deviceInfo.DeviceIndex, _deviceInfo.DeviceName, v, _sendClosure)]));
  }

  public async send(
    msg: Messages.ButtplugMessage
  ): Promise<Messages.ButtplugMessage> {
    // Assume we're getting the closure from ButtplugClient, which does all of
    // the index/existence/connection/message checks for us.
    return await this._sendClosure(msg);
  }

  protected sendMsgExpectOk = async (
    msg: Messages.ButtplugMessage
  ): Promise<void> => {
    const response = await this.send(msg);
    if (response.Ok !== undefined) {
      return;
    } else if (response.Error !== undefined) {
      throw ButtplugError.FromError(response as Messages.Error);
    } else {
      /*
      throw ButtplugError.LogAndError(
        ButtplugMessageError,
        this._logger,
        `Message ${response} not handled by SendMsgExpectOk`
      );
      */
    }
  };

  protected isOutputValid(featureIndex: number, type: Messages.OutputType) {
    if (!this._deviceInfo.DeviceFeatures.hasOwnProperty(featureIndex.toString())) {
      throw new ButtplugDeviceError(`Feature index ${featureIndex} does not exist for device ${this.name}`);
    }
    if (this._deviceInfo.DeviceFeatures[featureIndex.toString()].Outputs !== undefined && !this._deviceInfo.DeviceFeatures[featureIndex.toString()].Outputs.hasOwnProperty(type)) {
      throw new ButtplugDeviceError(`Feature index ${featureIndex} does not support type ${type} for device ${this.name}`);
    }
  }

  protected hasOutput(type: Messages.OutputType): boolean {
    return this._features.values().filter((f) => f.hasOutput(type)).toArray().length > 0;
  }

  protected async runDeviceValueCmd(type: Messages.OutputType, func: (f: ButtplugClientDeviceFeature) => Promise<void>): Promise<void> {
    let p: Promise<void>[] = [];
    for (let f of this._features.values()) {
      if (f.hasOutput(type)) {
        p.push(func(f));
      }
    }
    if (p.length == 0) {
      return Promise.reject(`No features with output type ${type}`);
    }
    await Promise.all(p);
  }

  public hasVibrate(): boolean {
    return this.hasOutput(Messages.OutputType.Vibrate);
  }

  public async vibrate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Vibrate, (f) => f.vibrate(value))
  }

  public hasRotate(): boolean {
    return this.hasOutput(Messages.OutputType.Rotate);
  }

  public async rotate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Rotate, (f) => f.rotate(value))
  }

  public hasOscillate(): boolean {
    return this.hasOutput(Messages.OutputType.Oscillate);
  }

  public async oscillate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Oscillate, (f) => f.oscillate(value))
  }

  public hasConstrict(): boolean {
    return this.hasOutput(Messages.OutputType.Constrict);
  }

  public async constrict(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Constrict, (f) => f.constrict(value));
  }

  public hasTemperature(): boolean {
    return this.hasOutput(Messages.OutputType.Temperature);
  }

  public async temperature(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Temperature, (f) => f.temperature(value));
  }

  public hasLed(): boolean {
    return this.hasOutput(Messages.OutputType.Led);
  }

  public async led(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Led, (f) => f.led(value));
  }

  public hasInflate(): boolean {
    return this.hasOutput(Messages.OutputType.Inflate);
  }

  public async inflate(value: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Inflate, (f) => f.inflate(value));
  }

  public hasPosition(): boolean {
    return this.hasOutput(Messages.OutputType.Position);
  }

  public async position(position: ButtplugCmdValue): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Position, (f) => f.position(position));
  }

  public hasPositionWithDuration(): boolean {
    return this.hasOutput(Messages.OutputType.PositionWithDuration);
  }

  public async positionWithDuration(position: ButtplugCmdValue, duration: number): Promise<void> {
    this.runDeviceValueCmd(Messages.OutputType.Position, (f) => f.positionWithDuration(position, duration));
  }  

  public async stop(): Promise<void> {
    await this.sendMsgExpectOk({StopDeviceCmd: { Id: 1, DeviceIndex: this.index}});
  }

  public emitDisconnected() {
    this.emit('deviceremoved');
  }
}

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
import { DeviceOutputCommand } from './ButtplugClientDeviceCommand';

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

  public hasOutput(type: Messages.OutputType): boolean {
    return this._features.values().filter((f) => f.hasOutput(type)).toArray().length > 0;
  }

  public hasInput(type: Messages.InputType): boolean {
    return this._features.values().filter((f) => f.hasInput(type)).toArray().length > 0;
  }

  public async runOutput(cmd: DeviceOutputCommand): Promise<void> {
    let p: Promise<void>[] = [];
    for (let f of this._features.values()) {
      if (f.hasOutput(cmd.outputType)) {
        p.push(f.runOutput(cmd));
      }
    }
    if (p.length == 0) {
      return Promise.reject(`No features with output type ${cmd.outputType}`);
    }
    await Promise.all(p);
  }

  public async stop(): Promise<void> {
    await this.sendMsgExpectOk({StopCmd: { Id: 1, DeviceIndex: this.index, FeatureIndex: undefined, Inputs: true, Outputs: true}});
  }

  public async battery(): Promise<number> {
    let p: Promise<void>[] = [];
    for (let f of this._features.values()) {
      if (f.hasInput(Messages.InputType.Battery)) {
        // Right now, we only have one battery per device, so assume the first one we find is it.
        let response = await f.runInput(Messages.InputType.Battery, Messages.InputCommandType.Read);
        if (response === undefined) {
          throw new ButtplugMessageError("Got incorrect message back.");
        }
        if (response.Reading[Messages.InputType.Battery] === undefined) {
          throw new ButtplugMessageError("Got reading with no Battery info.");
        }
        return response.Reading[Messages.InputType.Battery].Value;
      }
    }
    throw new ButtplugDeviceError(`No battery present on this device.`);
  }

  public emitDisconnected() {
    this.emit('deviceremoved');
  }
}

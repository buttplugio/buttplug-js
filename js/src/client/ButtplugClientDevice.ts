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

  protected async sendOutputCmd(featureIndex: number, type: Messages.OutputType, command: ButtplugCmdValue): Promise<void> {
    let newCommand: Messages.DeviceFeatureOutput = {};
    // Make sure the requested feature is valid
    this.isOutputValid(featureIndex, type);

    if (command.float !== undefined) {
      if (type == Messages.OutputType.Position) {
         
      } else if (type == Messages.OutputType.PositionWithDuration) {
  
      } else {
        if (command.float < 0 || command.float > 1.0) {
          throw new ButtplugDeviceError(`Float value ${command.float} is not in the range 0.0 <= x <= 1.0`);
        }
        newCommand.Value = Math.ceil(this._deviceInfo.DeviceFeatures[featureIndex.toString()]!.Output[type]!.Value![1] * command.float);
      }
    } else {
      if (type == Messages.OutputType.Position) {
         
      } else if (type == Messages.OutputType.PositionWithDuration) {
  
      } else {
        // TODO Check step limits here
        newCommand.Value = command.steps;
      }
    }

    console.log(newCommand);
    let outCommand = {};
    outCommand[type.toString()] = newCommand;

    let cmd: Messages.ButtplugMessage = {
      OutputCmd: {
        Id: 1,
        DeviceIndex: this.index, 
        FeatureIndex: featureIndex, 
        Command: outCommand 
      }
    };
    await this.sendMsgExpectOk(cmd);
  }

  protected hasOutput(type: Messages.OutputType): boolean {
    console.log(this._deviceInfo.DeviceFeatures);
    console.log(Object.entries(this._deviceInfo.DeviceFeatures));
    return Object.entries(this._deviceInfo.DeviceFeatures).filter(([_, v]) => {
      console.log(v.Output);
      if (v.Output !== undefined) {
        console.log(type.toString());
        console.log(v.Output.hasOwnProperty(type.toString()))
        return v.Output.hasOwnProperty(type.toString());
      } else {
        return false;
      }
    }).length > 0;
  }

  public canVibrate(): boolean {
    return this.hasOutput(Messages.OutputType.Vibrate);
  }

  public async vibrate(value: ButtplugCmdValue): Promise<void> {
    let p: Promise<void>[] = [];
    for (let [index, f] of Object.entries(this._deviceInfo.DeviceFeatures)) {
      if (f.Output !== undefined && f.Output.hasOwnProperty(Messages.OutputType.Vibrate.toString())) {
        p.push(this.sendOutputCmd(f.FeatureIndex, Messages.OutputType.Vibrate, value));
      }
    }
    if (p.length == 0) {
      return Promise.reject();
    }
    await Promise.all(p);
  }

  public canRotate(): boolean {
    return this.hasOutput(Messages.OutputType.Rotate);
  }

  public async rotate(value: ButtplugCmdValue): Promise<void> {
  }

  public canOscillate(): boolean {
    return this.hasOutput(Messages.OutputType.Oscillate);
  }

  public async oscillate(value: ButtplugCmdValue): Promise<void> {
  }

  public async stop(): Promise<void> {
    await this.sendMsgExpectOk({StopDeviceCmd: { Id: 1, DeviceIndex: this.index}});
  }

  public emitDisconnected() {
    this.emit('deviceremoved');
  }
}

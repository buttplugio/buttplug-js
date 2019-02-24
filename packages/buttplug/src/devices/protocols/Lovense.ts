/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as Messages from "../../core/Messages";
import { ButtplugDeviceException } from "../../core/Exceptions";
import { ButtplugDeviceProtocol } from "../ButtplugDeviceProtocol";
import { IButtplugDeviceImpl } from "../IButtplugDeviceImpl";
import { Endpoints } from "devices/Endpoints";

export class Lovense extends ButtplugDeviceProtocol {

  private static _deviceNames = {
    A: "Nora",
    B: "Max",
    C: "Nora",
    L: "Ambi",
    O: "Osci",
    P: "Edge",
    S: "Lush",
    W: "Domi",
    Z: "Hush",
    0: "Unknown",
  };

  private _initResolve: (() => void) | undefined;
  private _initPromise = new Promise((res) => { this._initResolve = res; });
  private _isClockwise = false;
  private _specs: any = {
    VibrateCmd: { FeatureCount: 1 },
    SingleMotorVibrateCmd: {},
    StopDeviceCmd: {},
  };

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(`Lovense ${aDeviceImpl.Name}`, aDeviceImpl);
  }

  public Initialize = async (): Promise<void> => {
    this._device.addListener("updateReceived", this.OnValueChanged);
    await this._device.SubscribeToUpdates();
    this._logger.Debug(`Device ${this._device.Name} waiting for initialization return`);
    await this._device.WriteString("DeviceType;");
    await this._initPromise;
  }

  public get MessageSpecifications(): object {
    return this._specs;
  }

  private ParseDeviceType(aDeviceType: string) {
    // This will return 3 values, but the last one (device address) we don't
    // really care about.
    let [deviceLetter, deviceVersion] = aDeviceType.split(":");

    if (!Lovense._deviceNames.hasOwnProperty(deviceLetter)) {
      deviceLetter = "0";
    }

    this._name = `Lovense ${Lovense._deviceNames[deviceLetter]} v${deviceVersion}`;

    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);

    if (deviceLetter === "P") {
      // Edge has 2 motors
      this._specs.VibrateCmd = { FeatureCount: 2 };
    } else if (deviceLetter === "A" || deviceLetter === "C") {
      // Nora has rotation
      this._specs.RotateCmd = { FeatureCount: 1 };
      this.MsgFuncs.set(Messages.RotateCmd, this.HandleRotateCmd);
    }
  }

  private OnValueChanged = async ([aEndpoint, aValue]: [Endpoints, Buffer]) => {
    // If we haven't initialized yet, consider this to be the first read, for the device info.
    if (this._initResolve !== undefined) {
      let identStr = aValue.toString('utf-8');
      this._logger.Debug(`Lovense Device ${this._device.Name} got initialization return ${identStr}`);
      this.ParseDeviceType(identStr);
      this._initResolve();
      this._initResolve = undefined;
      return;
    }
    // TODO Fill in battery/accelerometer/etc reads
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
    if (this._specs.hasOwnProperty("RotateCmd")) {
      this.HandleRotateCmd(new Messages.RotateCmd([new Messages.RotateSubcommand(0, 0, this._isClockwise)], 0, aMsg.Id));
    }
    return new Messages.Ok(aMsg.Id);
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const speeds: Messages.SpeedSubcommand[] = [];
      for (let i = 0; i < this._specs.VibrateCmd.FeatureCount; i++) {
        speeds.push(new Messages.SpeedSubcommand(i, aMsg.Speed));
      }
      return await this.HandleVibrateCmd(new Messages.VibrateCmd(speeds, aMsg.DeviceIndex, aMsg.Id));
    }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length > this._specs.VibrateCmd.FeatureCount) {
      throw new ButtplugDeviceException(`Lovense devices require VibrateCmd to have at most ` +
                                        `${this._specs.VibrateCmd.FeatureCount} speed commands, ` +
                                        `${aMsg.Speeds.length} sent.`,
                                        aMsg.Id);
    }
    for (const cmd of aMsg.Speeds) {
      const index = this._specs.VibrateCmd.FeatureCount > 1 ? (cmd.Index + 1).toString(10) : "";
      const speed = Math.floor(20 * cmd.Speed);
      await this._device.WriteString(`Vibrate${index}:${speed};`);
    }
    return new Messages.Ok(aMsg.Id);
  }

  private HandleRotateCmd = async (aMsg: Messages.RotateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Rotations.length !== 1) {
      throw new ButtplugDeviceException(`Lovense devices require RotateCmd to have 1 rotate command, ` +
                                        `${aMsg.Rotations.length} sent.`,
                                        aMsg.Id);
    }
    const rotateCmd = aMsg.Rotations[0];
    if (rotateCmd.Index !== 0) {
      throw new ButtplugDeviceException("Rotation command sent for invalid index.");
    }
    if (rotateCmd.Clockwise !== this._isClockwise) {
      await this._device.WriteString("RotateChange;");
    }
    const speed = Math.floor(20 * rotateCmd.Speed);
    await this._device.WriteString(`Rotate:${speed};`);
    return new Messages.Ok(aMsg.Id);
  }

}

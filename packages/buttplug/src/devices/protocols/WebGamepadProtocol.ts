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
import { ButtplugDeviceReadOptions } from "../ButtplugDeviceReadOptions";
import { Endpoints } from "../Endpoints";

export class WebGamepadProtocol extends ButtplugDeviceProtocol {

  private _currentCommands: number[] = [0, 0];

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(`WebGamepad ${aDeviceImpl.Name}` , aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
    this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
  }

  public Initialize = async (): Promise<void> => {
    return Promise.resolve();
  }

  public get MessageSpecifications(): object {
    return {
      VibrateCmd: { FeatureCount: 2 },
      SingleMotorVibrateCmd: {},
      StopDeviceCmd: {},
    };
  }

  private runVibration = async () => {
    const buffer = Buffer.alloc(8);
    buffer.writeFloatLE(this._currentCommands[0], 0);
    buffer.writeFloatLE(this._currentCommands[1], 4);
    await this._device.WriteValue(buffer);
    if (this._currentCommands[0] < 0.001 && this._currentCommands[1] < 0.001) {
        return;
    }
    setTimeout(() => this.runVibration(), 100);
  }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length <= 0 || aMsg.Speeds.length > 2) {
      throw new ButtplugDeviceException(`WebGamepad devices require VibrateCmd to have 1 or 2 speed commands, ` +
                                        `${aMsg.Speeds.length} sent.`,
                                        aMsg.Id);
    }
    for (const speed of aMsg.Speeds) {
        this._currentCommands[speed.Index] = speed.Speed;
    }
    await this.runVibration();
    return new Messages.Ok(aMsg.Id);
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
        const speeds: Messages.SpeedSubcommand[] = [];
        speeds.push(new Messages.SpeedSubcommand(0, aMsg.Speed));
        speeds.push(new Messages.SpeedSubcommand(1, aMsg.Speed));
        return await this.HandleVibrateCmd(new Messages.VibrateCmd(speeds, aMsg.DeviceIndex, aMsg.Id));
    }
}

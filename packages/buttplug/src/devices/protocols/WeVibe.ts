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

export class WeVibe extends ButtplugDeviceProtocol {
  public static readonly DualVibes: string[] = ["Cougar", "4 Plus", "4plus", "classic", "Classic",
                                                "Gala", "Nova", "NOVAV2", "Sync"];
  private readonly _vibratorCount: number = 1;
  private _vibratorSpeed = [ 0.0, 0.0 ];

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(`WeVibe ${aDeviceImpl.Name}` , aDeviceImpl);
    this._vibratorCount = WeVibe.DualVibes.find((x) => x === this.Name) ? 2 : 1;
    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
    this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
  }

  public get MessageSpecifications(): object {
    return {
      VibrateCmd: { FeatureCount: this._vibratorCount },
      SingleMotorVibrateCmd: {},
      StopDeviceCmd: {},
    };
  }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length < 1 || aMsg.Speeds.length > this._vibratorCount) {
      throw new ButtplugDeviceException(`WeVibe devices require VibrateCmd at least ` +
                                        `${this._vibratorCount} speed commands, ${aMsg.Speeds.length} sent.`,
                                        aMsg.Id);
    }

    let changed = false;
    for (const cmd of aMsg.Speeds) {
      if (!(Math.abs(cmd.Speed - this._vibratorSpeed[cmd.Index]) > 0.001)) {
        continue;
      }

      changed = true;
      this._vibratorSpeed[cmd.Index] = cmd.Speed;
    }

    if (!changed) {
      return new Messages.Ok(aMsg.Id);
    }

    const rSpeedInt = Math.round(this._vibratorSpeed[0] * 15);
    const rSpeedExt = Math.round(this._vibratorSpeed[this._vibratorCount - 1] * 15);
    const data = Buffer.from([0x0f, 0x03, 0x00, (rSpeedInt << 4) | (rSpeedExt), 0x00, 0x03, 0x00, 0x00]);

    if (rSpeedInt === 0 && rSpeedExt === 0) {
      data[1] = 0x00;
      data[5] = 0x00;
    }

    await this._device.WriteValue(data);
    return new Messages.Ok(aMsg.Id);
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const speeds: Messages.SpeedSubcommand[] = [];
      for (let i = 0; i < this._vibratorCount; i++) {
        speeds.push(new Messages.SpeedSubcommand(i, aMsg.Speed));
      }
      return await this.HandleVibrateCmd(new Messages.VibrateCmd(speeds, aMsg.DeviceIndex, aMsg.Id));
    }
}

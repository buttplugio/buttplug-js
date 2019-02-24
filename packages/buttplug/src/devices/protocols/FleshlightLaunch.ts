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
import { Endpoints } from "../Endpoints";
import { ButtplugDeviceWriteOptions } from "../ButtplugDeviceWriteOptions";

export class FleshlightLaunch extends ButtplugDeviceProtocol {
  private _lastPosition: number = 0;

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super("Fleshlight Launch", aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd, this.HandleFleshlightLaunchFW12Cmd);
    this.MsgFuncs.set(Messages.LinearCmd, this.HandleLinearCmd);
  }

  public Initialize = async (): Promise<void> => {
    this._logger.Debug(`Calling Fleshlight Launch initialize on ${this._device.Name}`);
    await this._device.WriteValue(Buffer.from([0x00]), new ButtplugDeviceWriteOptions({ Endpoint: Endpoints.Firmware, WriteWithResponse: true }));
  }

  public get MessageSpecifications(): object {
    return {
      FleshlightLaunchFW12Cmd: {},
      StopDeviceCmd: {},
      LinearCmd: { FeatureCount: 1 },
    };
  }

  private HandleStopDeviceCmd =
    async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
      return await this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(0,
                                                                                           0,
                                                                                           aMsg.DeviceIndex,
                                                                                           aMsg.Id));
    }

  private HandleFleshlightLaunchFW12Cmd =
    async (aMsg: Messages.FleshlightLaunchFW12Cmd): Promise<Messages.ButtplugMessage> => {
      this._lastPosition = aMsg.Position;
      await this._device.WriteValue(Buffer.from([aMsg.Position, aMsg.Speed]));
      return new Messages.Ok(aMsg.Id);
    }

  private HandleLinearCmd =
    async (aMsg: Messages.LinearCmd): Promise<Messages.ButtplugMessage> => {
      if (aMsg.Vectors.length !== 1) {
        throw new ButtplugDeviceException("LinearCmd requires 1 vector for this device.",
                                          aMsg.Id);
      }
      // Move between 5/95, otherwise we'll allow the device to smack into hard
      // stops because of braindead firmware.
      const range: number = 90;
      const vector = aMsg.Vectors[0];
      const currentPosition = vector.Position * 100;
      const positionDelta: number = Math.abs(currentPosition - this._lastPosition);
      let speed: number = Math.floor(25000 * Math.pow(((vector.Duration * 90) / positionDelta), -1.05));

      // Clamp speed on 0 <= x <= 95 so we don't break the launch.
      speed = Math.min(Math.max(speed, 0), 95);

      const positionGoal = Math.floor(((currentPosition / 99) * range) + ((99 - range) / 2));
      // We'll set this._lastPosition in FleshlightLaunchFW12Cmd, since
      // everything kinda funnels to that.
      return await this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(speed,
                                                                                           positionGoal,
                                                                                           aMsg.DeviceIndex,
                                                                                           aMsg.Id));
    }
}

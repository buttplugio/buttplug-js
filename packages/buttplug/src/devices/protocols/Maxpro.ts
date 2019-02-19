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

export class Maxpro extends ButtplugDeviceProtocol {

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(`Maxpro ${aDeviceImpl.Name}` , aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
    this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
  }

  public get MessageSpecifications(): object {
    return {
      VibrateCmd: { FeatureCount: 1 },
      SingleMotorVibrateCmd: {},
      StopDeviceCmd: {},
    };
  }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length !== 1) {
      throw new ButtplugDeviceException(`Maxpro devices require VibrateCmd to have 1 speed command, ` +
                                        `${aMsg.Speeds.length} sent.`,
                                        aMsg.Id);
    }
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed,
                                                                                     aMsg.DeviceIndex,
                                                                                     aMsg.Id));
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      // Speed range for Maxpro toys are 10-100 for some reason.
      const speed = Math.floor(aMsg.Speed * 100);
      const data = Buffer.from([0x55, 0x04, 0x07, 0xff, 0xff, 0x3f, speed, 0x5f, speed, 0x00]);
      const checksum = data.reduce((prev, cur) => prev + cur) & 0xFF;
      data[9] = checksum;
      await this._device.WriteValue(data);
      return new Messages.Ok(aMsg.Id);
    }
}

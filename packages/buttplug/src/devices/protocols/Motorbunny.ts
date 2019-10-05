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

export class Motorbunny extends ButtplugDeviceProtocol {

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(`Motorbunny` , aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
    this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
    this.MsgFuncs.set(Messages.RotateCmd, this.HandleRotateCmd);
  }

  public get MessageSpecifications(): object {
    return {
      VibrateCmd: { FeatureCount: 1 },
      RotateCmd: { FeatureCount: 1 },
      SingleMotorVibrateCmd: {},
      StopDeviceCmd: {},
    };
  }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length !== 1) {
      throw new ButtplugDeviceException(`Motorbunny devices require VibrateCmd to have 1 speed command, ` +
                                        `${aMsg.Speeds.length} sent.`,
                                        aMsg.Id);
    }
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed,
                                                                                     aMsg.DeviceIndex,
                                                                                     aMsg.Id));
  }

  private HandleRotateCmd = async (aMsg: Messages.RotateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Rotations.length !== 1) {
      throw new ButtplugDeviceException(`Motorbunny devices require RotateCmd to have 1 speed command, ` +
                                        `${aMsg.Rotations.length} sent.`,
                                        aMsg.Id);
    }
    const speed = Math.floor(aMsg.Rotations[0].Speed * 255);
    // Stop device
    if (speed < 5) {
      const stopdata = Buffer.from([0xa0, 0x00, 0x00, 0x00, 0x00, 0xec]);
      await this._device.WriteValue(stopdata);
      return new Messages.Ok(aMsg.Id);
    }
    let data: number[] = [];
    for (let i = 0; i < 7; ++i) {
      data = data.concat([aMsg.Rotations[0].Clockwise ? 0x2a : 0x29, speed]);
    }
    const checksum = data.reduce((prev, cur) => prev + cur) & 0xff;
    data = [0xaf].concat(data).concat([checksum, 0xec]);
    await this._device.WriteValue(Buffer.from(data));
    return new Messages.Ok(aMsg.Id);
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const speed = Math.floor(aMsg.Speed * 255);
      // Stop device
      if (speed < 5) {
        const stopdata = Buffer.from([0xf0, 0x00, 0x00, 0x00, 0x00, 0xec]);
        await this._device.WriteValue(stopdata);
        return new Messages.Ok(aMsg.Id);
      }
      let data: number[] = [];
      for (let i = 0; i < 7; ++i) {
        data = data.concat([speed, 0x14]);
      }
      const checksum = data.reduce((prev, cur) => prev + cur) & 0xff;
      data = [0xff].concat(data).concat([checksum, 0xec]);
      await this._device.WriteValue(Buffer.from(data));
      return new Messages.Ok(aMsg.Id);
    }
}

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

export class Youou extends ButtplugDeviceProtocol {

  private _packetId: number = 0;

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(`Youou ${aDeviceImpl.Name}` , aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
    this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
  }

  public Initialize = async (): Promise<void> => {
    this._logger.Debug(`Calling Youou initialize on ${this._device.Name}`);
    await this._device.ReadValue(new ButtplugDeviceReadOptions({ Endpoint: Endpoints.Tx }));
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
      throw new ButtplugDeviceException(`Youou devices require VibrateCmd to have 1 speed commands, ` +
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
      // Byte 2 seems to be a monotonically increasing packet id of some kind
      // Speed seems to be 0-247 or so. Anything above that sets a pattern which
      // isn't what we want here.
      const maxValue = 247;
      const speed = aMsg.Speed * maxValue;
      const state = aMsg.Speed > 0 ? 1 : 0;
      const cmdData = Buffer.from([0xaa, 0x55, this._packetId, 0x02, 0x03, 0x01,
                                   speed, state]);
      let crc = 0;
      // Simple XOR of everything up to the 9th byte for CRC.
      for (const byte of cmdData) {
        crc = byte ^ crc;
      }
      const data = Buffer.concat([cmdData,
                                  Buffer.from([crc, 0xff, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])]);

      this._packetId += 1;
      if (this._packetId > 255) {
        this._packetId = 0;
      }
      await this._device.WriteValue(data);
      return new Messages.Ok(aMsg.Id);
    }
}

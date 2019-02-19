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

export class VorzeA10Cyclone extends ButtplugDeviceProtocol {
  private _isCyclone = false;

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(aDeviceImpl.Name === "CycSA" ? "Vorze A10 Cyclone" : "Vorze UFO SA", aDeviceImpl);
    this._isCyclone = aDeviceImpl.Name === "CycSA";
    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.VorzeA10CycloneCmd, this.HandleVorzeA10CycloneCmd);
    this.MsgFuncs.set(Messages.RotateCmd, this.HandleRotateCmd);
  }

  public get MessageSpecifications(): object {
    return {
      RotateCmd: { FeatureCount: 1 },
      VorzeA10CycloneCmd: {},
      StopDeviceCmd: {},
    };
  }

  private HandleRotateCmd = async (aMsg: Messages.RotateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Rotations.length !== 1) {
      throw new ButtplugDeviceException(`Vorze A10 Cyclone devices require RotateCmd to have 1 rotation command,` +
                                        ` ${aMsg.Rotations.length} sent.`,
                                        aMsg.Id);
    }
    return await this.HandleVorzeA10CycloneCmd(new Messages.VorzeA10CycloneCmd(aMsg.Rotations[0].Speed * 100,
                                                                               aMsg.Rotations[0].Clockwise,
                                                                               aMsg.DeviceIndex,
                                                                               aMsg.Id));
  }

  private HandleStopDeviceCmd =
    async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
      return await this.HandleVorzeA10CycloneCmd(new Messages.VorzeA10CycloneCmd(0,
                                                                                 false,
                                                                                 aMsg.DeviceIndex,
                                                                                 aMsg.Id));
    }

  private HandleVorzeA10CycloneCmd =
    async (aMsg: Messages.VorzeA10CycloneCmd): Promise<Messages.ButtplugMessage> => {
      const rawSpeed = (((aMsg.Clockwise ? 1 : 0) << 7) | aMsg.Speed) & 0xff;
      await this._device.WriteValue(Buffer.from([this._isCyclone ? 0x01 : 0x02, 0x01, rawSpeed]));
      return new Messages.Ok(aMsg.Id);
    }
}

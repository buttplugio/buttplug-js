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

enum VorzeCommand {
  Rotate = 1,
  Vibrate = 3,
}

class VorzeType {
  public Name: string = "Vorze A10 Cyclone SA";
  public CommandType: VorzeCommand = VorzeCommand.Rotate;
  public DeviceType: number = 1;
}

export class VorzeA10Cyclone extends ButtplugDeviceProtocol {
  private static DevInfos = new Map<string, VorzeType>([
    [
      "CycSA",
      Object.assign(new VorzeType(), {
        Name: "Vorze A10 Cyclone SA",
        CommandType: VorzeCommand.Rotate,
        DeviceType: 1,
      }),
    ],
    [
      "UFOSA",
      Object.assign(new VorzeType(), {
        Name: "Vorze UFO SA",
        CommandType: VorzeCommand.Rotate,
        DeviceType: 2,
      }),
    ],
    [
      "Bach smart",
      Object.assign(new VorzeType(), {
        Name: "Vorze Bach",
        CommandType: VorzeCommand.Vibrate,
        DeviceType: 6,
      }),
    ],
  ]);

  private _devInfo: VorzeType = new VorzeType();
  private _clockwise = true;
  private _speed = 0;

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super("Vorze", aDeviceImpl);

    const tmpType  = VorzeA10Cyclone.DevInfos.get(aDeviceImpl.Name);
    if (tmpType !== undefined) {
      this._devInfo = tmpType;
      this._name = this._devInfo.Name;
    }

    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);

    if (this._devInfo.CommandType === VorzeCommand.Rotate) {
      this.MsgFuncs.set(Messages.VorzeA10CycloneCmd, this.HandleVorzeA10CycloneCmd);
      this.MsgFuncs.set(Messages.RotateCmd, this.HandleRotateCmd);
    }

    if (this._devInfo.CommandType === VorzeCommand.Vibrate) {
      this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
      this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
    }
  }

  public get MessageSpecifications(): object {
    if (this._devInfo.CommandType === VorzeCommand.Vibrate) {
      return {
        VibrateCmd: { FeatureCount: 1 },
        SingleMotorVibrateCmd: {},
        StopDeviceCmd: {},
      };
    }

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
      if (this._devInfo.CommandType === VorzeCommand.Vibrate) {
        return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0,
                                                                                         aMsg.DeviceIndex,
                                                                                         aMsg.Id));
      }
      return await this.HandleVorzeA10CycloneCmd(new Messages.VorzeA10CycloneCmd(0,
                                                                                 false,
                                                                                 aMsg.DeviceIndex,
                                                                                 aMsg.Id));
    }

  private HandleVorzeA10CycloneCmd =
    async (aMsg: Messages.VorzeA10CycloneCmd): Promise<Messages.ButtplugMessage> => {
      const rawSpeed = (((aMsg.Clockwise ? 1 : 0) << 7) | aMsg.Speed) & 0xff;
      await this._device.WriteValue(Buffer.from([this._devInfo.DeviceType, this._devInfo.CommandType, rawSpeed]));
      return new Messages.Ok(aMsg.Id);
    }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length !== 1) {
      throw new ButtplugDeviceException(`Vorze devices require VibrateCmd to have 1 speed commands, ` +
        `${aMsg.Speeds.length} sent.`,
        aMsg.Id);
    }
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed,
      aMsg.DeviceIndex,
      aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const newSpeed = Math.round(aMsg.Speed * 100);
      if (newSpeed !== this._speed) {
        await this._device.WriteValue(Buffer.from([this._devInfo.DeviceType, this._devInfo.CommandType, newSpeed]));
      }
      return new Messages.Ok(aMsg.Id);
    }
}

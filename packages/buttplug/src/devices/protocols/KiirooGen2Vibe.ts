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

class KiirooGen2VibeType {
  public Brand: string = "MagicMotion";
  public Name: string = "Smart Mini Vibe";
  public VibeCount: number = 1;
  public VibeOrder: number[] = [0, 1, 2];
}

export class KiirooGen2Vibe extends ButtplugDeviceProtocol {

  private static DevInfos = new Map<string, KiirooGen2VibeType>([
    [
      "Pearl2",
      Object.assign(new KiirooGen2VibeType(), {
        Brand: "Kiiroo",
        VibeCount: 1,
        VibeOrder: [0, 1, 2],
      }),
    ],
    [
      "Fuse",
      Object.assign(new KiirooGen2VibeType(), {
        Brand: "OhMiBod",
        VibeCount: 2,
        VibeOrder: [1, 0, 2],
      }),
    ],
    [
      "Virtual Blowbot",
      Object.assign(new KiirooGen2VibeType(), {
        Brand: "PornHub",
        VibeCount: 3,
        VibeOrder: [0, 1, 2],
      }),
    ],
    [
      "Titan",
      Object.assign(new KiirooGen2VibeType(), {
        Brand: "Kiiroo",
        VibeCount: 3,
        VibeOrder: [0, 1, 2],
      }),
    ],
  ]);

  private _devInfo: KiirooGen2VibeType = new KiirooGen2VibeType();
  private _hasRunCommand = false;
  private _vibratorSpeed = [ 0.0, 0.0, 0.0 ];

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super(`Kiiroo ${aDeviceImpl.Name}`, aDeviceImpl);

    const tmpType = KiirooGen2Vibe.DevInfos.get(aDeviceImpl.Name);
    if (tmpType !== undefined) {
      this._devInfo = tmpType;
      this._name = `${this._devInfo.Brand} ${aDeviceImpl.Name}`;
    }

    this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
    this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
  }

  public get MessageSpecifications(): object {
    return {
      VibrateCmd: { FeatureCount: this._devInfo.VibeCount },
      SingleMotorVibrateCmd: {},
      StopDeviceCmd: {},
    };
  }

  private HandleVibrateCmd = async (aMsg: Messages.VibrateCmd): Promise<Messages.ButtplugMessage> => {
    if (aMsg.Speeds.length < 1 || aMsg.Speeds.length > this._devInfo.VibeCount) {
      throw new ButtplugDeviceException(`MagicMotionn devices require VibrateCmd at most ` +
                                        `${this._devInfo.VibeCount} speed commands, ${aMsg.Speeds.length} sent.`,
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

    if (!changed && this._hasRunCommand) {
      return new Messages.Ok(aMsg.Id);
    }

    const data = Buffer.from([
      this._vibratorSpeed[this._devInfo.VibeOrder[0]] * 100,
      this._vibratorSpeed[this._devInfo.VibeOrder[0]] * 100,
      this._vibratorSpeed[this._devInfo.VibeOrder[0]] * 100 ]);

    this._hasRunCommand = true;

    await this._device.WriteValue(data);
    return new Messages.Ok(aMsg.Id);
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const speeds: Messages.SpeedSubcommand[] = [];
      for (let i = 0; i < this._devInfo.VibeCount; i++) {
        speeds.push(new Messages.SpeedSubcommand(i, aMsg.Speed));
      }
      return await this.HandleVibrateCmd(new Messages.VibrateCmd(speeds, aMsg.DeviceIndex, aMsg.Id));
    }
}

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
import {Endpoints} from "../Endpoints";
import {ButtplugDeviceWriteOptions} from "../ButtplugDeviceWriteOptions";

class LiBoType {
  public Name: string = "Lottie";
  public VibeCount: number = 1;
  public VibeOrder: number[] = [ 0, 1 ];
}

export class LiBo extends ButtplugDeviceProtocol {

  private static DevInfos = new Map<string, LiBoType>([
    [
      "PiPiJing",
      Object.assign(new LiBoType(), {
        Name: "Elle",
        VibeCount: 2, // Shock as vibe
        VibeOrder: [ 1, 0 ],
      }),
    ],
    [
      "XiaoLu",
      Object.assign(new LiBoType(), {
        Name: "Lottie",
        VibeCount: 1,
      }),
    ],
    [
      "SuoYinQiu",
      Object.assign(new LiBoType(), {
        Name: "Karen",
        VibeCount: 0,
      }),
    ],
    [
      "BaiHu",
      Object.assign(new LiBoType(), {
        Name: "LaLa",
        VibeCount: 2, // Suction as vibe
      }),
    ],
    [
      "LuXiaoHan",
      Object.assign(new LiBoType(), {
        Name: "LuLu",
        VibeCount: 1,
      }),
    ],
    [
      "MonsterPub",
      Object.assign(new LiBoType(), {
        Name: "MonsterPub",
        VibeCount: 1,
      }),
    ],
  ]);

  private _devInfo: LiBoType = new LiBoType();
  private _hasRunCommand = false;
  private _vibratorSpeed = [ 0.0, 0.0 ];

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super("LiBo", aDeviceImpl);

    const tmpType = LiBo.DevInfos.get(aDeviceImpl.Name);
    if (tmpType !== undefined) {
      this._devInfo = tmpType;
      this._name = `LiBo ${this._devInfo.Name}`;
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
      throw new ButtplugDeviceException(`Libo devices require VibrateCmd to have at most ` +
                                        `${this._devInfo.VibeCount} speed commands, ${aMsg.Speeds.length} sent.`,
                                        aMsg.Id);
    }

    const changed = [ false, false ];

    for (const cmd of aMsg.Speeds) {
      if (!(Math.abs(cmd.Speed - this._vibratorSpeed[cmd.Index]) > 0.001)) {
        continue;
      }

      changed[cmd.Index] = true;
      this._vibratorSpeed[cmd.Index] = cmd.Speed;
    }

    if (changed[this._devInfo.VibeOrder[0]] || !this._hasRunCommand) {
      let ep = Endpoints.Tx;
      if (this._devInfo.VibeCount === 1 && Math.ceil(this._vibratorSpeed[this._devInfo.VibeOrder[0]] * 0x64) === 0) {
        ep = Endpoints.TxMode;
      }

      // Map a 0 - 100% value to a 0 - 0x64 value since 0 * x == 0 this will turn off the vibe if
      // speed is 0.00
      await this._device.WriteValue( Buffer.from([ Math.ceil(this._vibratorSpeed[this._devInfo.VibeOrder[0]] * 0x64) ]),
      new ButtplugDeviceWriteOptions( { Endpoint: ep }));
    }

    if (this._devInfo.VibeCount < 2 || (!changed[this._devInfo.VibeOrder[1]] && this._hasRunCommand) ) {
      if (this._devInfo.VibeCount < 2) {
        this._hasRunCommand = true;
      }

      return new Messages.Ok(aMsg.Id);
    }

    this._hasRunCommand = true;

    // Map a 0 - 100% value to a 0 - 3 value since 0 * x == 0 this will turn off the vibe if
    // speed is 0.00
    await this._device.WriteValue( Buffer.from([ Math.ceil(this._vibratorSpeed[this._devInfo.VibeOrder[1]] * 3) ]),
    new ButtplugDeviceWriteOptions( { Endpoint: Endpoints.TxMode }));

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

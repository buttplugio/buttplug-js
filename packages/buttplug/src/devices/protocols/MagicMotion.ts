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

class MagicMotionType {
  public Brand: string = "MagicMotion";
  public Name: string = "Smart Mini Vibe";
  public VibeCount: number = 1;
  public Protocol: number = 1;
  public MaxSpeed: number = 0x64;
}

export class MagicMotion extends ButtplugDeviceProtocol {

  private static DevInfos = new Map<string, MagicMotionType>([
    [
      "Smart Mini Vibe",
      Object.assign(new MagicMotionType(),
      {
        Brand: "MagicMotion",
        Name: "Smart Mini Vibe",
        VibeCount: 1,
        Protocol: 1,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Flamingo",
      Object.assign(new MagicMotionType(),
      {
        Brand: "MagicMotion",
        Name: "Flamingo",
        VibeCount: 1,
        Protocol: 1,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Magic Cell",
      Object.assign(new MagicMotionType(),
      {
        // ToDo: has accelerometer
        Brand: "MagicMotion",
        Name: "Dante/Candy",
        VibeCount: 1,
        Protocol: 1,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Eidolon",
      Object.assign(new MagicMotionType(),
      {
        Brand : "MagicMotion",
        Name: "Eidolon",
        VibeCount: 2,
        Protocol: 2,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Smart Bean",
      Object.assign(new MagicMotionType(),
      {
        // ToDo: Master has pressure sensor, Twins does not
        Brand: "MagicMotion",
        Name: "Kegel",
        VibeCount: 1,
        Protocol: 1,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Magic Wand",
      Object.assign(new MagicMotionType(),
      {
        // ToDo: Wand has temperature sensor and heater
        Brand: "MagicMotion",
        Name: "Wand",
        VibeCount: 1,
        Protocol: 1,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Krush",
      Object.assign(new MagicMotionType(),
      {
        // ToDo: Receive squeeze sensor packets & capture exact motor values
        Brand: "LoveLife",
        Name: "Krush",
        VibeCount: 1,
        Protocol: 3,
        MaxSpeed: 0x4d,
      }),
    ],
    [
      "Smart Mini Vibe3",
      Object.assign(new MagicMotionType(),
      {
        Brand: "MagicMotion",
        Name: "Vini",
        VibeCount: 1,
        Protocol: 1,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Fugu",
      Object.assign(new MagicMotionType(),
      {
        Brand: "MagicMotion",
        Name: "Fugu",
        VibeCount: 1,
        Protocol: 1,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Lipstick",
      Object.assign(new MagicMotionType(),
      {
        Brand: "MagicMotion",
        Name: "Awaken",
        VibeCount: 1,
        Protocol: 2,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Sword",
      Object.assign(new MagicMotionType(),
      {
        Brand: "MagicMotion",
        Name: "Equinox",
        VibeCoun: 1,
        Protocol: 2,
        MaxSpeed: 0x64,
      }),
    ],
    [
      "Curve",
      Object.assign(new MagicMotionType(),
      {
        Brand: "MagicMotion",
        Name: "Solstice",
        VibeCount: 1,
        Protocol: 2,
        MaxSpeed: 0x64,
      }),
    ],
  ]);

  private _devInfo: MagicMotionType = new MagicMotionType();
  private _hasRunCommand = false;
  private _vibratorSpeed = [ 0.0, 0.0 ];

  public constructor(aDeviceImpl: IButtplugDeviceImpl) {
    super("MagicMotion", aDeviceImpl);

    const tmpType = MagicMotion.DevInfos.get(aDeviceImpl.Name);
    if (tmpType !== undefined) {
      this._devInfo = tmpType;
      this._name = `${this._devInfo.Brand} ${this._devInfo.Name}`;
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

    let data: Buffer;
    switch (this._devInfo.Protocol) {
      case 1:
        data = Buffer.from([ 0x0b, 0xff, 0x04, 0x0a, 0x32, 0x32, 0x00, 0x04, 0x08, 0x00, 0x64, 0x00 ]);
        data[9] = Math.round(this._vibratorSpeed[0] * this._devInfo.MaxSpeed);
        break;

      case 2:
        data = Buffer.from([ 0x10, 0xff, 0x04, 0x0a, 0x32, 0x0a, 0x00, 0x04, 0x08, 0x00, 0x64, 0x00,
                             0x04, 0x08, 0x00, 0x64, 0x01 ]);
        data[9] = Math.round(this._vibratorSpeed[0] * this._devInfo.MaxSpeed);

        if (this._devInfo.VibeCount >= 2) {
          data[14] = Math.round(this._vibratorSpeed[1] * this._devInfo.MaxSpeed);
        }

        break;

      case 3:
        data = Buffer.from([ 0x0b, 0xff, 0x04, 0x0a, 0x46, 0x46, 0x00, 0x04, 0x08, 0x00, 0x64, 0x00 ]);
        data[9] = Math.round(this._vibratorSpeed[0] * this._devInfo.MaxSpeed);
        break;

      default:
        throw new ButtplugDeviceException("Unknown communication protocol.");
    }

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

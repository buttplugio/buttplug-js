import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
import * as Messages from "../../../core/Messages";

export class VorzeA10Cyclone extends ButtplugBluetoothDevice {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["CycSA"],
                                                              [],
                                                              ["40ee1111-63ec-4b7f-8ce7-712efd55b90e"],
                                                              {},
                                                              VorzeA10Cyclone.CreateInstance);

  public static async CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice> {
    // Send initializer byte
    aDeviceImpl.WriteValue("cmd", new Uint8Array([0x00]));
    return new VorzeA10Cyclone(aDeviceImpl);
  }

  public constructor(aDeviceImpl: IBluetoothDeviceImpl) {
    super("Vorze A10 Cyclone", aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.VorzeA10CycloneCmd.name, this.HandleVorzeA10CycloneCmd);
    this.MsgFuncs.set(Messages.RotateCmd.name, this.HandleRotateCmd);
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
      return new Messages.Error(`Vorze A10 Cyclone devices require RotateCmd to have 1 rotation command,` +
                                ` ${aMsg.Rotations.length} sent.`,
                                Messages.ErrorClass.ERROR_DEVICE,
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
      await this._deviceImpl.WriteValue("tx", new Uint8Array([0x01, 0x01, rawSpeed]));
      return new Messages.Ok(aMsg.Id);
    }
}

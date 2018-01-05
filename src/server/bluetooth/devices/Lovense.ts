import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
import * as Messages from "../../../core/Messages";

// The TextEncoder polyfill is 600k (DAMNIT JOSH). Locally (for things like the
// node device manager), not a huge deal. For web hosted libraries, we'll assume
// the browser has it and ignore the require, since this class is only really
// useful for browsers with WebBluetooth anyways.
let TextEncoder = typeof(window) !== "undefined" ? (window as any).TextEncoder : undefined;
if (TextEncoder === undefined) {
  TextEncoder = require("text-encoding").TextEncoder;
}

export class Lovense extends ButtplugBluetoothDevice {
  public static CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice> {
    return Promise.resolve(new Lovense(aDeviceImpl));
  }

  private static _deviceNames = { "LVS-A011": "Nora",
                                  "LVS-C011": "Nora",
                                  "LVS-B011": "Max",
                                  "LVS-L009": "Ambi",
                                  "LVS-S001": "Lush",
                                  "LVS-Z36": "Hush",
                                  "LVS-Z001": "Hush",
                                  "LVS_Z001": "Hush",
                                  "LVS-Domi37": "Domi",
                                  "LVS-P36": "Edge",
                                  "LVS-Edge37": "Edge"};

  public constructor(aDeviceImpl: IBluetoothDeviceImpl) {
    super(`Lovense ${aDeviceImpl.Name}`, aDeviceImpl);
    this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
    this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
  }

  private HandleStopDeviceCmd = async (aMsg: Messages.StopDeviceCmd): Promise<Messages.ButtplugMessage> => {
    return await this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
  }

  private HandleSingleMotorVibrateCmd =
    async (aMsg: Messages.SingleMotorVibrateCmd): Promise<Messages.ButtplugMessage> => {
      const speed = Math.floor(20 * aMsg.Speed);
      await this._deviceImpl.WriteValue("tx", new TextEncoder().encode("Vibrate:" + speed + ";"));
      return new Messages.Ok(aMsg.Id);
    }
}

export class LovenseRev1 {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["LVS-A011", "LVS-C011", "LVS-B011", "LVS-L009"],
                                                              ["0000fff0-0000-1000-8000-00805f9b34fb"],
                                                              {tx: "0000fff2-0000-1000-8000-00805f9b34fb",
                                                               // rx: "0000fff1-0000-1000-8000-00805f9b34fb"
                                                              },
                                                              Lovense.CreateInstance);
}

export class LovenseRev2 {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["LVS-S001", "LVS-Z001", "LVS_Z001"],
                                                              ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"],
                                                              {tx: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
                                                               // rx: "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
                                                              },
                                                              Lovense.CreateInstance);
}

export class LovenseRev3 {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["LVS-P36"],
                                                              ["50300001-0024-4bd4-bbd5-a6920e4c5653"],
                                                              {tx: "50300002-0024-4bd4-bbd5-a6920e4c5653",
                                                               // rx: "50300003-0024-4bd4-bbd5-a6920e4c5653"
                                                              },
                                                              Lovense.CreateInstance);
}

export class LovenseRev4 {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["LVS-Domi37"],
                                                              ["57300001-0023-4bd4-bbd5-a6920e4c5653"],
                                                              {tx: "57300002-0023-4bd4-bbd5-a6920e4c5653",
                                                               // rx: "57300003-0023-4bd4-bbd5-a6920e4c5653"
                                                              },
                                                              Lovense.CreateInstance);
}

export class LovenseRev5 {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["LVS-Z36"],
                                                              ["5a300001-0024-4bd4-bbd5-a6920e4c5653"],
                                                              {tx: "5a300002-0024-4bd4-bbd5-a6920e4c5653",
                                                               // rx: "57300003-0023-4bd4-bbd5-a6920e4c5653"
                                                              },
                                                              Lovense.CreateInstance);
}

export class LovenseRev6 {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["LVS-Edge37"],
                                                              ["50300001-0023-4bd4-bbd5-a6920e4c5653"],
                                                              {tx: "50300002-0023-4bd4-bbd5-a6920e4c5653",
                                                               // rx: "57300003-0023-4bd4-bbd5-a6920e4c5653"
                                                              },
                                                              Lovense.CreateInstance);
}

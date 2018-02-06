import { ButtplugDevice } from "../ButtplugDevice";
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";

export abstract class ButtplugBluetoothDevice extends ButtplugDevice {
  public constructor(aName: string, protected _deviceImpl: IBluetoothDeviceImpl) {
    super(aName, _deviceImpl.Id);
  }

  public OnDisconnect() {
    this.emit("deviceremoved", this);
  }
}

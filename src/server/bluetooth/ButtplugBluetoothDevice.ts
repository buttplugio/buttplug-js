import ButtplugDevice from "../ButtplugDevice";
import IBluetoothDeviceImpl from "./IBluetoothDeviceImpl";

export default class ButtplugBluetoothDevice extends ButtplugDevice {
  public constructor(aName: string, protected _deviceImpl: IBluetoothDeviceImpl) {
    super(aName);
  }

  public OnDisconnect() {
    this.emit("deviceremoved", this);
  }
}

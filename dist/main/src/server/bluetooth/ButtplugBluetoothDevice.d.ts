import ButtplugDevice from "../ButtplugDevice";
import IBluetoothDeviceImpl from "./IBluetoothDeviceImpl";
export default class ButtplugBluetoothDevice extends ButtplugDevice {
    protected _deviceImpl: IBluetoothDeviceImpl;
    constructor(aName: string, _deviceImpl: IBluetoothDeviceImpl);
    OnDisconnect(): void;
}

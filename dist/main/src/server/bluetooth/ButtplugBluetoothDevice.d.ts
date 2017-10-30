import { ButtplugDevice } from "../ButtplugDevice";
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
export declare class ButtplugBluetoothDevice extends ButtplugDevice {
    protected _deviceImpl: IBluetoothDeviceImpl;
    constructor(aName: string, _deviceImpl: IBluetoothDeviceImpl);
    OnDisconnect(): void;
}

import { ButtplugDevice } from "../ButtplugDevice";
import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
export declare abstract class ButtplugBluetoothDevice extends ButtplugDevice {
    protected _deviceImpl: IBluetoothDeviceImpl;
    constructor(aName: string, _deviceImpl: IBluetoothDeviceImpl);
    Disconnect(): void;
    OnDisconnect(): void;
}

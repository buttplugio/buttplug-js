import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
export declare class VorzeA10Cyclone extends ButtplugBluetoothDevice {
    static readonly DeviceInfo: BluetoothDeviceInfo;
    static CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice>;
    constructor(aDeviceImpl: IBluetoothDeviceImpl);
    private HandleStopDeviceCmd;
    private HandleVorzeA10CycloneCmd;
}

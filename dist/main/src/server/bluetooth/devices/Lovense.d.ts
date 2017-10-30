import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
export declare class Lovense extends ButtplugBluetoothDevice {
    static CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice>;
    private static _deviceNames;
    constructor(aDeviceImpl: IBluetoothDeviceImpl);
    private HandleStopDeviceCmd;
    private HandleSingleMotorVibrateCmd;
}
export declare class LovenseRev1 {
    static readonly DeviceInfo: BluetoothDeviceInfo;
}
export declare class LovenseRev2 {
    static readonly DeviceInfo: BluetoothDeviceInfo;
}
export declare class LovenseRev3 {
    static readonly DeviceInfo: BluetoothDeviceInfo;
}
export declare class LovenseRev4 {
    static readonly DeviceInfo: BluetoothDeviceInfo;
}

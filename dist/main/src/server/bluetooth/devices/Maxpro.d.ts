import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
export declare class Maxpro extends ButtplugBluetoothDevice {
    static readonly DeviceInfo: BluetoothDeviceInfo;
    static CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice>;
    constructor(aDeviceImpl: IBluetoothDeviceImpl);
    readonly MessageSpecifications: object;
    private HandleVibrateCmd;
    private HandleStopDeviceCmd;
    private HandleSingleMotorVibrateCmd;
}

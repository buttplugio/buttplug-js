import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
export declare class FleshlightLaunch extends ButtplugBluetoothDevice {
    static readonly DeviceInfo: BluetoothDeviceInfo;
    static CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice>;
    private _lastPosition;
    constructor(aDeviceImpl: IBluetoothDeviceImpl);
    Initialize: () => Promise<void>;
    readonly MessageSpecifications: object;
    private HandleStopDeviceCmd;
    private HandleFleshlightLaunchFW12Cmd;
    private HandleLinearCmd;
}

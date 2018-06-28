import { BluetoothDeviceInfo } from "../BluetoothDeviceInfo";
import { ButtplugBluetoothDevice } from "../ButtplugBluetoothDevice";
import { IBluetoothDeviceImpl } from "../IBluetoothDeviceImpl";
export declare class Lovense extends ButtplugBluetoothDevice {
    static readonly DeviceInfo: BluetoothDeviceInfo;
    static CreateInstance(aDeviceImpl: IBluetoothDeviceImpl): Promise<ButtplugBluetoothDevice>;
    private static _deviceNames;
    private _initResolve;
    private _initPromise;
    private _isClockwise;
    private _specs;
    constructor(aDeviceImpl: IBluetoothDeviceImpl);
    Initialize: () => Promise<void>;
    readonly MessageSpecifications: object;
    private ParseDeviceType;
    private OnValueChanged;
    private HandleStopDeviceCmd;
    private HandleSingleMotorVibrateCmd;
    private HandleVibrateCmd;
    private HandleRotateCmd;
}

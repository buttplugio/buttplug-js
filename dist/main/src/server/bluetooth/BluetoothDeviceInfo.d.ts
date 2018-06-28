import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
import { ButtplugBluetoothDevice } from "./ButtplugBluetoothDevice";
export declare class BluetoothDeviceInfo {
    private _names;
    private _namePrefixes;
    private _services;
    private _characteristics;
    private _createFunc;
    constructor(_names: string[], _namePrefixes: string[], _services: string[], _characteristics: object, _createFunc: (aDeviceImpl: IBluetoothDeviceImpl) => Promise<ButtplugBluetoothDevice>);
    readonly Names: string[];
    readonly NamePrefixes: string[];
    readonly Services: string[];
    readonly Characteristics: object;
    readonly Create: (aDeviceImpl: IBluetoothDeviceImpl) => Promise<ButtplugBluetoothDevice>;
}

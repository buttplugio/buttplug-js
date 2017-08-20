import IBluetoothDeviceImpl from "./IBluetoothDeviceImpl";
import ButtplugBluetoothDevice from "./ButtplugBluetoothDevice";
export default class BluetoothDeviceInfo {
    private _names;
    private _services;
    private _characteristics;
    private _createFunc;
    constructor(_names: string[], _services: string[], _characteristics: object, _createFunc: (aDeviceImpl: IBluetoothDeviceImpl) => Promise<ButtplugBluetoothDevice>);
    readonly Names: string[];
    readonly Services: string[];
    readonly Characteristics: object;
    readonly Create: (aDeviceImpl: IBluetoothDeviceImpl) => Promise<ButtplugBluetoothDevice>;
}

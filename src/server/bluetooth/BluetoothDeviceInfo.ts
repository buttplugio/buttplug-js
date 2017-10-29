import { IBluetoothDeviceImpl } from "./IBluetoothDeviceImpl";
import { ButtplugBluetoothDevice } from "./ButtplugBluetoothDevice";

export class BluetoothDeviceInfo {
  constructor(private _names: string[],
              private _services: string[],
              private _characteristics: object,
              private _createFunc: (aDeviceImpl: IBluetoothDeviceImpl) => Promise<ButtplugBluetoothDevice>) {
  }

  public get Names() {
    return this._names;
  }

  public get Services() {
    return this._services;
  }

  public get Characteristics() {
    return this._characteristics;
  }

  public get Create() {
    return this._createFunc;
  }
}

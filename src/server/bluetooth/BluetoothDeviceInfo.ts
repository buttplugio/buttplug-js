export default class BluetoothDeviceInfo {
  constructor(private _names: string[],
              private _services: string[],
              private _characteristics: object) {
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
}

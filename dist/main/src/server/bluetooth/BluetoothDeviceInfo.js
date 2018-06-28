"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BluetoothDeviceInfo {
    constructor(_names, _namePrefixes, _services, _characteristics, _createFunc) {
        this._names = _names;
        this._namePrefixes = _namePrefixes;
        this._services = _services;
        this._characteristics = _characteristics;
        this._createFunc = _createFunc;
    }
    get Names() {
        return this._names;
    }
    get NamePrefixes() {
        return this._namePrefixes;
    }
    get Services() {
        return this._services;
    }
    get Characteristics() {
        return this._characteristics;
    }
    get Create() {
        return this._createFunc;
    }
}
exports.BluetoothDeviceInfo = BluetoothDeviceInfo;
//# sourceMappingURL=BluetoothDeviceInfo.js.map
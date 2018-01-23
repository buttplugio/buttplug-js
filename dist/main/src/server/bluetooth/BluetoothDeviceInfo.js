"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BluetoothDeviceInfo {
    constructor(_names, _services, _characteristics, _createFunc) {
        this._names = _names;
        this._services = _services;
        this._characteristics = _characteristics;
        this._createFunc = _createFunc;
    }
    get Names() {
        return this._names;
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
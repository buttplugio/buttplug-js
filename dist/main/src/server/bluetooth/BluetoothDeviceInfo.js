"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BluetoothDeviceInfo = /** @class */ (function () {
    function BluetoothDeviceInfo(_names, _services, _characteristics, _createFunc) {
        this._names = _names;
        this._services = _services;
        this._characteristics = _characteristics;
        this._createFunc = _createFunc;
    }
    Object.defineProperty(BluetoothDeviceInfo.prototype, "Names", {
        get: function () {
            return this._names;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BluetoothDeviceInfo.prototype, "Services", {
        get: function () {
            return this._services;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BluetoothDeviceInfo.prototype, "Characteristics", {
        get: function () {
            return this._characteristics;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BluetoothDeviceInfo.prototype, "Create", {
        get: function () {
            return this._createFunc;
        },
        enumerable: true,
        configurable: true
    });
    return BluetoothDeviceInfo;
}());
exports.default = BluetoothDeviceInfo;
//# sourceMappingURL=BluetoothDeviceInfo.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Messages = require("./Messages");
var Device = /** @class */ (function () {
    function Device(_index, _name, _allowedMessages) {
        this._index = _index;
        this._name = _name;
        this._allowedMessages = _allowedMessages;
    }
    Device.fromMsg = function (aMsg) {
        return new Device(aMsg.DeviceIndex, aMsg.DeviceName, aMsg.DeviceMessages);
    };
    Object.defineProperty(Device.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "Index", {
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "AllowedMessages", {
        get: function () {
            return this._allowedMessages;
        },
        enumerable: true,
        configurable: true
    });
    Device.prototype.newMessage = function (allowedMsg) {
        var msg = this._allowedMessages[allowedMsg];
        return Messages[msg];
    };
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=Device.js.map
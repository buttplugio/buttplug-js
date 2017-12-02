"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
var Device = /** @class */ (function () {
    /**
     * @param _index Index of the device, as created by the device manager.
     * @param _name Name of the device.
     * @param _allowedMsgs Buttplug messages the device can receive.
     */
    function Device(index, name, allowedMsgs) {
        this.index = index;
        this.name = name;
        this.allowedMsgs = allowedMsgs;
    }
    Device.fromMsg = function (aMsg) {
        return new Device(aMsg.DeviceIndex, aMsg.DeviceName, aMsg.DeviceMessages);
    };
    Object.defineProperty(Device.prototype, "Name", {
        /**
         * Return the name of the device.
         */
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "Index", {
        /**
         * Return the index of the device.
         */
        get: function () {
            return this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "AllowedMessages", {
        /**
         * Return a list of message types the device accepts.
         */
        get: function () {
            return this.allowedMsgs;
        },
        enumerable: true,
        configurable: true
    });
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=Device.js.map
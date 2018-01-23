"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
class Device {
    /**
     * @param _index Index of the device, as created by the device manager.
     * @param _name Name of the device.
     * @param _allowedMsgs Buttplug messages the device can receive.
     */
    constructor(index, name, allowedMsgs) {
        this.index = index;
        this.name = name;
        this.allowedMsgs = allowedMsgs;
    }
    static fromMsg(aMsg) {
        return new Device(aMsg.DeviceIndex, aMsg.DeviceName, aMsg.DeviceMessages);
    }
    /**
     * Return the name of the device.
     */
    get Name() {
        return this.name;
    }
    /**
     * Return the index of the device.
     */
    get Index() {
        return this.index;
    }
    /**
     * Return a list of message types the device accepts.
     */
    get AllowedMessages() {
        return Object.keys(this.allowedMsgs);
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map
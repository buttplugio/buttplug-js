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
    constructor(index, name, allowedMsgsObj) {
        this.index = index;
        this.name = name;
        // Map of messages and their attributes (feature count, etc...)
        this.allowedMsgs = new Map();
        for (const k of Object.keys(allowedMsgsObj)) {
            this.allowedMsgs.set(k, allowedMsgsObj[k]);
        }
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
        return Array.from(this.allowedMsgs.keys());
    }
    /**
     * Return the message attributes related to the given message
     */
    MessageAttributes(messageName) {
        if (this.AllowedMessages.indexOf(messageName) === -1) {
            throw new Error(`Message ${messageName} does not exist on device ${this.name}`);
        }
        return this.allowedMsgs.get(messageName);
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Device {
    constructor(_index, _name, _allowedMessages) {
        this._index = _index;
        this._name = _name;
        this._allowedMessages = _allowedMessages;
    }
    static fromMsg(aMsg) {
        return new Device(aMsg.DeviceIndex, aMsg.DeviceName, aMsg.DeviceMessages);
    }
    get Name() {
        return this._name;
    }
    get Index() {
        return this._index;
    }
    get AllowedMessages() {
        return this._allowedMessages;
    }
}
exports.Device = Device;
//# sourceMappingURL=device.js.map
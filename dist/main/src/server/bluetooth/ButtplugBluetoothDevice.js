"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ButtplugDevice_1 = require("../ButtplugDevice");
class ButtplugBluetoothDevice extends ButtplugDevice_1.ButtplugDevice {
    constructor(aName, _deviceImpl) {
        super(aName, _deviceImpl.Id);
        this._deviceImpl = _deviceImpl;
    }
    OnDisconnect() {
        this.emit("deviceremoved", this);
    }
}
exports.ButtplugBluetoothDevice = ButtplugBluetoothDevice;
//# sourceMappingURL=ButtplugBluetoothDevice.js.map
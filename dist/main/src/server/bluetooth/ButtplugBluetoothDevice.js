"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ButtplugDevice_1 = require("../ButtplugDevice");
var ButtplugBluetoothDevice = /** @class */ (function (_super) {
    __extends(ButtplugBluetoothDevice, _super);
    function ButtplugBluetoothDevice(aName, _deviceImpl) {
        var _this = _super.call(this, aName) || this;
        _this._deviceImpl = _deviceImpl;
        return _this;
    }
    ButtplugBluetoothDevice.prototype.OnDisconnect = function () {
        this.emit("deviceremoved", this);
    };
    return ButtplugBluetoothDevice;
}(ButtplugDevice_1.ButtplugDevice));
exports.ButtplugBluetoothDevice = ButtplugBluetoothDevice;
//# sourceMappingURL=ButtplugBluetoothDevice.js.map
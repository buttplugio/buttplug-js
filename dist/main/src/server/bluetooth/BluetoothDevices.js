"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FleshlightLaunch_1 = require("./devices/FleshlightLaunch");
var Lovense_1 = require("./devices/Lovense");
var BluetoothDevices = (function () {
    function BluetoothDevices() {
    }
    BluetoothDevices.GetDeviceInfo = function () {
        return [FleshlightLaunch_1.default.DeviceInfo,
            Lovense_1.LovenseRev1.DeviceInfo,
            Lovense_1.LovenseRev2.DeviceInfo,
            Lovense_1.LovenseRev3.DeviceInfo];
    };
    return BluetoothDevices;
}());
exports.default = BluetoothDevices;
//# sourceMappingURL=BluetoothDevices.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FleshlightLaunch_1 = require("./devices/FleshlightLaunch");
var Lovense_1 = require("./devices/Lovense");
var VorzeA10Cyclone_1 = require("./devices/VorzeA10Cyclone");
var WeVibe_1 = require("./devices/WeVibe");
var BluetoothDevices = /** @class */ (function () {
    function BluetoothDevices() {
    }
    BluetoothDevices.GetDeviceInfo = function () {
        return [FleshlightLaunch_1.FleshlightLaunch.DeviceInfo,
            Lovense_1.LovenseRev1.DeviceInfo,
            Lovense_1.LovenseRev2.DeviceInfo,
            Lovense_1.LovenseRev3.DeviceInfo,
            Lovense_1.LovenseRev4.DeviceInfo,
            VorzeA10Cyclone_1.VorzeA10Cyclone.DeviceInfo,
            WeVibe_1.WeVibe.DeviceInfo];
    };
    return BluetoothDevices;
}());
exports.BluetoothDevices = BluetoothDevices;
//# sourceMappingURL=BluetoothDevices.js.map
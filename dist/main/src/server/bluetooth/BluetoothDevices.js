"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FleshlightLaunch_1 = require("./devices/FleshlightLaunch");
const Lovense_1 = require("./devices/Lovense");
const VorzeA10Cyclone_1 = require("./devices/VorzeA10Cyclone");
const WeVibe_1 = require("./devices/WeVibe");
const Maxpro_1 = require("./devices/Maxpro");
class BluetoothDevices {
    static GetDeviceInfo() {
        return [FleshlightLaunch_1.FleshlightLaunch.DeviceInfo,
            Lovense_1.LovenseRev1.DeviceInfo,
            Lovense_1.LovenseRev2.DeviceInfo,
            Lovense_1.LovenseRev3.DeviceInfo,
            Lovense_1.LovenseRev4.DeviceInfo,
            Lovense_1.LovenseRev5.DeviceInfo,
            Lovense_1.LovenseRev6.DeviceInfo,
            Lovense_1.LovenseRev7.DeviceInfo,
            Lovense_1.LovenseRev8.DeviceInfo,
            Maxpro_1.Maxpro.DeviceInfo,
            VorzeA10Cyclone_1.VorzeA10Cyclone.DeviceInfo,
            WeVibe_1.WeVibe.DeviceInfo];
    }
}
exports.BluetoothDevices = BluetoothDevices;
//# sourceMappingURL=BluetoothDevices.js.map
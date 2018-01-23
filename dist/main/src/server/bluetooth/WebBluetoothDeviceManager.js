"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BluetoothDevices_1 = require("./BluetoothDevices");
const events_1 = require("events");
const WebBluetoothDevice_1 = require("./WebBluetoothDevice");
class WebBluetoothDeviceManager extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.OpenDevice = (aDevice) => __awaiter(this, void 0, void 0, function* () {
            if (aDevice === undefined) {
                // TODO Throw here?
                return;
            }
            // Find the related info for the device
            const info = BluetoothDevices_1.BluetoothDevices.GetDeviceInfo();
            let deviceInfo = null;
            for (const di of info) {
                if (di.Names.indexOf(aDevice.name) >= 0) {
                    deviceInfo = di;
                    break;
                }
            }
            if (deviceInfo === null) {
                // TODO Throw here?
                // We somehow got a device we don't know what to do with?
                return;
            }
            const device = yield WebBluetoothDevice_1.WebBluetoothDevice.CreateDevice(deviceInfo, aDevice);
            this.emit("deviceadded", device);
        });
    }
    StartScanning() {
        return __awaiter(this, void 0, void 0, function* () {
            // Form scanning filters
            const info = BluetoothDevices_1.BluetoothDevices.GetDeviceInfo();
            const filters = {
                filters: new Array(),
                optionalServices: new Array(),
            };
            for (const deviceInfo of info) {
                for (const deviceName of deviceInfo.Names) {
                    filters.filters.push({ name: deviceName });
                }
                filters.optionalServices = [...filters.optionalServices, ...deviceInfo.Services];
            }
            // At some point, we should use navigator.bluetooth.getAvailability() to
            // check whether we have a radio to use. However, no browser currently
            // implements this. Instead, see if requestDevice throws;
            let device;
            try {
                device = yield (navigator.bluetooth).requestDevice(filters);
            }
            catch (e) {
                this.emit("scanningfinished");
                // This is the only way we have to check whether the user cancelled out of
                // the dialog versus bluetooth radio not being available, as both errors
                // are thrown as DOMExcpetion. Kill me.
                if (e.message.indexOf("User cancelled") !== -1) {
                    return;
                }
                throw new Error("Bluetooth scanning interrupted. " +
                    "Either user cancelled out of dialog, or bluetooth radio is not available. Exception: " + e);
            }
            try {
                yield this.OpenDevice(device);
            }
            catch (e) {
                this.emit("scanningfinished");
                throw new Error(`Cannot open device ${device.name}: ${e}`);
            }
            this.emit("scanningfinished");
        });
    }
    StopScanning() {
        // noop. We can only scan via the browser dialog, and we can't cancel that from outside.
    }
    get IsScanning() {
        // noop.
        return false;
    }
}
exports.WebBluetoothDeviceManager = WebBluetoothDeviceManager;
//# sourceMappingURL=WebBluetoothDeviceManager.js.map
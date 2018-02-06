"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const TestDevice_1 = require("./TestDevice");
const index_1 = require("../index");
class TestDeviceManager extends events_1.EventEmitter {
    constructor() {
        super();
        this._isScanning = false;
        this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false);
        this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true);
    }
    ConnectVibrationDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Vibration Device");
        this._testVibrationDevice.Connected = true;
        this.emit("deviceadded", this._testVibrationDevice);
    }
    ConnectLinearDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Linear Device");
        this._testLinearDevice.Connected = true;
        this.emit("deviceadded", this._testLinearDevice);
    }
    StartScanning() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Starting Scan");
        this._isScanning = true;
        // Always emit devices. If they're duplicates, the device manager will weed
        // them out.
        setTimeout(() => {
            this.ConnectVibrationDevice();
            this.ConnectLinearDevice();
        }, 50);
        setTimeout(() => this.StopScanning(), 100);
    }
    get VibrationDevice() {
        return this._testVibrationDevice;
    }
    get LinearDevice() {
        return this._testLinearDevice;
    }
    StopScanning() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Stopping Scan");
        this._isScanning = false;
        this.emit("scanningfinished");
    }
    get IsScanning() {
        return this._isScanning;
    }
}
exports.TestDeviceManager = TestDeviceManager;
//# sourceMappingURL=TestDeviceManager.js.map
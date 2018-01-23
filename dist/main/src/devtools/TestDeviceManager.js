"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const TestDevice_1 = require("./TestDevice");
class TestDeviceManager extends events_1.EventEmitter {
    constructor() {
        super();
        this._isScanning = false;
        this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false);
        this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true);
    }
    static Get() {
        if (!TestDeviceManager._testManager) {
            TestDeviceManager._testManager = new TestDeviceManager();
        }
        return TestDeviceManager._testManager;
    }
    ConnectVibrationDevice() {
        this._testVibrationDevice.Connected = true;
        this.emit("deviceadded", this._testVibrationDevice);
    }
    ConnectLinearDevice() {
        this._testLinearDevice.Connected = true;
        this.emit("deviceadded", this._testLinearDevice);
    }
    StartScanning() {
        this._isScanning = true;
        if (!this._testVibrationDevice.Connected) {
            setTimeout(() => this.ConnectVibrationDevice(), 50);
        }
        if (!this._testLinearDevice.Connected) {
            setTimeout(() => this.ConnectLinearDevice(), 50);
        }
        setTimeout(() => this.StopScanning(), 100);
    }
    get VibrationDevice() {
        return this._testVibrationDevice;
    }
    get LinearDevice() {
        return this._testLinearDevice;
    }
    StopScanning() {
        this._isScanning = false;
        this.emit("scanningfinished");
    }
    get IsScanning() {
        return this._isScanning;
    }
}
TestDeviceManager._testManager = null;
exports.TestDeviceManager = TestDeviceManager;
//# sourceMappingURL=TestDeviceManager.js.map
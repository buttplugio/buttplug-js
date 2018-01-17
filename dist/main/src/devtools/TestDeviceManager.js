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
var events_1 = require("events");
var TestDevice_1 = require("./TestDevice");
var TestDeviceManager = /** @class */ (function (_super) {
    __extends(TestDeviceManager, _super);
    function TestDeviceManager() {
        var _this = _super.call(this) || this;
        _this._isScanning = false;
        _this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false);
        _this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true);
        console.log("Creating new test device manager!");
        return _this;
    }
    TestDeviceManager.Get = function () {
        if (!TestDeviceManager._testManager) {
            TestDeviceManager._testManager = new TestDeviceManager();
        }
        return TestDeviceManager._testManager;
    };
    TestDeviceManager.prototype.StartScanning = function () {
        var _this = this;
        this._isScanning = true;
        if (!this._testVibrationDevice.Connected) {
            this._testVibrationDevice.Connected = true;
            setTimeout(function () { return _this.emit("deviceadded", _this._testVibrationDevice); }, 50);
        }
        if (!this._testLinearDevice.Connected) {
            this._testLinearDevice.Connected = true;
            setTimeout(function () { return _this.emit("deviceadded", _this._testLinearDevice); }, 50);
        }
        setTimeout(function () { return _this.StopScanning(); }, 100);
    };
    Object.defineProperty(TestDeviceManager.prototype, "VibrationDevice", {
        get: function () {
            return this._testVibrationDevice;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestDeviceManager.prototype, "LinearDevice", {
        get: function () {
            return this._testLinearDevice;
        },
        enumerable: true,
        configurable: true
    });
    TestDeviceManager.prototype.StopScanning = function () {
        this._isScanning = false;
        this.emit("scanningfinished");
    };
    Object.defineProperty(TestDeviceManager.prototype, "IsScanning", {
        get: function () {
            return this._isScanning;
        },
        enumerable: true,
        configurable: true
    });
    TestDeviceManager._testManager = null;
    return TestDeviceManager;
}(events_1.EventEmitter));
exports.TestDeviceManager = TestDeviceManager;
//# sourceMappingURL=TestDeviceManager.js.map
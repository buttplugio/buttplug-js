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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Messages = require("../core/Messages");
var WebBluetoothDeviceManager_1 = require("./bluetooth/WebBluetoothDeviceManager");
var events_1 = require("events");
var ServerMessageHub_1 = require("./ServerMessageHub");
var Logging_1 = require("../core/Logging");
var DeviceManager = /** @class */ (function (_super) {
    __extends(DeviceManager, _super);
    function DeviceManager() {
        var _this = _super.call(this) || this;
        _this._subtypeManagers = [];
        _this._devices = new Map();
        _this._deviceCounter = 1;
        _this._logger = Logging_1.ButtplugLogger.Logger;
        _this.AddDeviceManager = function (aManager) {
            _this._subtypeManagers.push(aManager);
            aManager.addListener("deviceadded", _this.OnDeviceAdded);
            aManager.addListener("deviceremoved", _this.OnDeviceRemoved);
            aManager.addListener("scanningfinished", _this.OnScanningFinished);
        };
        _this.SendMessage = function (aMessage) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, _i, _b, manager, e_1, _c, _d, manager, deviceMsg, device;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        id = aMessage.Id;
                        _a = aMessage.constructor.name;
                        switch (_a) {
                            case "StartScanning": return [3 /*break*/, 1];
                            case "StopScanning": return [3 /*break*/, 8];
                            case "StopAllDevices": return [3 /*break*/, 9];
                            case "RequestDeviceList": return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 11];
                    case 1:
                        _i = 0, _b = this._subtypeManagers;
                        _e.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 7];
                        manager = _b[_i];
                        if (!!manager.IsScanning()) return [3 /*break*/, 6];
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, manager.StartScanning()];
                    case 4:
                        _e.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _e.sent();
                        return [2 /*return*/, new Messages.Error(e_1.message, Messages.ErrorClass.ERROR_DEVICE, id)];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, new Messages.Ok(id)];
                    case 8:
                        for (_c = 0, _d = this._subtypeManagers; _c < _d.length; _c++) {
                            manager = _d[_c];
                            if (manager.IsScanning()) {
                                manager.StopScanning();
                            }
                        }
                        return [2 /*return*/, new Messages.Ok(id)];
                    case 9:
                        this._devices.forEach(function (deviceObj, index) {
                            deviceObj.ParseMessage(new Messages.StopDeviceCmd());
                        });
                        return [2 /*return*/, new Messages.Ok(id)];
                    case 10: return [2 /*return*/, new Messages.DeviceList([], id)];
                    case 11:
                        deviceMsg = aMessage;
                        if (deviceMsg.DeviceIndex === undefined) {
                            return [2 /*return*/, this._logger.LogAndError("Message Type " + aMessage.constructor.name + " unhandled by this server.", Messages.ErrorClass.ERROR_MSG, id)];
                        }
                        if (!this._devices.has(deviceMsg.DeviceIndex)) {
                            return [2 /*return*/, this._logger.LogAndError("Device Index " + deviceMsg.DeviceIndex + " does not exist", Messages.ErrorClass.ERROR_DEVICE, id)];
                        }
                        device = this._devices.get(deviceMsg.DeviceIndex);
                        if (device.GetAllowedMessageTypes().indexOf(aMessage.constructor.name) < 0) {
                            return [2 /*return*/, this._logger.LogAndError("Device " + device.Name + " does not take message type " + aMessage.constructor.name, Messages.ErrorClass.ERROR_DEVICE, id)];
                        }
                        return [4 /*yield*/, device.ParseMessage(deviceMsg)];
                    case 12: return [2 /*return*/, _e.sent()];
                }
            });
        }); };
        _this.OnDeviceAdded = function (device) {
            _this._logger.Debug("Device Added: " + device.Name);
            var deviceIndex = _this._deviceCounter;
            _this._deviceCounter += 1;
            _this._devices.set(deviceIndex, device);
            device.addListener("deviceremoved", _this.OnDeviceRemoved);
            ServerMessageHub_1.ServerMessageHub.Instance.emitMessage(new Messages.DeviceAdded(deviceIndex, device.Name, device.GetAllowedMessageTypes()));
        };
        _this.OnDeviceRemoved = function (device) {
            _this._logger.Debug("Device Removed: " + device.Name);
            var deviceIndex = null;
            for (var _i = 0, _a = Array.from(_this._devices.entries()); _i < _a.length; _i++) {
                var entry = _a[_i];
                if (entry[1] === device) {
                    deviceIndex = entry[0];
                    break;
                }
            }
            if (deviceIndex === null) {
                return;
            }
            _this._devices.delete(deviceIndex);
            ServerMessageHub_1.ServerMessageHub.Instance.emitMessage(new Messages.DeviceRemoved(deviceIndex));
        };
        _this.OnScanningFinished = function () {
            for (var _i = 0, _a = _this._subtypeManagers; _i < _a.length; _i++) {
                var manager = _a[_i];
                if (manager.IsScanning()) {
                    return;
                }
            }
            ServerMessageHub_1.ServerMessageHub.Instance.emitMessage(new Messages.ScanningFinished());
        };
        _this._logger.Debug("Starting Device Manager");
        // If we have a bluetooth object on navigator, load the device manager
        if (typeof (window) !== "undefined" &&
            typeof (window.navigator) !== "undefined" &&
            navigator.bluetooth) {
            var manager = new WebBluetoothDeviceManager_1.WebBluetoothDeviceManager();
            manager.addListener("deviceadded", _this.OnDeviceAdded);
            manager.addListener("deviceremoved", _this.OnDeviceRemoved);
            _this._subtypeManagers.push(manager);
        }
        // TODO: If we have no managers by this point, throw, because we'll never load a device
        for (var _i = 0, _a = _this._subtypeManagers; _i < _a.length; _i++) {
            var manager = _a[_i];
            manager.addListener("scanningfinished", _this.OnScanningFinished);
        }
        return _this;
    }
    return DeviceManager;
}(events_1.EventEmitter));
exports.DeviceManager = DeviceManager;
//# sourceMappingURL=DeviceManager.js.map
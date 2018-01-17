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
var BluetoothDevices_1 = require("./BluetoothDevices");
var events_1 = require("events");
var WebBluetoothDevice_1 = require("./WebBluetoothDevice");
var WebBluetoothDeviceManager = /** @class */ (function (_super) {
    __extends(WebBluetoothDeviceManager, _super);
    function WebBluetoothDeviceManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OpenDevice = function (aDevice) { return __awaiter(_this, void 0, void 0, function () {
            var info, deviceInfo, _i, info_1, di, device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (aDevice === undefined) {
                            // TODO Throw here?
                            return [2 /*return*/];
                        }
                        info = BluetoothDevices_1.BluetoothDevices.GetDeviceInfo();
                        deviceInfo = null;
                        for (_i = 0, info_1 = info; _i < info_1.length; _i++) {
                            di = info_1[_i];
                            if (di.Names.indexOf(aDevice.name) >= 0) {
                                deviceInfo = di;
                                break;
                            }
                        }
                        if (deviceInfo === null) {
                            // TODO Throw here?
                            // We somehow got a device we don't know what to do with?
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, WebBluetoothDevice_1.WebBluetoothDevice.CreateDevice(deviceInfo, aDevice)];
                    case 1:
                        device = _a.sent();
                        this.emit("deviceadded", device);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    WebBluetoothDeviceManager.prototype.StartScanning = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, filters, _i, info_2, deviceInfo, _a, _b, deviceName, device, e_1, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        info = BluetoothDevices_1.BluetoothDevices.GetDeviceInfo();
                        filters = {
                            filters: new Array(),
                            optionalServices: new Array(),
                        };
                        for (_i = 0, info_2 = info; _i < info_2.length; _i++) {
                            deviceInfo = info_2[_i];
                            for (_a = 0, _b = deviceInfo.Names; _a < _b.length; _a++) {
                                deviceName = _b[_a];
                                filters.filters.push({ name: deviceName });
                            }
                            filters.optionalServices = filters.optionalServices.concat(deviceInfo.Services);
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (navigator.bluetooth).requestDevice(filters)];
                    case 2:
                        device = _c.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _c.sent();
                        this.emit("scanningfinished");
                        // This is the only way we have to check whether the user cancelled out of
                        // the dialog versus bluetooth radio not being available, as both errors
                        // are thrown as DOMExcpetion. Kill me.
                        if (e_1.message.indexOf("User cancelled") !== -1) {
                            return [2 /*return*/];
                        }
                        throw new Error("Bluetooth scanning interrupted. " +
                            "Either user cancelled out of dialog, or bluetooth radio is not available. Exception: " + e_1);
                    case 4:
                        _c.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.OpenDevice(device)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        e_2 = _c.sent();
                        this.emit("scanningfinished");
                        throw new Error("Cannot open device " + device.name + ": " + e_2);
                    case 7:
                        this.emit("scanningfinished");
                        return [2 /*return*/];
                }
            });
        });
    };
    WebBluetoothDeviceManager.prototype.StopScanning = function () {
        // noop. We can only scan via the browser dialog, and we can't cancel that from outside.
    };
    Object.defineProperty(WebBluetoothDeviceManager.prototype, "IsScanning", {
        get: function () {
            // noop.
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return WebBluetoothDeviceManager;
}(events_1.EventEmitter));
exports.WebBluetoothDeviceManager = WebBluetoothDeviceManager;
//# sourceMappingURL=WebBluetoothDeviceManager.js.map
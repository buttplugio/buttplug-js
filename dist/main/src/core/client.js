'use strict';
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
var events_1 = require("events");
var Messages = require("./messages");
var device_1 = require("./device");
var ButtplugClient = (function (_super) {
    __extends(ButtplugClient, _super);
    function ButtplugClient(aClientName) {
        var _this = _super.call(this) || this;
        _this._devices = new Map();
        _this._counter = 1;
        _this._waitingMsgs = new Map();
        _this.Connect = function (aUrl) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var res, rej, p;
            return __generator(this, function (_a) {
                this._ws = new WebSocket(aUrl);
                this._ws.addEventListener('message', function (ev) { _this.ParseIncomingMessage(ev); });
                p = new Promise(function (resolve, reject) { res = resolve; rej = reject; });
                this._ws.addEventListener('open', function (ev) { return __awaiter(_this, void 0, void 0, function () {
                    var msg;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.SendMessage(new Messages.RequestServerInfo(this._clientName))];
                            case 1:
                                msg = _a.sent();
                                switch (msg.getType()) {
                                    case 'ServerInfo':
                                        // TODO: Actually deal with ping timing, maybe store server name, do
                                        // something with message template version?
                                        res();
                                        break;
                                    case 'Error':
                                        rej();
                                        break;
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                this._ws.addEventListener('close', function (ev) { rej(ev); });
                return [2 /*return*/, p];
            });
        }); };
        _this.SendMsgExpectOk = function (aMsg) { return __awaiter(_this, void 0, void 0, function () {
            var res, rej, msg, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SendMessage(aMsg)];
                    case 1:
                        msg = _a.sent();
                        p = new Promise(function (resolve, reject) { res = resolve; rej = reject; });
                        switch (msg.getType()) {
                            case 'Ok':
                                res();
                                break;
                            default:
                                rej();
                                break;
                        }
                        return [2 /*return*/, p];
                }
            });
        }); };
        _this.RequestDeviceList = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var deviceList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SendMessage(new Messages.RequestDeviceList())];
                    case 1:
                        deviceList = (_a.sent());
                        deviceList.Devices.forEach(function (d) {
                            if (!_this._devices.has(d.DeviceIndex)) {
                                var device = device_1.Device.fromMsg(d);
                                _this._devices.set(d.DeviceIndex, device);
                                _this.emit('deviceadded', device);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.StartScanning = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SendMsgExpectOk(new Messages.StartScanning())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.StopScanning = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SendMsgExpectOk(new Messages.StopScanning())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.RequestLog = function (aLogLevel) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SendMsgExpectOk(new Messages.RequestLog(aLogLevel))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.ParseJSONMessage = function (aJSONMsg) {
            var msgs = Messages.FromJSON(aJSONMsg);
            msgs.forEach(function (x) {
                if (x.Id > 0 && _this._waitingMsgs.has(x.Id)) {
                    var res = _this._waitingMsgs.get(x.Id);
                    // We already checked for this via has, but typescript is bitching if I
                    // don't do it again.
                    if (res === undefined) {
                        return;
                    }
                    res(x);
                    return;
                }
                switch (x.constructor.name) {
                    case 'Log':
                        _this.emit('log', x);
                        break;
                    case 'DeviceAdded':
                        var added_msg = x;
                        var d = device_1.Device.fromMsg(added_msg);
                        _this._devices.set(added_msg.DeviceIndex, d);
                        _this.emit('deviceadded', d);
                        break;
                    case 'DeviceRemoved':
                        var removed_msg = x;
                        if (_this._devices.has(removed_msg.DeviceIndex)) {
                            var d_1 = _this._devices.get(removed_msg.DeviceIndex);
                            _this._devices.delete(removed_msg.DeviceIndex);
                            _this.emit('deviceremoved', d_1);
                        }
                        break;
                }
                ;
            });
        };
        _this.ParseIncomingMessage = function (aEvent) {
            if (typeof (aEvent.data) === 'string') {
                _this.ParseJSONMessage(aEvent.data);
            }
            else if (aEvent.data instanceof Blob) {
                var reader = new FileReader();
                reader.addEventListener('load', function (ev) { _this.OnReaderLoad(ev); });
                reader.readAsText(aEvent.data);
            }
        };
        _this._clientName = aClientName;
        return _this;
    }
    ButtplugClient.prototype.SendMessage = function (aMsg) {
        return __awaiter(this, void 0, void 0, function () {
            var res, msgPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aMsg.Id = this._counter;
                        msgPromise = new Promise(function (resolve) { res = resolve; });
                        this._waitingMsgs.set(this._counter, res);
                        this._counter += 1;
                        this._ws.send("[" + aMsg.toJSON() + "]");
                        return [4 /*yield*/, msgPromise];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ButtplugClient.prototype.getDevices = function () {
        var devices = [];
        this._devices.forEach(function (d, i) {
            devices.push(d);
        });
        return devices;
    };
    ButtplugClient.prototype.OnReaderLoad = function (aEvent) {
        this.ParseJSONMessage(aEvent.target.result);
    };
    ButtplugClient.prototype.SendDeviceMessage = function (aDevice, aDeviceMsg) {
        return __awaiter(this, void 0, void 0, function () {
            var dev;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dev = this._devices.get(aDevice.Index);
                        if (dev === undefined) {
                            return [2 /*return*/, Promise.reject(new Error("Device not available."))];
                        }
                        if (dev.AllowedMessages.indexOf(aDeviceMsg.getType()) == -1) {
                            return [2 /*return*/, Promise.reject(new Error("Device does not accept that message type."))];
                        }
                        aDeviceMsg.DeviceIndex = aDevice.Index;
                        return [4 /*yield*/, this.SendMsgExpectOk(aDeviceMsg)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ButtplugClient;
}(events_1.EventEmitter));
exports.ButtplugClient = ButtplugClient;
//# sourceMappingURL=client.js.map
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
var Logging_1 = require("../core/Logging");
var events_1 = require("events");
var Device_1 = require("../core/Device");
var ButtplugBrowserWebsocketConnector_1 = require("./ButtplugBrowserWebsocketConnector");
var ButtplugEmbeddedServerConnector_1 = require("./ButtplugEmbeddedServerConnector");
var Messages = require("../core/Messages");
var MessageUtils_1 = require("../core/MessageUtils");
var ButtplugClient = /** @class */ (function (_super) {
    __extends(ButtplugClient, _super);
    function ButtplugClient(aClientName) {
        if (aClientName === void 0) { aClientName = "Generic Buttplug Client"; }
        var _this = _super.call(this) || this;
        _this._pingTimer = null;
        _this._connector = null;
        _this._devices = new Map();
        _this._counter = 1;
        _this._waitingMsgs = new Map();
        _this._logger = Logging_1.ButtplugLogger.Logger;
        // TODO This should be set on schema load
        _this._messageVersion = 1;
        _this.ConnectWebsocket = function (aAddress) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logger.Info("ButtplugClient: Connecting to " + aAddress);
                        return [4 /*yield*/, this.Connect(new ButtplugBrowserWebsocketConnector_1.ButtplugBrowserWebsocketConnector(aAddress))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.ConnectLocal = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logger.Info("ButtplugClient: Connecting to In-Browser Server");
                        return [4 /*yield*/, this.Connect(new ButtplugEmbeddedServerConnector_1.ButtplugEmbeddedServerConnector())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.Connect = function (aConnector) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logger.Info("ButtplugClient: Connecting using " + aConnector.constructor.name);
                        return [4 /*yield*/, aConnector.Connect()];
                    case 1:
                        _a.sent();
                        this._connector = aConnector;
                        this._connector.addListener("message", this.ParseMessages);
                        this._connector.addListener("disconnect", this.DisconnectHandler);
                        return [4 /*yield*/, this.InitializeConnection()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        _this.RequestDeviceList = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var deviceList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.CheckConnector();
                        this._logger.Debug("ButtplugClient: ReceiveDeviceList called");
                        return [4 /*yield*/, this.SendMessage(new Messages.RequestDeviceList())];
                    case 1:
                        deviceList = (_a.sent());
                        deviceList.Devices.forEach(function (d) {
                            if (!_this._devices.has(d.DeviceIndex)) {
                                var device = Device_1.Device.fromMsg(d);
                                _this._logger.Debug("ButtplugClient: Adding Device: " + device);
                                _this._devices.set(d.DeviceIndex, device);
                                _this.emit("deviceadded", device);
                            }
                            else {
                                _this._logger.Debug("ButtplugClient: Device already added: " + d);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.StartScanning = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logger.Debug("ButtplugClient: StartScanning called");
                        return [4 /*yield*/, this.SendMsgExpectOk(new Messages.StartScanning())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.StopScanning = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logger.Debug("ButtplugClient: StopScanning called");
                        return [4 /*yield*/, this.SendMsgExpectOk(new Messages.StopScanning())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.RequestLog = function (aLogLevel) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logger.Debug("ButtplugClient: RequestLog called with level " + aLogLevel);
                        return [4 /*yield*/, this.SendMsgExpectOk(new Messages.RequestLog(aLogLevel))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.StopAllDevices = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._logger.Debug("ButtplugClient: StopAllDevices");
                        return [4 /*yield*/, this.SendMsgExpectOk(new Messages.StopAllDevices())];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.ParseMessages = function (aMsgs) {
            _this.ParseMessagesInternal(aMsgs);
        };
        _this.DisconnectHandler = function () {
            _this._logger.Info("ButtplugClient: Disconnect event receieved.");
            _this.emit("disconnect");
        };
        _this.InitializeConnection = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var msg, info, ping, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.CheckConnector();
                        return [4 /*yield*/, this.SendMessage(new Messages.RequestServerInfo(this._clientName, 1))];
                    case 1:
                        msg = _a.sent();
                        switch (msg.Type) {
                            case "ServerInfo": {
                                info = msg;
                                this._logger.Info("ButtplugClient: Connected to Server " + info.ServerName);
                                ping = msg.MaxPingTime;
                                if (ping > 0) {
                                    this._pingTimer = setInterval(function () {
                                        // If we've disconnected, stop trying to ping the server.
                                        if (!_this.Connected) {
                                            _this.ShutdownConnection();
                                            return;
                                        }
                                        _this.SendMessage(new Messages.Ping(_this._counter));
                                    }, Math.round(ping / 2));
                                }
                                return [2 /*return*/, true];
                            }
                            case "Error": {
                                err = msg;
                                this._logger.Error("ButtplugClient: Cannot connect to server. " + err.ErrorMessage);
                                this._connector.Disconnect();
                            }
                        }
                        return [2 /*return*/, false];
                }
            });
        }); };
        _this.ShutdownConnection = function () {
            if (_this._pingTimer !== null) {
                clearInterval(_this._pingTimer);
                _this._pingTimer = null;
            }
        };
        _this.SendMsgExpectOk = function (aMsg) { return __awaiter(_this, void 0, void 0, function () {
            var res, rej, msg, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SendMessage(aMsg)];
                    case 1:
                        msg = _a.sent();
                        p = new Promise(function (resolve, reject) { res = resolve; rej = reject; });
                        switch (msg.Type) {
                            case "Ok":
                                res();
                                break;
                            default:
                                rej(msg);
                                break;
                        }
                        return [2 /*return*/, p];
                }
            });
        }); };
        _this._clientName = aClientName;
        _this._logger.Debug("ButtplugClient: Client " + aClientName + " created.");
        return _this;
    }
    Object.defineProperty(ButtplugClient.prototype, "Connected", {
        get: function () {
            return this._connector !== null && this._connector.IsConnected();
        },
        enumerable: true,
        configurable: true
    });
    ButtplugClient.prototype.Disconnect = function () {
        this._logger.Debug("ButtplugClient: Disconnect called");
        this.CheckConnector();
        this.ShutdownConnection();
        this._connector.Disconnect();
    };
    ButtplugClient.prototype.getDevices = function () {
        // While this function doesn't actually send a message, if we don't have a
        // connector, we shouldn't have devices.
        this.CheckConnector();
        var devices = [];
        this._devices.forEach(function (d, i) {
            devices.push(d);
        });
        return devices;
    };
    ButtplugClient.prototype.SendDeviceMessage = function (aDevice, aDeviceMsg) {
        return __awaiter(this, void 0, void 0, function () {
            var dev;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.CheckConnector();
                        dev = this._devices.get(aDevice.Index);
                        if (dev === undefined) {
                            this._logger.Error("Device " + aDevice + " not available.");
                            return [2 /*return*/, Promise.reject(new Error("Device not available."))];
                        }
                        if (dev.AllowedMessages.indexOf(aDeviceMsg.Type) === -1) {
                            this._logger.Error("Device " + aDevice + " does not accept message type " + aDeviceMsg.Type + ".");
                            return [2 /*return*/, Promise.reject(new Error("Device " + aDevice + " does not accept message type " + aDeviceMsg.Type + "."))];
                        }
                        aDeviceMsg.DeviceIndex = aDevice.Index;
                        return [4 /*yield*/, this.SendMsgExpectOk(aDeviceMsg)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ButtplugClient.prototype.ParseMessagesInternal = function (aMsgs) {
        for (var _i = 0, aMsgs_1 = aMsgs; _i < aMsgs_1.length; _i++) {
            var x = aMsgs_1[_i];
            if (x.Id > 0 && this._waitingMsgs.has(x.Id)) {
                var res = this._waitingMsgs.get(x.Id);
                res(x);
                return;
            }
            switch (x.Type) {
                case "Log":
                    this.emit("log", x);
                    break;
                case "DeviceAdded":
                    var addedMsg = x;
                    var addedDevice = Device_1.Device.fromMsg(addedMsg);
                    this._devices.set(addedMsg.DeviceIndex, addedDevice);
                    this.emit("deviceadded", addedDevice);
                    break;
                case "DeviceRemoved":
                    var removedMsg = x;
                    if (this._devices.has(removedMsg.DeviceIndex)) {
                        var removedDevice = this._devices.get(removedMsg.DeviceIndex);
                        this._devices.delete(removedMsg.DeviceIndex);
                        this.emit("deviceremoved", removedDevice);
                    }
                    break;
                case "ScanningFinished":
                    this.emit("scanningfinished", x);
                    break;
            }
        }
    };
    ButtplugClient.prototype.SendMessage = function (aMsg) {
        return __awaiter(this, void 0, void 0, function () {
            var res, msgPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.CheckConnector();
                        // This will throw if our message is invalid
                        MessageUtils_1.CheckMessage(aMsg);
                        aMsg.Id = this._counter;
                        msgPromise = new Promise(function (resolve) { res = resolve; });
                        this._waitingMsgs.set(this._counter, res);
                        this._counter += 1;
                        this._connector.Send(aMsg);
                        return [4 /*yield*/, msgPromise];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ButtplugClient.prototype.CheckConnector = function () {
        if (!this.Connected) {
            throw new Error("ButtplugClient not connected");
        }
    };
    return ButtplugClient;
}(events_1.EventEmitter));
exports.ButtplugClient = ButtplugClient;
//# sourceMappingURL=Client.js.map
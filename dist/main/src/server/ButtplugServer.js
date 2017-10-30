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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Messages = require("../core/Messages");
var DeviceManager_1 = require("./DeviceManager");
var events_1 = require("events");
var ServerMessageHub_1 = require("./ServerMessageHub");
var Logging_1 = require("../core/Logging");
var ButtplugServer = /** @class */ (function (_super) {
    __extends(ButtplugServer, _super);
    function ButtplugServer(_serverName, _maxPingTime) {
        if (_serverName === void 0) { _serverName = "Buttplug JS Internal Server"; }
        if (_maxPingTime === void 0) { _maxPingTime = 0; }
        var _this = _super.call(this) || this;
        _this._serverName = _serverName;
        _this._maxPingTime = _maxPingTime;
        _this._pingTimedOut = false;
        _this._receivedRequestServerInfo = false;
        _this._logger = Logging_1.ButtplugLogger.Logger;
        _this._outgoingLogLevel = Logging_1.LogLevel.Off;
        _this.AddDeviceManager = function (aManager) {
            _this._deviceManager.AddDeviceManager(aManager);
        };
        _this.SendMessage = function (aMessage) { return __awaiter(_this, void 0, void 0, function () {
            var id, logmsg, testmsg;
            return __generator(this, function (_a) {
                id = aMessage.Id;
                this._logger.Trace("Got Message: " + aMessage);
                if (id === 0) {
                    return [2 /*return*/, this._logger.LogAndError("Message Id 0 is reserved for outgoing system messages. Please use another Id.", Messages.ErrorClass.ERROR_MSG, id)];
                }
                if (this._pingTimedOut) {
                    return [2 /*return*/, this._logger.LogAndError("Ping timed out.", Messages.ErrorClass.ERROR_MSG, id)];
                }
                if (!this._receivedRequestServerInfo && aMessage.constructor.name !== "RequestServerInfo") {
                    return [2 /*return*/, this._logger.LogAndError("RequestServerInfo must be first message received by server.", Messages.ErrorClass.ERROR_INIT, id)];
                }
                switch (aMessage.constructor.name) {
                    case "RequestLog":
                        logmsg = aMessage;
                        if (logmsg.LogLevel === Logging_1.LogLevel[Logging_1.LogLevel.Off]) {
                            this._logger.removeListener("log", this.OnLogMessage);
                        }
                        else if (this._outgoingLogLevel === Logging_1.LogLevel.Off) {
                            this._logger.addListener("log", this.OnLogMessage);
                        }
                        this._outgoingLogLevel = Logging_1.LogLevel[logmsg.LogLevel];
                        return [2 /*return*/, new Messages.Ok(logmsg.Id)];
                    case "Ping":
                        // TODO: Implement Ping
                        return [2 /*return*/, new Messages.Ok(aMessage.Id)];
                    case "RequestServerInfo":
                        this._receivedRequestServerInfo = true;
                        // TODO: Figure out how to encode this from the package version?
                        // TODO: Figure out how to pull message schema version.
                        return [2 /*return*/, new Messages.ServerInfo(0, 0, 9, 1, this._maxPingTime, this._serverName, id)];
                    case "Test":
                        testmsg = aMessage;
                        return [2 /*return*/, new Messages.Test(testmsg.TestString, aMessage.Id)];
                }
                return [2 /*return*/, this._deviceManager.SendMessage(aMessage)];
            });
        }); };
        _this.Shutdown = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
        _this.OnLogMessage = function (aMsg) {
            if (aMsg.LogLevel > _this._outgoingLogLevel) {
                return;
            }
            _this.OnOutgoingMessage(new Messages.Log(Logging_1.LogLevel[aMsg.LogLevel], aMsg.Message));
        };
        _this.OnOutgoingMessage = function (aMsg) {
            _this.emit("message", aMsg);
        };
        _this._logger.LogLevel = Logging_1.LogLevel.Debug;
        _this._logger.SetConsoleLogging(true);
        _this._logger.Info("Starting Buttplug Server: " + _this._serverName);
        _this._deviceManager = new DeviceManager_1.DeviceManager();
        ServerMessageHub_1.ServerMessageHub.Instance.addListener("message", _this.OnOutgoingMessage);
        return _this;
    }
    ButtplugServer.CanUseBluetooth = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (navigator === undefined || !("bluetooth" in navigator)) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, navigator.bluetooth.getAvailability()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    return ButtplugServer;
}(events_1.EventEmitter));
exports.ButtplugServer = ButtplugServer;
//# sourceMappingURL=ButtplugServer.js.map
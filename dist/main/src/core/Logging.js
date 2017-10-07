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
var Messages = require("./Messages");
// Log levels must match order and name in Buttplug spec
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Off"] = 0] = "Off";
    LogLevel[LogLevel["Fatal"] = 1] = "Fatal";
    LogLevel[LogLevel["Error"] = 2] = "Error";
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    LogLevel[LogLevel["Info"] = 4] = "Info";
    LogLevel[LogLevel["Debug"] = 5] = "Debug";
    LogLevel[LogLevel["Trace"] = 6] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var LogMessage = /** @class */ (function () {
    function LogMessage(_logMessage, _logLevel) {
        this._logMessage = _logMessage;
        this._logLevel = _logLevel;
        var a = new Date();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        this._timestamp = hour + ":" + min + ":" + sec;
    }
    Object.defineProperty(LogMessage.prototype, "Message", {
        get: function () {
            return this._logMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogMessage.prototype, "LogLevel", {
        get: function () {
            return this._logLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogMessage.prototype, "Timestamp", {
        get: function () {
            return this._timestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogMessage.prototype, "FormattedMessage", {
        get: function () {
            return LogLevel[this._logLevel] + " : " + this._timestamp + " : " + this._logMessage;
        },
        enumerable: true,
        configurable: true
    });
    return LogMessage;
}());
exports.LogMessage = LogMessage;
var ButtplugLogger = /** @class */ (function (_super) {
    __extends(ButtplugLogger, _super);
    function ButtplugLogger() {
        var _this = _super.call(this) || this;
        _this._logMessages = [];
        _this._shouldTimestamp = true;
        _this._logLimit = 1000;
        _this._logToConsole = false;
        _this._maximumLogLevel = LogLevel.Off;
        return _this;
    }
    Object.defineProperty(ButtplugLogger, "Logger", {
        get: function () {
            if (ButtplugLogger._sLogger === null) {
                ButtplugLogger._sLogger = new ButtplugLogger();
            }
            return this._sLogger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtplugLogger.prototype, "LogLevel", {
        get: function () {
            return this._maximumLogLevel;
        },
        set: function (aLogLevel) {
            this._maximumLogLevel = aLogLevel;
        },
        enumerable: true,
        configurable: true
    });
    ButtplugLogger.prototype.LogAndError = function (aMsg, aErrorClass, aMsgId) {
        this.Error(aMsg);
        return new Messages.Error(aMsg, aErrorClass, aMsgId);
    };
    ButtplugLogger.prototype.SetConsoleLogging = function (aShouldLog) {
        this._logToConsole = aShouldLog;
    };
    ButtplugLogger.prototype.Fatal = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Fatal);
    };
    ButtplugLogger.prototype.Error = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Error);
    };
    ButtplugLogger.prototype.Warn = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Warn);
    };
    ButtplugLogger.prototype.Info = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Info);
    };
    ButtplugLogger.prototype.Debug = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Debug);
    };
    ButtplugLogger.prototype.Trace = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Trace);
    };
    ButtplugLogger.prototype.AddLogMessage = function (aMsg, aLevel) {
        if (aLevel > this._maximumLogLevel) {
            return;
        }
        if (this._logMessages.length > this._logLimit) {
            this._logMessages.shift();
        }
        var msg = new LogMessage(aMsg, aLevel);
        if (this._logToConsole) {
            console.log(msg.FormattedMessage);
        }
        this._logMessages.push(new LogMessage(aMsg, aLevel));
        this.emit("log", msg);
    };
    ButtplugLogger._sLogger = null;
    return ButtplugLogger;
}(events_1.EventEmitter));
exports.ButtplugLogger = ButtplugLogger;
//# sourceMappingURL=Logging.js.map
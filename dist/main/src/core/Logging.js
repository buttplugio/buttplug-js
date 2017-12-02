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
/**
 * Enumeration of log levels for LogMessage message types. Log levels must match
 * order and name specified in LogMessage portion of the Buttplug protocol spec.
 */
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
/**
 * Representation of log messages for the internal logging utility.
 */
var LogMessage = /** @class */ (function () {
    /**
     * @param logMessage Log message.
     * @param logLevel: Log severity level.
     */
    function LogMessage(logMessage, logLevel) {
        var a = new Date();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        this.timestamp = hour + ":" + min + ":" + sec;
        this.logMessage = logMessage;
        this.logLevel = logLevel;
    }
    Object.defineProperty(LogMessage.prototype, "Message", {
        /**
         * Returns the log message.
         */
        get: function () {
            return this.logMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogMessage.prototype, "LogLevel", {
        /**
         * Returns the log message level.
         */
        get: function () {
            return this.logLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogMessage.prototype, "Timestamp", {
        /**
         * Returns the log message timestamp.
         */
        get: function () {
            return this.timestamp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LogMessage.prototype, "FormattedMessage", {
        /**
         * Returns a formatted string with timestamp, level, and message.
         */
        get: function () {
            return LogLevel[this.logLevel] + " : " + this.timestamp + " : " + this.logMessage;
        },
        enumerable: true,
        configurable: true
    });
    return LogMessage;
}());
exports.LogMessage = LogMessage;
/**
 * Simple, global logging utility for the Buttplug client and server. Keeps an
 * internal static reference to an instance of itself (singleton pattern,
 * basically), and allows message logging throughout the module.
 */
var ButtplugLogger = /** @class */ (function (_super) {
    __extends(ButtplugLogger, _super);
    /**
     * Constructor. Can only be called internally since we regulate ButtplugLogger
     * ownership.
     */
    function ButtplugLogger() {
        var _this = _super.call(this) || this;
        /** Array of stored log messages */
        _this.logMessages = [];
        /** Size limit of logMessages array */
        _this.logLimit = 1000;
        /** If true, call console.log on all new log messages */
        _this.logToConsole = false;
        /** If logToConsole is true, sets maximum log level to log to console */
        _this.maximumLogLevel = LogLevel.Off;
        return _this;
    }
    Object.defineProperty(ButtplugLogger, "Logger", {
        /**
         * Returns the stored static instance of the logger, creating one if it
         * doesn't currently exist.
         */
        get: function () {
            if (ButtplugLogger.sLogger === undefined) {
                ButtplugLogger.sLogger = new ButtplugLogger();
            }
            return this.sLogger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtplugLogger.prototype, "MaximumLogLevel", {
        /**
         * Set the maximum log level to output to console.
         */
        get: function () {
            return this.maximumLogLevel;
        },
        /**
         * Get the maximum log level to output to console.
         */
        set: function (aLogLevel) {
            this.maximumLogLevel = aLogLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Log a message, then create a Error buttplug message with the log message.
     * Used when an operation has errored out and status needs to be both logged
     * and returned to the client as an Error Message type.
     */
    ButtplugLogger.prototype.LogAndError = function (aMsg, aErrorClass, aMsgId) {
        this.Error(aMsg);
        return new Messages.Error(aMsg, aErrorClass, aMsgId);
    };
    /**
     * Sets whether log messages are logged to the web console.
     */
    ButtplugLogger.prototype.SetConsoleLogging = function (aShouldLog) {
        this.logToConsole = aShouldLog;
    };
    /**
     * Log new message at Fatal level.
     */
    ButtplugLogger.prototype.Fatal = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Fatal);
    };
    /**
     * Log new message at Error level.
     */
    ButtplugLogger.prototype.Error = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Error);
    };
    /**
     * Log new message at Warn level.
     */
    ButtplugLogger.prototype.Warn = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Warn);
    };
    /**
     * Log new message at Info level.
     */
    ButtplugLogger.prototype.Info = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Info);
    };
    /**
     * Log new message at Debug level.
     */
    ButtplugLogger.prototype.Debug = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Debug);
    };
    /**
     * Log new message at Trace level.
     */
    ButtplugLogger.prototype.Trace = function (aMsg) {
        this.AddLogMessage(aMsg, LogLevel.Trace);
    };
    /**
     * Checks to see if message should be logged, and if so, adds message to the
     * log buffer. May also print message and emit event.
     */
    ButtplugLogger.prototype.AddLogMessage = function (aMsg, aLevel) {
        if (aLevel > this.maximumLogLevel) {
            return;
        }
        if (this.logMessages.length > this.logLimit) {
            this.logMessages.shift();
        }
        var msg = new LogMessage(aMsg, aLevel);
        if (this.logToConsole) {
            console.log(msg.FormattedMessage);
        }
        this.logMessages.push(new LogMessage(aMsg, aLevel));
        this.emit("log", msg);
    };
    /** Singleton instance for the logger */
    ButtplugLogger.sLogger = undefined;
    return ButtplugLogger;
}(events_1.EventEmitter));
exports.ButtplugLogger = ButtplugLogger;
//# sourceMappingURL=Logging.js.map
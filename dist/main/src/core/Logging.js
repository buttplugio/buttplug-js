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
var ButtplugLogLevel;
(function (ButtplugLogLevel) {
    ButtplugLogLevel[ButtplugLogLevel["Off"] = 0] = "Off";
    ButtplugLogLevel[ButtplugLogLevel["Fatal"] = 1] = "Fatal";
    ButtplugLogLevel[ButtplugLogLevel["Error"] = 2] = "Error";
    ButtplugLogLevel[ButtplugLogLevel["Warn"] = 3] = "Warn";
    ButtplugLogLevel[ButtplugLogLevel["Info"] = 4] = "Info";
    ButtplugLogLevel[ButtplugLogLevel["Debug"] = 5] = "Debug";
    ButtplugLogLevel[ButtplugLogLevel["Trace"] = 6] = "Trace";
})(ButtplugLogLevel = exports.ButtplugLogLevel || (exports.ButtplugLogLevel = {}));
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
            return ButtplugLogLevel[this.logLevel] + " : " + this.timestamp + " : " + this.logMessage;
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
        /** Sets maximum log level to log to console */
        _this.maximumConsoleLogLevel = ButtplugLogLevel.Off;
        /** Sets maximum log level for all log messages */
        _this.maximumEventLogLevel = ButtplugLogLevel.Off;
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
    Object.defineProperty(ButtplugLogger.prototype, "MaximumConsoleLogLevel", {
        /**
         * Set the maximum log level to output to console.
         */
        get: function () {
            return this.maximumConsoleLogLevel;
        },
        /**
         * Get the maximum log level to output to console.
         */
        set: function (aButtplugLogLevel) {
            this.maximumConsoleLogLevel = aButtplugLogLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ButtplugLogger.prototype, "MaximumEventLogLevel", {
        /**
         * Set the global maximum log level
         */
        get: function () {
            return this.maximumEventLogLevel;
        },
        /**
         * Get the global maximum log level
         */
        set: function (aLogLevel) {
            this.maximumEventLogLevel = aLogLevel;
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
     * Log new message at Fatal level.
     */
    ButtplugLogger.prototype.Fatal = function (aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Fatal);
    };
    /**
     * Log new message at Error level.
     */
    ButtplugLogger.prototype.Error = function (aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Error);
    };
    /**
     * Log new message at Warn level.
     */
    ButtplugLogger.prototype.Warn = function (aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Warn);
    };
    /**
     * Log new message at Info level.
     */
    ButtplugLogger.prototype.Info = function (aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Info);
    };
    /**
     * Log new message at Debug level.
     */
    ButtplugLogger.prototype.Debug = function (aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Debug);
    };
    /**
     * Log new message at Trace level.
     */
    ButtplugLogger.prototype.Trace = function (aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Trace);
    };
    /**
     * Checks to see if message should be logged, and if so, adds message to the
     * log buffer. May also print message and emit event.
     */
    ButtplugLogger.prototype.AddLogMessage = function (aMsg, aLevel) {
        // If nothing wants the log message we have, ignore it.
        if (aLevel > this.maximumEventLogLevel && aLevel > this.maximumConsoleLogLevel) {
            return;
        }
        var msg = new LogMessage(aMsg, aLevel);
        // Clients and console logging may have different needs. For instance, it
        // could be that the client requests trace level, while all we want in the
        // console is info level. This makes sure the client can't also spam the
        // console.
        if (aLevel <= this.maximumConsoleLogLevel) {
            console.log(msg.FormattedMessage);
        }
        if (aLevel <= this.maximumEventLogLevel) {
            this.emit("log", msg);
        }
    };
    /** Singleton instance for the logger */
    ButtplugLogger.sLogger = undefined;
    return ButtplugLogger;
}(events_1.EventEmitter));
exports.ButtplugLogger = ButtplugLogger;
//# sourceMappingURL=Logging.js.map
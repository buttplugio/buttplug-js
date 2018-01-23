"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Messages = require("./Messages");
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
class LogMessage {
    /**
     * @param logMessage Log message.
     * @param logLevel: Log severity level.
     */
    constructor(logMessage, logLevel) {
        const a = new Date();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        this.timestamp = `${hour}:${min}:${sec}`;
        this.logMessage = logMessage;
        this.logLevel = logLevel;
    }
    /**
     * Returns the log message.
     */
    get Message() {
        return this.logMessage;
    }
    /**
     * Returns the log message level.
     */
    get LogLevel() {
        return this.logLevel;
    }
    /**
     * Returns the log message timestamp.
     */
    get Timestamp() {
        return this.timestamp;
    }
    /**
     * Returns a formatted string with timestamp, level, and message.
     */
    get FormattedMessage() {
        return `${ButtplugLogLevel[this.logLevel]} : ${this.timestamp} : ${this.logMessage}`;
    }
}
exports.LogMessage = LogMessage;
/**
 * Simple, global logging utility for the Buttplug client and server. Keeps an
 * internal static reference to an instance of itself (singleton pattern,
 * basically), and allows message logging throughout the module.
 */
class ButtplugLogger extends events_1.EventEmitter {
    /**
     * Constructor. Can only be called internally since we regulate ButtplugLogger
     * ownership.
     */
    constructor() {
        super();
        /** Sets maximum log level to log to console */
        this.maximumConsoleLogLevel = ButtplugLogLevel.Off;
        /** Sets maximum log level for all log messages */
        this.maximumEventLogLevel = ButtplugLogLevel.Off;
    }
    /**
     * Returns the stored static instance of the logger, creating one if it
     * doesn't currently exist.
     */
    static get Logger() {
        if (ButtplugLogger.sLogger === undefined) {
            ButtplugLogger.sLogger = new ButtplugLogger();
        }
        return this.sLogger;
    }
    /**
     * Set the maximum log level to output to console.
     */
    get MaximumConsoleLogLevel() {
        return this.maximumConsoleLogLevel;
    }
    /**
     * Get the maximum log level to output to console.
     */
    set MaximumConsoleLogLevel(aButtplugLogLevel) {
        this.maximumConsoleLogLevel = aButtplugLogLevel;
    }
    /**
     * Set the global maximum log level
     */
    get MaximumEventLogLevel() {
        return this.maximumEventLogLevel;
    }
    /**
     * Get the global maximum log level
     */
    set MaximumEventLogLevel(aLogLevel) {
        this.maximumEventLogLevel = aLogLevel;
    }
    /**
     * Log a message, then create a Error buttplug message with the log message.
     * Used when an operation has errored out and status needs to be both logged
     * and returned to the client as an Error Message type.
     */
    LogAndError(aMsg, aErrorClass, aMsgId) {
        this.Error(aMsg);
        return new Messages.Error(aMsg, aErrorClass, aMsgId);
    }
    /**
     * Log new message at Fatal level.
     */
    Fatal(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Fatal);
    }
    /**
     * Log new message at Error level.
     */
    Error(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Error);
    }
    /**
     * Log new message at Warn level.
     */
    Warn(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Warn);
    }
    /**
     * Log new message at Info level.
     */
    Info(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Info);
    }
    /**
     * Log new message at Debug level.
     */
    Debug(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Debug);
    }
    /**
     * Log new message at Trace level.
     */
    Trace(aMsg) {
        this.AddLogMessage(aMsg, ButtplugLogLevel.Trace);
    }
    /**
     * Checks to see if message should be logged, and if so, adds message to the
     * log buffer. May also print message and emit event.
     */
    AddLogMessage(aMsg, aLevel) {
        // If nothing wants the log message we have, ignore it.
        if (aLevel > this.maximumEventLogLevel && aLevel > this.maximumConsoleLogLevel) {
            return;
        }
        const msg = new LogMessage(aMsg, aLevel);
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
    }
}
/** Singleton instance for the logger */
ButtplugLogger.sLogger = undefined;
exports.ButtplugLogger = ButtplugLogger;
//# sourceMappingURL=Logging.js.map
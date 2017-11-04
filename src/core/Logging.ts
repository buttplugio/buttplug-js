import { EventEmitter } from "events";
import * as Messages from "./Messages";

/**
 * Enumeration of log levels for LogMessage message types. Log levels must match
 * order and name specified in LogMessage portion of the Buttplug protocol spec.
 */
export enum LogLevel {
  Off,
  Fatal,
  Error,
  Warn,
  Info,
  Debug,
  Trace,
}

/**
 * Representation of log messages for the internal logging utility.
 */
export class LogMessage {
  /** Timestamp for the log message */
  private timestamp: string;

  /** Log Message */
  private logMessage: string;

  /** Log Level */
  private logLevel: LogLevel;

  /**
   * @param logMessage Log message.
   * @param logLevel: Log severity level.
   */
  public constructor(logMessage: string,
                     logLevel: LogLevel) {
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
  public get Message() {
    return this.logMessage;
  }

  /**
   * Returns the log message level.
   */
  public get LogLevel() {
    return this.logLevel;
  }

  /**
   * Returns the log message timestamp.
   */
  public get Timestamp() {
    return this.timestamp;
  }

  /**
   * Returns a formatted string with timestamp, level, and message.
   */
  public get FormattedMessage() {
    return `${LogLevel[this.logLevel]} : ${this.timestamp} : ${this.logMessage}`;
  }
}

/**
 * Simple, global logging utility for the Buttplug client and server. Keeps an
 * internal static reference to an instance of itself (singleton pattern,
 * basically), and allows message logging throughout the module.
 */
export class ButtplugLogger extends EventEmitter {
  /** Singleton instance for the logger */
  protected static sLogger: ButtplugLogger | undefined = undefined;
  /** Array of stored log messages */
  protected logMessages: LogMessage[] = [];
  /** Size limit of logMessages array */
  protected logLimit: number = 1000;
  /** If true, call console.log on all new log messages */
  protected logToConsole: boolean = false;
  /** If logToConsole is true, sets maximum log level to log to console */
  protected maximumLogLevel: LogLevel = LogLevel.Off;

  /**
   * Returns the stored static instance of the logger, creating one if it
   * doesn't currently exist.
   */
  public static get Logger(): ButtplugLogger {
    if (ButtplugLogger.sLogger === undefined) {
      ButtplugLogger.sLogger = new ButtplugLogger();
    }
    return this.sLogger!;
  }

  /**
   * Constructor. Can only be called internally since we regulate ButtplugLogger
   * ownership.
   */
  protected constructor() {
    super();
  }

  /**
   * Set the maximum log level to output to console.
   */
  public get MaximumLogLevel() {
    return this.maximumLogLevel;
  }

  /**
   * Get the maximum log level to output to console.
   */
  public set MaximumLogLevel(aLogLevel: LogLevel) {
    this.maximumLogLevel = aLogLevel;
  }

  /**
   * Log a message, then create a Error buttplug message with the log message.
   * Used when an operation has errored out and status needs to be both logged
   * and returned to the client as an Error Message type.
   */
  public LogAndError(aMsg: string, aErrorClass: Messages.ErrorClass, aMsgId: number): Messages.ButtplugMessage {
    this.Error(aMsg);
    return new Messages.Error(aMsg, aErrorClass, aMsgId);
  }

  /**
   * Sets whether log messages are logged to the web console.
   */
  public SetConsoleLogging(aShouldLog: boolean) {
    this.logToConsole = aShouldLog;
  }

  /**
   * Log new message at Fatal level.
   */
  public Fatal(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Fatal);
  }

  /**
   * Log new message at Error level.
   */
  public Error(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Error);
  }

  /**
   * Log new message at Warn level.
   */
  public Warn(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Warn);
  }

  /**
   * Log new message at Info level.
   */
  public Info(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Info);
  }

  /**
   * Log new message at Debug level.
   */
  public Debug(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Debug);
  }

  /**
   * Log new message at Trace level.
   */
  public Trace(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Trace);
  }

  /**
   * Checks to see if message should be logged, and if so, adds message to the
   * log buffer. May also print message and emit event.
   */
  protected AddLogMessage(aMsg: string, aLevel: LogLevel) {
    if (aLevel > this.maximumLogLevel) {
      return;
    }
    if (this.logMessages.length > this.logLimit) {
      this.logMessages.shift();
    }
    const msg = new LogMessage(aMsg, aLevel);
    if (this.logToConsole) {
      console.log(msg.FormattedMessage);
    }
    this.logMessages.push(new LogMessage(aMsg, aLevel));
    this.emit("log", msg);
  }
}

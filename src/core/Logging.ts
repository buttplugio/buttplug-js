import { EventEmitter } from "events";
import * as Messages from "./Messages";

/**
 * Enumeration of log levels for LogMessage message types. Log levels must match
 * order and name specified in LogMessage portion of the Buttplug protocol spec.
 */
export enum ButtplugLogLevel {
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
  private logLevel: ButtplugLogLevel;

  /**
   * @param logMessage Log message.
   * @param logLevel: Log severity level.
   */
  public constructor(logMessage: string,
                     logLevel: ButtplugLogLevel) {
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
    return `${ButtplugLogLevel[this.logLevel]} : ${this.timestamp} : ${this.logMessage}`;
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
  /** Sets maximum log level to log to console */
  protected maximumConsoleLogLevel: ButtplugLogLevel = ButtplugLogLevel.Off;
  /** Sets maximum log level for all log messages */
  protected maximumEventLogLevel: ButtplugLogLevel = ButtplugLogLevel.Off;

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
  public get MaximumConsoleLogLevel() {
    return this.maximumConsoleLogLevel;
  }

  /**
   * Get the maximum log level to output to console.
   */
  public set MaximumConsoleLogLevel(aButtplugLogLevel: ButtplugLogLevel) {
    this.maximumConsoleLogLevel = aButtplugLogLevel;
  }

  /**
   * Set the global maximum log level
   */
  public get MaximumEventLogLevel() {
    return this.maximumEventLogLevel;
  }

  /**
   * Get the global maximum log level
   */
  public set MaximumEventLogLevel(aLogLevel: ButtplugLogLevel) {
    this.maximumEventLogLevel = aLogLevel;
  }

  /**
   * Log new message at Fatal level.
   */
  public Fatal(aMsg: string) {
    this.AddLogMessage(aMsg, ButtplugLogLevel.Fatal);
  }

  /**
   * Log new message at Error level.
   */
  public Error(aMsg: string) {
    this.AddLogMessage(aMsg, ButtplugLogLevel.Error);
  }

  /**
   * Log new message at Warn level.
   */
  public Warn(aMsg: string) {
    this.AddLogMessage(aMsg, ButtplugLogLevel.Warn);
  }

  /**
   * Log new message at Info level.
   */
  public Info(aMsg: string) {
    this.AddLogMessage(aMsg, ButtplugLogLevel.Info);
  }

  /**
   * Log new message at Debug level.
   */
  public Debug(aMsg: string) {
    this.AddLogMessage(aMsg, ButtplugLogLevel.Debug);
  }

  /**
   * Log new message at Trace level.
   */
  public Trace(aMsg: string) {
    this.AddLogMessage(aMsg, ButtplugLogLevel.Trace);
  }

  /**
   * Checks to see if message should be logged, and if so, adds message to the
   * log buffer. May also print message and emit event.
   */
  protected AddLogMessage(aMsg: string, aLevel: ButtplugLogLevel) {
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

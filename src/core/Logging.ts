/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { EventEmitter } from 'eventemitter3';

export enum ButtplugLogLevel {
  Off,
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
  public constructor(logMessage: string, logLevel: ButtplugLogLevel) {
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
    return `${ButtplugLogLevel[this.logLevel]} : ${this.timestamp} : ${
      this.logMessage
    }`;
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
  public set MaximumConsoleLogLevel(buttplugLogLevel: ButtplugLogLevel) {
    this.maximumConsoleLogLevel = buttplugLogLevel;
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
  public set MaximumEventLogLevel(logLevel: ButtplugLogLevel) {
    this.maximumEventLogLevel = logLevel;
  }

  /**
   * Log new message at Error level.
   */
  public Error(msg: string) {
    this.AddLogMessage(msg, ButtplugLogLevel.Error);
  }

  /**
   * Log new message at Warn level.
   */
  public Warn(msg: string) {
    this.AddLogMessage(msg, ButtplugLogLevel.Warn);
  }

  /**
   * Log new message at Info level.
   */
  public Info(msg: string) {
    this.AddLogMessage(msg, ButtplugLogLevel.Info);
  }

  /**
   * Log new message at Debug level.
   */
  public Debug(msg: string) {
    this.AddLogMessage(msg, ButtplugLogLevel.Debug);
  }

  /**
   * Log new message at Trace level.
   */
  public Trace(msg: string) {
    this.AddLogMessage(msg, ButtplugLogLevel.Trace);
  }

  /**
   * Checks to see if message should be logged, and if so, adds message to the
   * log buffer. May also print message and emit event.
   */
  protected AddLogMessage(msg: string, level: ButtplugLogLevel) {
    // If nothing wants the log message we have, ignore it.
    if (
      level > this.maximumEventLogLevel &&
      level > this.maximumConsoleLogLevel
    ) {
      return;
    }
    const logMsg = new LogMessage(msg, level);
    // Clients and console logging may have different needs. For instance, it
    // could be that the client requests trace level, while all we want in the
    // console is info level. This makes sure the client can't also spam the
    // console.
    if (level <= this.maximumConsoleLogLevel) {
      console.log(logMsg.FormattedMessage);
    }
    if (level <= this.maximumEventLogLevel) {
      this.emit('log', logMsg);
    }
  }
}

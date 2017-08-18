import { EventEmitter } from "events";
import * as Messages from "./Messages";

// Log levels must match order and name in Buttplug spec
export enum LogLevel {
  Off,
  Fatal,
  Error,
  Warn,
  Info,
  Debug,
  Trace,
}

export class LogMessage {
  private _timestamp: string;

  public constructor(private _logMessage: string,
                     private _logLevel: LogLevel) {
    const a = new Date();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    this._timestamp = `${hour}:${min}:${sec}`;
  }

  public get Message() {
    return this._logMessage;
  }

  public get LogLevel() {
    return this._logLevel;
  }

  public get Timestamp() {
    return this._timestamp;
  }

  public get FormattedMessage() {
    return `${LogLevel[this._logLevel]} : ${this._timestamp} : ${this._logMessage}`;
  }
}

export class ButtplugLogger extends EventEmitter {
  protected static _sLogger: ButtplugLogger | null = null;
  protected _logMessages: LogMessage[] = [];
  protected _shouldTimestamp: boolean = true;
  protected _logLimit: number = 1000;
  protected _logToConsole: boolean = false;
  protected _maximumLogLevel: LogLevel = LogLevel.Off;

  public static get Logger(): ButtplugLogger {
    if (ButtplugLogger._sLogger === null) {
      ButtplugLogger._sLogger = new ButtplugLogger();
    }
    return this._sLogger!;
  }

  protected constructor() {
    super();
  }

  public get LogLevel() {
    return this._maximumLogLevel;
  }

  public set LogLevel(aLogLevel: LogLevel) {
    this._maximumLogLevel = aLogLevel;
  }

  public LogAndError(aMsg: string, aErrorClass: Messages.ErrorClass, aMsgId: number): Messages.ButtplugMessage {
    this.Error(aMsg);
    return new Messages.Error(aMsg, aErrorClass, aMsgId);
  }

  public SetConsoleLogging(aShouldLog: boolean) {
    this._logToConsole = aShouldLog;
  }

  public Fatal(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Fatal);
  }

  public Error(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Error);
  }

  public Warn(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Warn);
  }

  public Info(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Info);
  }

  public Debug(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Debug);
  }

  public Trace(aMsg: string) {
    this.AddLogMessage(aMsg, LogLevel.Trace);
  }

  protected AddLogMessage(aMsg: string, aLevel: LogLevel) {
    if (aLevel > this._maximumLogLevel) {
      return;
    }
    if (this._logMessages.length > this._logLimit) {
      this._logMessages.shift();
    }
    const msg = new LogMessage(aMsg, aLevel);
    if (this._logToConsole) {
      console.log(msg.FormattedMessage);
    }
    this._logMessages.push(new LogMessage(aMsg, aLevel));
    this.emit("log", msg);
  }
}

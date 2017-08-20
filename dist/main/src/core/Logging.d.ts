/// <reference types="node" />
import { EventEmitter } from "events";
import * as Messages from "./Messages";
export declare enum LogLevel {
    Off = 0,
    Fatal = 1,
    Error = 2,
    Warn = 3,
    Info = 4,
    Debug = 5,
    Trace = 6,
}
export declare class LogMessage {
    private _logMessage;
    private _logLevel;
    private _timestamp;
    constructor(_logMessage: string, _logLevel: LogLevel);
    readonly Message: string;
    readonly LogLevel: LogLevel;
    readonly Timestamp: string;
    readonly FormattedMessage: string;
}
export declare class ButtplugLogger extends EventEmitter {
    protected static _sLogger: ButtplugLogger | null;
    protected _logMessages: LogMessage[];
    protected _shouldTimestamp: boolean;
    protected _logLimit: number;
    protected _logToConsole: boolean;
    protected _maximumLogLevel: LogLevel;
    static readonly Logger: ButtplugLogger;
    protected constructor();
    LogLevel: LogLevel;
    LogAndError(aMsg: string, aErrorClass: Messages.ErrorClass, aMsgId: number): Messages.ButtplugMessage;
    SetConsoleLogging(aShouldLog: boolean): void;
    Fatal(aMsg: string): void;
    Error(aMsg: string): void;
    Warn(aMsg: string): void;
    Info(aMsg: string): void;
    Debug(aMsg: string): void;
    Trace(aMsg: string): void;
    protected AddLogMessage(aMsg: string, aLevel: LogLevel): void;
}

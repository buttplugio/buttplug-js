import * as Messages from "../core/Messages";
import { DeviceManager } from "./DeviceManager";
import { EventEmitter } from "events";
import { ServerMessageHub } from "./ServerMessageHub";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
import { ButtplugLogger, LogLevel, LogMessage } from "../core/Logging";

export class ButtplugServer extends EventEmitter {

  public static CanUseBluetooth = async (): Promise<boolean> => {
    if (navigator === undefined || !("bluetooth" in navigator)) {
      return false;
    }
    return await navigator.bluetooth.getAvailability();
  }

  // Member: PingTimer?
  private _deviceManager: DeviceManager;
  private _pingTimedOut: boolean = false;
  private _receivedRequestServerInfo: boolean = false;
  private _logger = ButtplugLogger.Logger;
  private _outgoingLogLevel = LogLevel.Off;

  constructor(private _serverName: string = "Buttplug JS Internal Server",
              private _maxPingTime: number = 0) {
    super();
    this._logger.LogLevel = LogLevel.Debug;
    this._logger.SetConsoleLogging(true);
    this._logger.Info(`Starting Buttplug Server: ${this._serverName}`);
    this._deviceManager = new DeviceManager();
    ServerMessageHub.Instance.addListener("message", this.OnOutgoingMessage);
  }

  public AddDeviceManager = (aManager: IDeviceSubtypeManager) => {
    this._deviceManager.AddDeviceManager(aManager);
  }

  public SendMessage = async (aMessage: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    const id = aMessage.Id;
    this._logger.Trace(`Got Message: ${aMessage}`);
    if (id === 0) {
      return this._logger.LogAndError("Message Id 0 is reserved for outgoing system messages. Please use another Id.",
                                      Messages.ErrorClass.ERROR_MSG,
                                      id);
    }
    if (this._pingTimedOut) {
      return this._logger.LogAndError("Ping timed out.", Messages.ErrorClass.ERROR_MSG, id);
    }
    if (!this._receivedRequestServerInfo && aMessage.constructor.name !== "RequestServerInfo") {
      return this._logger.LogAndError("RequestServerInfo must be first message received by server.",
                                      Messages.ErrorClass.ERROR_INIT,
                                      id);
    }
    switch (aMessage.constructor.name) {
    case "RequestLog":
      const logmsg: Messages.RequestLog = aMessage as Messages.RequestLog;
      if (logmsg.LogLevel === LogLevel[LogLevel.Off]) {
        this._logger.removeListener("log", this.OnLogMessage);
      } else if (this._outgoingLogLevel === LogLevel.Off) {
        this._logger.addListener("log", this.OnLogMessage);
      }
      this._outgoingLogLevel = LogLevel[logmsg.LogLevel];
      return new Messages.Ok(logmsg.Id);
    case "Ping":
      // TODO: Implement Ping
      return new Messages.Ok(aMessage.Id);
    case "RequestServerInfo":
      this._receivedRequestServerInfo = true;
      // TODO: Figure out how to encode this from the package version?
      // TODO: Figure out how to pull message schema version.
      return new Messages.ServerInfo(0, 0, 9, 1, this._maxPingTime, this._serverName, id);
    case "Test":
      const testmsg = aMessage as Messages.Test;
      return new Messages.Test(testmsg.TestString, aMessage.Id);
    }
    return this._deviceManager.SendMessage(aMessage);
  }

  public Shutdown = async (): Promise<void> => {
    return;
  }

  private OnLogMessage = (aMsg: LogMessage) => {
    if (aMsg.LogLevel > this._outgoingLogLevel) {
      return;
    }
    this.OnOutgoingMessage(new Messages.Log(LogLevel[aMsg.LogLevel], aMsg.Message));
  }

  private OnOutgoingMessage = (aMsg: Messages.ButtplugMessage) => {
    this.emit("message", aMsg);
  }
}

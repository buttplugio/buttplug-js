import * as Messages from "../core/Messages";
import { GetSchemaVersion } from "../core/MessageUtils";
import { DeviceManager } from "./DeviceManager";
import { EventEmitter } from "events";
import { ServerMessageHub } from "./ServerMessageHub";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
import { ButtplugLogger, ButtplugLogLevel, LogMessage } from "../core/Logging";
import { RequestServerInfo } from "../core/Messages";

export class ButtplugServer extends EventEmitter {

  // Member: PingTimer?
  private _clientSchemaVersion: number = -1;
  private _clientName: string;
  private _deviceManager: DeviceManager;
  private _pingTimedOut: boolean = false;
  private _receivedRequestServerInfo: boolean = false;
  private _logger = ButtplugLogger.Logger;
  private _outgoingLogLevel = ButtplugLogLevel.Off;

  constructor(private _serverName: string = "Buttplug JS Internal Server",
              private _maxPingTime: number = 0) {
    super();
    this._logger.Info(`Server: Starting Buttplug Server: ${this._serverName}`);
    this._deviceManager = new DeviceManager();
    ServerMessageHub.Instance.addListener("message", this.OnOutgoingMessage);
  }

  public AddDeviceManager = (aManager: IDeviceSubtypeManager) => {
    this._deviceManager.AddDeviceManager(aManager);
  }

  public get DeviceManagers(): IDeviceSubtypeManager[] {
    return this._deviceManager.DeviceManagers;
  }

  public ClearDeviceManagers = () => {
    this._deviceManager.ClearDeviceManagers();
  }

  public SendMessage = async (aMessage: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    const id = aMessage.Id;
    this._logger.Trace(`Server: Got Message: ${aMessage}`);
    if (id === 0) {
      return this._logger.LogAndError("Message Id 0 is reserved for outgoing system messages. Please use another Id.",
                                      Messages.ErrorClass.ERROR_MSG,
                                      id);
    }
    if (this._pingTimedOut) {
      return this._logger.LogAndError("Ping timed out.", Messages.ErrorClass.ERROR_MSG, id);
    }
    if (!this._receivedRequestServerInfo && aMessage.Type !== "RequestServerInfo") {
      return this._logger.LogAndError("RequestServerInfo must be first message received by server.",
                                      Messages.ErrorClass.ERROR_INIT,
                                      id);
    }
    switch (aMessage.Type) {
    case "RequestLog":
      const logmsg: Messages.RequestLog = aMessage as Messages.RequestLog;
      this._logger.Debug(`Server: RequestLog received for level ${logmsg.LogLevel}`);
      if (logmsg.LogLevel === ButtplugLogLevel[ButtplugLogLevel.Off]) {
        this._logger.removeListener("log", this.OnLogMessage);
      } else if (this._outgoingLogLevel === ButtplugLogLevel.Off) {
        this._logger.addListener("log", this.OnLogMessage);
      }
      this._logger.MaximumEventLogLevel = ButtplugLogLevel[logmsg.LogLevel];
      this._outgoingLogLevel = ButtplugLogLevel[logmsg.LogLevel];
      return new Messages.Ok(logmsg.Id);
    case "Ping":
      // TODO: Implement Ping
      return new Messages.Ok(aMessage.Id);
    case "RequestServerInfo":
      this._logger.Debug(`Server: RequestServerInfo received.`);
      const msg = aMessage as RequestServerInfo;
      if (this._clientSchemaVersion > 1) {
        // Client automatically disconnects on error message.
        return new Messages.Error(`Client schema (${this._clientSchemaVersion}) newer than server schema (1). ` +
                                  "Please upgrade server.",
                                  Messages.ErrorClass.ERROR_INIT,
                                  id);
      }
      this._receivedRequestServerInfo = true;
      this._clientSchemaVersion = msg.MessageVersion;
      this._clientName = msg.ClientName;
      // TODO: Figure out how to encode this from the package version?
      // TODO: Figure out how to pull message schema version.
      return new Messages.ServerInfo(0, 0, 0, GetSchemaVersion(), this._maxPingTime, this._serverName, id);
    case "Test":
      this._logger.Debug(`Server: Test received.`);
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
    this.OnOutgoingMessage(new Messages.Log(ButtplugLogLevel[aMsg.LogLevel], aMsg.Message));
  }

  private OnOutgoingMessage = (msg: Messages.ButtplugMessage) => {
    if (msg.constructor.name === "Error") {
      return msg;
    }
    if (this._clientSchemaVersion === -1) {
      return new Messages.Error("Cannot discern client schema version. Was RequestServerInfo message sent?");
    }
    while (msg.SchemaVersion !== this._clientSchemaVersion && msg.SchemaVersion > 0) {
      msg = msg.DowngradeMessage();
    }
    // If there was a conversion problem, log as well as returning an error message.
    if (msg.constructor.name === "Error") {
      this._logger.Error((msg as Messages.Error).ErrorMessage);
    }
    this.emit("message", msg);
  }
}

import * as Messages from "../core/Messages";
import { GetSchemaVersion } from "../core/MessageUtils";
import { DeviceManager } from "./DeviceManager";
import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "./IDeviceSubtypeManager";
import { ButtplugLogger, ButtplugLogLevel, LogMessage } from "../core/Logging";
import { RequestServerInfo, ButtplugMessage } from "../core/Messages";
import { ButtplugMessageException, ButtplugException,
         ButtplugPingException, ButtplugInitException } from "../core/Exceptions";

export class ButtplugServer extends EventEmitter {

  // Member: PingTimer?
  private _clientSchemaVersion: number = -1;
  private _clientName: string | undefined = undefined;
  private _deviceManager: DeviceManager;
  private _pingTimedOut: boolean = false;
  private _receivedRequestServerInfo: boolean = false;
  private _logger = ButtplugLogger.Logger;
  private _outgoingLogLevel = ButtplugLogLevel.Off;
  private _connected: boolean = false;

  constructor(private _serverName: string = "Buttplug JS Internal Server",
              private _maxPingTime: number = 0) {
    super();
    this._logger.Info(`Server: Starting Buttplug Server: ${this._serverName}`);
    this._deviceManager = new DeviceManager((aMsg: ButtplugMessage) => this.SendOutgoingMessage(aMsg));
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

  public Disconnect = () => {
    this._connected = false;
  }

  public CheckConnection = () => {
    if (!this._connected) {
      // This doesn't even get a class because if we're not connected, we have
      // nothing to pass through objects. It's just a straight up error.
      throw new Error("Server not connected to client.");
    }
  }

  public SendMessage = async (aMessage: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    if (!(aMessage instanceof RequestServerInfo)) {
      this.CheckConnection();
    }
    const id = aMessage.Id;
    this._logger.Trace(`Server: Got Message: ${aMessage}`);
    if (id === 0) {
      throw ButtplugException.LogAndError(ButtplugMessageException,
                                          this._logger,
                                          "Message Id 0 is reserved for outgoing system messages. Use another Id.",
                                          id);
    }
    if (this._pingTimedOut) {
      throw ButtplugException.LogAndError(ButtplugPingException,
                                          this._logger,
                                          "Ping timed out.",
                                          id);
    }
    if (!this._receivedRequestServerInfo && aMessage.Type !== Messages.RequestServerInfo) {
      throw ButtplugException.LogAndError(ButtplugInitException,
                                          this._logger,
                                          "RequestServerInfo must be first message received by server.",
                                          id);
    }
    // We need to switch on type here, since using constructor would cause
    // issues with how we do message versioning.
    switch (aMessage.Type) {
      case Messages.RequestLog:
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
      case Messages.Ping:
        // TODO: Implement Ping
        return new Messages.Ok(aMessage.Id);
      case Messages.RequestServerInfo:
        this._logger.Debug(`Server: RequestServerInfo received.`);
        const msg = aMessage as RequestServerInfo;
        if (this._clientSchemaVersion > 1) {
          // Client automatically disconnects on error message.
          throw ButtplugException.LogAndError(ButtplugInitException,
                                              this._logger,
                                              `Client schema (${this._clientSchemaVersion}) newer than ` +
                                              "server schema (1). Please upgrade server.",
                                              id);
        }
        this._receivedRequestServerInfo = true;
        this._clientSchemaVersion = msg.MessageVersion;
        this._clientName = msg.ClientName;
        // TODO: Figure out how to encode this from the package version?
        this._connected = true;
        return new Messages.ServerInfo(0, 0, 0, GetSchemaVersion(), this._maxPingTime, this._serverName, id);
      case Messages.Test:
        this._logger.Debug(`Server: Test received.`);
        const testmsg = aMessage as Messages.Test;
        return new Messages.Test(testmsg.TestString, aMessage.Id);
    }
    return this._deviceManager.SendMessage(aMessage);
  }

  public Shutdown = async (): Promise<void> => {
    this.Disconnect();
    await this._deviceManager.Shutdown();
  }

  private OnLogMessage = (aMsg: LogMessage) => {
    if (aMsg.LogLevel > this._outgoingLogLevel) {
      return;
    }
    this.SendOutgoingMessage(new Messages.Log(ButtplugLogLevel[aMsg.LogLevel], aMsg.Message));
  }

  private SendOutgoingMessage = (msg: Messages.ButtplugMessage) => {
    if (!this._connected) {
      return;
    }
    if (this._clientSchemaVersion === -1) {
      throw ButtplugException.LogAndError(ButtplugMessageException,
                                          this._logger,
                                          "Cannot discern client schema version. Was RequestServerInfo message sent?");
    }
    while (msg.SchemaVersion !== this._clientSchemaVersion && msg.SchemaVersion > 0) {
      // If we can't downgrade any farther back, this will throw, which should
      // be handled by the caller.
      msg = msg.DowngradeMessage();
    }
    this.emit("message", msg);
  }
}

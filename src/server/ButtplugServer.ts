import * as Messages from "../core/Messages";
import DeviceManager from "./DeviceManager";

export default class ButtplugServer {

  // Member: PingTimer?
  private _deviceManager: DeviceManager = new DeviceManager();
  private _pingTimedOut: boolean = false;
  private _receivedRequestServerInfo: boolean = false;
  // Event: MessageReceived - Emits ButtplugMessage

  constructor(private _serverName: string = "Buttplug JS Internal Server",
              private _maxPingTime: number = 0) {
  }

  public SendMessage = async (aMessage: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> => {
    const id = aMessage.Id;
    if (id === 0) {
      return new Messages.Error("Message Id 0 is reserved for outgoing system messages. Please use another Id.",
                                Messages.ErrorClass.ERROR_MSG,
                                id);
    }
    // TODO: Figure out how outgoing only messages work here.
    if (this._pingTimedOut) {
      return new Messages.Error("Ping timed out.", Messages.ErrorClass.ERROR_MSG, id);
    }
    if (!this._receivedRequestServerInfo && aMessage.constructor.name !== "RequestServerInfo") {
      return new Messages.Error("RequestServerInfo must be first message received by server.",
                                Messages.ErrorClass.ERROR_INIT,
                                id);
    }
    switch (aMessage.constructor.name) {
    case "RequestLog":
      // TODO: We should probably have a logging system.
      break;
    case "Ping":
      // TODO: Implement Ping
      break;
    case "RequestServerInfo":
      this._receivedRequestServerInfo = true;
      // TODO: Figure out how to encode this from the package version?
      // TODO: Figure out how to pull message schema version.
      return new Messages.ServerInfo(0, 0, 9, 1, this._maxPingTime, this._serverName, id);
    case "Test":
      break;
    }
    return this._deviceManager.SendMessage(aMessage);
  }

  public Shutdown = async (): Promise<void> => {
    return;
  }
}

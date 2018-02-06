"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Messages = require("../core/Messages");
const MessageUtils_1 = require("../core/MessageUtils");
const DeviceManager_1 = require("./DeviceManager");
const events_1 = require("events");
const ServerMessageHub_1 = require("./ServerMessageHub");
const Logging_1 = require("../core/Logging");
class ButtplugServer extends events_1.EventEmitter {
    constructor(_serverName = "Buttplug JS Internal Server", _maxPingTime = 0) {
        super();
        this._serverName = _serverName;
        this._maxPingTime = _maxPingTime;
        // Member: PingTimer?
        this._clientSchemaVersion = -1;
        this._pingTimedOut = false;
        this._receivedRequestServerInfo = false;
        this._logger = Logging_1.ButtplugLogger.Logger;
        this._outgoingLogLevel = Logging_1.ButtplugLogLevel.Off;
        this.AddDeviceManager = (aManager) => {
            this._deviceManager.AddDeviceManager(aManager);
        };
        this.ClearDeviceManagers = () => {
            this._deviceManager.ClearDeviceManagers();
        };
        this.SendMessage = (aMessage) => __awaiter(this, void 0, void 0, function* () {
            const id = aMessage.Id;
            this._logger.Trace(`Server: Got Message: ${aMessage}`);
            if (id === 0) {
                return this._logger.LogAndError("Message Id 0 is reserved for outgoing system messages. Please use another Id.", Messages.ErrorClass.ERROR_MSG, id);
            }
            if (this._pingTimedOut) {
                return this._logger.LogAndError("Ping timed out.", Messages.ErrorClass.ERROR_MSG, id);
            }
            if (!this._receivedRequestServerInfo && aMessage.Type !== "RequestServerInfo") {
                return this._logger.LogAndError("RequestServerInfo must be first message received by server.", Messages.ErrorClass.ERROR_INIT, id);
            }
            switch (aMessage.Type) {
                case "RequestLog":
                    const logmsg = aMessage;
                    this._logger.Debug(`Server: RequestLog received for level ${logmsg.LogLevel}`);
                    if (logmsg.LogLevel === Logging_1.ButtplugLogLevel[Logging_1.ButtplugLogLevel.Off]) {
                        this._logger.removeListener("log", this.OnLogMessage);
                    }
                    else if (this._outgoingLogLevel === Logging_1.ButtplugLogLevel.Off) {
                        this._logger.addListener("log", this.OnLogMessage);
                    }
                    this._logger.MaximumEventLogLevel = Logging_1.ButtplugLogLevel[logmsg.LogLevel];
                    this._outgoingLogLevel = Logging_1.ButtplugLogLevel[logmsg.LogLevel];
                    return new Messages.Ok(logmsg.Id);
                case "Ping":
                    // TODO: Implement Ping
                    return new Messages.Ok(aMessage.Id);
                case "RequestServerInfo":
                    this._logger.Debug(`Server: RequestServerInfo received.`);
                    const msg = aMessage;
                    if (this._clientSchemaVersion > 1) {
                        // Client automatically disconnects on error message.
                        return new Messages.Error(`Client schema (${this._clientSchemaVersion}) newer than server schema (1). ` +
                            "Please upgrade server.", Messages.ErrorClass.ERROR_INIT, id);
                    }
                    this._receivedRequestServerInfo = true;
                    this._clientSchemaVersion = msg.MessageVersion;
                    this._clientName = msg.ClientName;
                    // TODO: Figure out how to encode this from the package version?
                    // TODO: Figure out how to pull message schema version.
                    return new Messages.ServerInfo(0, 0, 0, MessageUtils_1.GetSchemaVersion(), this._maxPingTime, this._serverName, id);
                case "Test":
                    this._logger.Debug(`Server: Test received.`);
                    const testmsg = aMessage;
                    return new Messages.Test(testmsg.TestString, aMessage.Id);
            }
            return this._deviceManager.SendMessage(aMessage);
        });
        this.Shutdown = () => __awaiter(this, void 0, void 0, function* () {
            return;
        });
        this.OnLogMessage = (aMsg) => {
            if (aMsg.LogLevel > this._outgoingLogLevel) {
                return;
            }
            this.OnOutgoingMessage(new Messages.Log(Logging_1.ButtplugLogLevel[aMsg.LogLevel], aMsg.Message));
        };
        this.OnOutgoingMessage = (msg) => {
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
                this._logger.Error(msg.ErrorMessage);
            }
            this.emit("message", msg);
        };
        this._logger.Info(`Server: Starting Buttplug Server: ${this._serverName}`);
        this._deviceManager = new DeviceManager_1.DeviceManager();
        ServerMessageHub_1.ServerMessageHub.Instance.addListener("message", this.OnOutgoingMessage);
    }
    get DeviceManagers() {
        return this._deviceManager.DeviceManagers;
    }
}
exports.ButtplugServer = ButtplugServer;
//# sourceMappingURL=ButtplugServer.js.map
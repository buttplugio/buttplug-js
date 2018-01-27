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
const Logging_1 = require("../core/Logging");
const events_1 = require("events");
const Device_1 = require("../core/Device");
const ButtplugBrowserWebsocketConnector_1 = require("./ButtplugBrowserWebsocketConnector");
const ButtplugEmbeddedServerConnector_1 = require("./ButtplugEmbeddedServerConnector");
const Messages = require("../core/Messages");
const MessageUtils_1 = require("../core/MessageUtils");
class ButtplugClient extends events_1.EventEmitter {
    constructor(aClientName = "Generic Buttplug Client") {
        super();
        this._pingTimer = null;
        this._connector = null;
        this._devices = new Map();
        this._counter = 1;
        this._waitingMsgs = new Map();
        this._logger = Logging_1.ButtplugLogger.Logger;
        // TODO This should be set on schema load
        this._messageVersion = 1;
        this.ConnectWebsocket = (aAddress) => __awaiter(this, void 0, void 0, function* () {
            this._logger.Info(`ButtplugClient: Connecting to ${aAddress}`);
            yield this.Connect(new ButtplugBrowserWebsocketConnector_1.ButtplugBrowserWebsocketConnector(aAddress));
        });
        this.ConnectLocal = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Info(`ButtplugClient: Connecting to In-Browser Server`);
            yield this.Connect(new ButtplugEmbeddedServerConnector_1.ButtplugEmbeddedServerConnector());
        });
        this.Connect = (aConnector) => __awaiter(this, void 0, void 0, function* () {
            this._logger.Info(`ButtplugClient: Connecting using ${aConnector.constructor.name}`);
            yield aConnector.Connect();
            this._connector = aConnector;
            this._connector.addListener("message", this.ParseMessages);
            this._connector.addListener("disconnect", this.DisconnectHandler);
            yield this.InitializeConnection();
        });
        this.StartScanning = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: StartScanning called`);
            return yield this.SendMsgExpectOk(new Messages.StartScanning());
        });
        this.StopScanning = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: StopScanning called`);
            return yield this.SendMsgExpectOk(new Messages.StopScanning());
        });
        this.RequestLog = (aLogLevel) => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: RequestLog called with level ${aLogLevel}`);
            return yield this.SendMsgExpectOk(new Messages.RequestLog(aLogLevel));
        });
        this.StopAllDevices = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`ButtplugClient: StopAllDevices`);
            return yield this.SendMsgExpectOk(new Messages.StopAllDevices());
        });
        this.ParseMessages = (aMsgs) => {
            this.ParseMessagesInternal(aMsgs);
        };
        this.DisconnectHandler = () => {
            this._logger.Info(`ButtplugClient: Disconnect event receieved.`);
            this.emit("disconnect");
        };
        this.InitializeConnection = () => __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            const msg = yield this.SendMessage(new Messages.RequestServerInfo(this._clientName, 1));
            switch (msg.Type) {
                case "ServerInfo": {
                    const serverinfo = msg;
                    this._logger.Info(`ButtplugClient: Connected to Server ${serverinfo.ServerName}`);
                    // TODO: maybe store server name, do something with message template version?
                    const ping = serverinfo.MaxPingTime;
                    if (serverinfo.MessageVersion < this._messageVersion) {
                        // Disconnect and throw an exception explaining the version mismatch problem.
                        this._connector.Disconnect();
                        throw new Error("Server protocol version is older than client protocol version. Please update server.");
                    }
                    if (ping > 0) {
                        this._pingTimer = setInterval(() => {
                            // If we've disconnected, stop trying to ping the server.
                            if (!this.Connected) {
                                this.ShutdownConnection();
                                return;
                            }
                            this.SendMessage(new Messages.Ping(this._counter));
                        }, Math.round(ping / 2));
                    }
                    yield this.RequestDeviceList();
                    return true;
                }
                case "Error": {
                    const err = msg;
                    this._logger.Error(`ButtplugClient: Cannot connect to server. ${err.ErrorMessage}`);
                    // Disconnect and throw an exception with the error message we got back.
                    // This will usually only error out if we have a version mismatch that the
                    // server has detected.
                    this._connector.Disconnect();
                    throw new Error(msg.ErrorMessage);
                }
            }
            return false;
        });
        this.RequestDeviceList = () => __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            this._logger.Debug(`ButtplugClient: ReceiveDeviceList called`);
            const deviceList = (yield this.SendMessage(new Messages.RequestDeviceList()));
            deviceList.Devices.forEach((d) => {
                if (!this._devices.has(d.DeviceIndex)) {
                    const device = Device_1.Device.fromMsg(d);
                    this._logger.Debug(`ButtplugClient: Adding Device: ${device}`);
                    this._devices.set(d.DeviceIndex, device);
                    this.emit("deviceadded", device);
                }
                else {
                    this._logger.Debug(`ButtplugClient: Device already added: ${d}`);
                }
            });
        });
        this.ShutdownConnection = () => {
            if (this._pingTimer !== null) {
                clearInterval(this._pingTimer);
                this._pingTimer = null;
            }
        };
        this.SendMsgExpectOk = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            let res;
            let rej;
            const msg = yield this.SendMessage(aMsg);
            const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
            switch (msg.Type) {
                case "Ok":
                    res();
                    break;
                default:
                    rej(msg);
                    break;
            }
            return p;
        });
        this._clientName = aClientName;
        this._logger.Debug(`ButtplugClient: Client ${aClientName} created.`);
    }
    get Connected() {
        return this._connector !== null && this._connector.Connected;
    }
    Disconnect() {
        this._logger.Debug(`ButtplugClient: Disconnect called`);
        this.CheckConnector();
        this.ShutdownConnection();
        this._connector.Disconnect();
    }
    get Devices() {
        // While this function doesn't actually send a message, if we don't have a
        // connector, we shouldn't have devices.
        this.CheckConnector();
        const devices = [];
        this._devices.forEach((d, i) => {
            devices.push(d);
        });
        return devices;
    }
    SendDeviceMessage(aDevice, aDeviceMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            const dev = this._devices.get(aDevice.Index);
            if (dev === undefined) {
                this._logger.Error(`Device ${aDevice.Index} not available.`);
                return Promise.reject(new Error("Device not available."));
            }
            if (dev.AllowedMessages.indexOf(aDeviceMsg.Type) === -1) {
                this._logger.Error(`Device ${aDevice.Name} does not accept message type ${aDeviceMsg.Type}.`);
                return Promise.reject(new Error(`Device ${aDevice.Name} does not accept message type ${aDeviceMsg.Type}.`));
            }
            aDeviceMsg.DeviceIndex = aDevice.Index;
            return yield this.SendMsgExpectOk(aDeviceMsg);
        });
    }
    ParseMessagesInternal(aMsgs) {
        for (const x of aMsgs) {
            if (x.Id > 0 && this._waitingMsgs.has(x.Id)) {
                const res = this._waitingMsgs.get(x.Id);
                res(x);
                return;
            }
            switch (x.Type) {
                case "Log":
                    this.emit("log", x);
                    break;
                case "DeviceAdded":
                    const addedMsg = x;
                    const addedDevice = Device_1.Device.fromMsg(addedMsg);
                    this._devices.set(addedMsg.DeviceIndex, addedDevice);
                    this.emit("deviceadded", addedDevice);
                    break;
                case "DeviceRemoved":
                    const removedMsg = x;
                    if (this._devices.has(removedMsg.DeviceIndex)) {
                        const removedDevice = this._devices.get(removedMsg.DeviceIndex);
                        this._devices.delete(removedMsg.DeviceIndex);
                        this.emit("deviceremoved", removedDevice);
                    }
                    break;
                case "ScanningFinished":
                    this.emit("scanningfinished", x);
                    break;
            }
        }
    }
    SendMessage(aMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            // This will throw if our message is invalid
            MessageUtils_1.CheckMessage(aMsg);
            let res;
            aMsg.Id = this._counter;
            const msgPromise = new Promise((resolve) => { res = resolve; });
            this._waitingMsgs.set(this._counter, res);
            this._counter += 1;
            this._connector.Send(aMsg);
            return yield msgPromise;
        });
    }
    CheckConnector() {
        if (!this.Connected) {
            throw new Error("ButtplugClient not connected");
        }
    }
}
exports.ButtplugClient = ButtplugClient;
//# sourceMappingURL=Client.js.map
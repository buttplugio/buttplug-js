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
const ButtplugEmbeddedServerConnector_1 = require("../src/client/ButtplugEmbeddedServerConnector");
const ButtplugServer_1 = require("../src/server/ButtplugServer");
const Messages = require("../src/core/Messages");
const index_1 = require("../src/index");
const devtools_1 = require("../src/devtools");
const utils_1 = require("./utils");
utils_1.SetupTestSuite();
class TestOldClient extends index_1.ButtplugClient {
    constructor() {
        super("Test Old Client");
        this.InitializeConnection = () => __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.SendMessage(new Messages.RequestServerInfo(this._clientName, 0));
            switch (msg.getType()) {
                case "ServerInfo": {
                    // TODO: maybe store server name, do something with message template version?
                    return true;
                }
                case "Error": {
                    this._connector.Disconnect();
                }
            }
            return false;
        });
    }
    ParseMessagesInternal(aMsgs) {
        this.emit("clientmessages", aMsgs);
        super.ParseMessagesInternal(aMsgs);
    }
}
describe("Server Tests", () => __awaiter(this, void 0, void 0, function* () {
    let bpServer;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        bpServer = new ButtplugServer_1.ButtplugServer("Test Server", 0);
        bpServer.AddDeviceManager(new devtools_1.TestDeviceManager());
    }));
    it("Should downgrade messages", () => __awaiter(this, void 0, void 0, function* () {
        const bpConnector = new ButtplugEmbeddedServerConnector_1.ButtplugEmbeddedServerConnector();
        bpConnector.Server = bpServer;
        const oldClient = new TestOldClient();
        yield oldClient.Connect(bpConnector);
        let res;
        let rej;
        const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
        yield oldClient.StartScanning();
        // This listener needs to be added after calling StartScanning, as it'll
        // fire the device added event on the next tick after we finish out this
        // function.
        oldClient.addListener("clientmessages", (aMsgs) => {
            try {
                expect(aMsgs).toEqual([new Messages.DeviceAddedVersion0(1, "Test Device - Test Vibration Device", ["VibrateCmd",
                        "SingleMotorVibrateCmd",
                        "StopDeviceCmd"])]);
                res();
            }
            catch (e) {
                rej(e);
            }
        });
        return p;
    }));
    it("Should clear all device managers when ClearDeviceManagers called", () => __awaiter(this, void 0, void 0, function* () {
        const bpConnector = new ButtplugEmbeddedServerConnector_1.ButtplugEmbeddedServerConnector();
        bpConnector.Server = bpServer;
        const client = new index_1.ButtplugClient();
        yield client.Connect(bpConnector);
        let res;
        let rej;
        const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
        client.addListener("scanningfinished", (aMsgs) => {
            try {
                expect(client.Devices.length).toEqual(0);
                res();
            }
            catch (e) {
                rej(e);
            }
        });
        yield client.StartScanning();
        return p;
    }));
}));
//# sourceMappingURL=test-server.js.map
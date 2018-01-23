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
const mock_socket_1 = require("mock-socket");
const Client_1 = require("../src/client/Client");
const Messages = require("../src/core/Messages");
const MessageUtils_1 = require("../src/core/MessageUtils");
const utils_1 = require("./utils");
utils_1.SetupTestSuite();
describe("Websocket Client Tests", () => __awaiter(this, void 0, void 0, function* () {
    let mockServer;
    let bp;
    let p;
    let res;
    let rej;
    class BPTestClient extends Client_1.ButtplugClient {
        constructor(ClientName) {
            super(ClientName);
        }
        get PingTimer() {
            return this._pingTimer;
        }
    }
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        mockServer = new mock_socket_1.Server("ws://localhost:6868");
        p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
        const serverInfo = (jsonmsg) => {
            const msg = MessageUtils_1.FromJSON(jsonmsg)[0];
            if (msg.Type === "RequestServerInfo") {
                delaySend(new Messages.ServerInfo(0, 0, 0, 1, 0, "Test Server", msg.Id));
            }
            if (msg.Type === "RequestDeviceList") {
                delaySend(new Messages.DeviceList([], msg.Id));
                mockServer.removeEventListener("message", serverInfo);
            }
        };
        mockServer.on("message", serverInfo);
        bp = new Client_1.ButtplugClient("Test Buttplug Client");
        yield bp.ConnectWebsocket("ws://localhost:6868");
    }));
    afterEach(function (done) {
        mockServer.stop(done);
    });
    function delaySend(aMsg) {
        process.nextTick(() => mockServer.send("[" + aMsg.toJSON() + "]"));
    }
    it("Should deal with request/reply correctly", () => __awaiter(this, void 0, void 0, function* () {
        mockServer.on("message", (jsonmsg) => {
            const msg = MessageUtils_1.FromJSON(jsonmsg)[0];
            delaySend(new Messages.Ok(msg.Id));
        });
        yield bp.StartScanning();
        yield bp.StopScanning();
    }));
    it("Should receive disconnect event on websocket disconnect", () => __awaiter(this, void 0, void 0, function* () {
        bp.addListener("disconnect", () => { res(); });
        mockServer.close();
        return p;
    }));
}));
//# sourceMappingURL=test-websocketclient.js.map
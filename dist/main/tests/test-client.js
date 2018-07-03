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
const index_1 = require("../src/index");
const index_2 = require("../src/devtools/index");
const Messages = require("../src/core/Messages");
const utils_1 = require("./utils");
utils_1.SetupTestSuite();
describe("Client Tests", () => __awaiter(this, void 0, void 0, function* () {
    let p;
    let res;
    let rej;
    beforeEach(() => {
        p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    });
    function SetupServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const bp = new utils_1.BPTestClient("Test Buttplug Client");
            yield bp.ConnectLocal();
            return bp;
        });
    }
    it("Should return a test message.", () => __awaiter(this, void 0, void 0, function* () {
        const bp = yield SetupServer();
        yield expect(bp.SendCheckedMessage(new Messages.Test("Test")))
            .resolves
            .toEqual(new Messages.Test("Test", 3));
    }));
    it("Should emit a log message on requestlog (testing basic event emitters)", () => __awaiter(this, void 0, void 0, function* () {
        const bp = yield SetupServer();
        yield bp.RequestLog("Error");
        let called = false;
        process.nextTick(() => {
            bp.on("log", (x) => __awaiter(this, void 0, void 0, function* () {
                // This will fire if we get another log message after turning things off.
                if (called) {
                    rej();
                }
                called = true;
                expect(x).toEqual(new Messages.Log("Error", "Test"));
                // Turn logging events back off.
                yield bp.RequestLog("Off");
                // Make sure we don't get called again.
                index_1.ButtplugLogger.Logger.Error("Test");
                bp.removeAllListeners();
                res();
            }));
            // We shouldn't see this one.
            index_1.ButtplugLogger.Logger.Trace("Test");
            index_1.ButtplugLogger.Logger.Error("Test");
        });
        return p;
    }));
    it("Should emit a device on addition", () => __awaiter(this, void 0, void 0, function* () {
        const connector = yield utils_1.SetupTestServer();
        const tdm = connector.TestDeviceManager;
        const server = connector.Server;
        const bp = connector.Client;
        bp.on("deviceadded", (x) => {
            tdm.VibrationDevice.Disconnect();
        });
        bp.on("deviceremoved", (x) => {
            res();
        });
        yield bp.StartScanning();
        return p;
    }));
    it("Should emit a device on connection when device already attached", () => __awaiter(this, void 0, void 0, function* () {
        const client = new index_1.ButtplugClient("Test Client");
        client.on("deviceadded", (x) => {
            res();
        });
        const server = new index_1.ButtplugServer("Test Server");
        const tdm = new index_2.TestDeviceManager();
        server.AddDeviceManager(tdm);
        tdm.ConnectLinearDevice();
        const localConnector = new index_1.ButtplugEmbeddedServerConnector();
        localConnector.Server = server;
        yield client.Connect(localConnector);
        return p;
    }));
    it("Should emit when device scanning is over", () => __awaiter(this, void 0, void 0, function* () {
        const bp = (yield utils_1.SetupTestServer()).Client;
        bp.on("scanningfinished", (x) => {
            bp.removeAllListeners("scanningfinished");
            res();
        });
        yield bp.StartScanning();
        return p;
    }));
    it("Should allow correct device messages and reject unauthorized", () => __awaiter(this, void 0, void 0, function* () {
        const bp = (yield utils_1.SetupTestServer()).Client;
        bp.on("scanningfinished", () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield bp.SendDeviceMessage(bp.Devices[0], new Messages.SingleMotorVibrateCmd(1.0));
            }
            catch (e) {
                rej();
            }
            expect(yield bp.SendDeviceMessage(bp.Devices[0], new Messages.KiirooCmd("2"))).toThrow();
            res();
        }));
        yield bp.StartScanning();
        return p;
    }));
    it("Should reject schema violating message", () => __awaiter(this, void 0, void 0, function* () {
        const bp = (yield utils_1.SetupTestServer()).Client;
        bp.on("scanningfinished", (x) => __awaiter(this, void 0, void 0, function* () {
            expect(bp.Devices.length).toBeGreaterThan(0);
            process.nextTick(() => __awaiter(this, void 0, void 0, function* () {
                expect(yield bp.SendDeviceMessage(bp.Devices[0], new Messages.SingleMotorVibrateCmd(50))).toThrow();
                res();
            }));
        }));
        yield bp.StartScanning();
        return p;
    }));
    it("Should receive disconnect event on disconnect", () => __awaiter(this, void 0, void 0, function* () {
        const bplocal = new index_1.ButtplugClient("Test Client");
        bplocal.addListener("disconnect", () => { res(); });
        yield bplocal.ConnectLocal();
        bplocal.Disconnect();
        return p;
    }));
    it("Should shut down ping timer on disconnect", () => __awaiter(this, void 0, void 0, function* () {
        const bplocal = new utils_1.BPTestClient("Test Client");
        bplocal.addListener("disconnect", () => {
            expect(bplocal.PingTimer).toEqual(null);
            res();
        });
        yield bplocal.ConnectLocal();
        bplocal.Disconnect();
        return p;
    }));
    it("Should get error on scanning when no device managers available.", () => __awaiter(this, void 0, void 0, function* () {
        const bplocal = new index_1.ButtplugClient("Test Client");
        bplocal.addListener("disconnect", () => { res(); });
        yield bplocal.ConnectLocal();
        yield expect(bplocal.StartScanning())
            .rejects
            .toHaveProperty("ErrorCode", Messages.ErrorClass.ERROR_DEVICE);
        bplocal.Disconnect();
    }));
}));
//# sourceMappingURL=test-client.js.map
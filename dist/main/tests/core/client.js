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
const Messages = require("../../src/core/messages");
const client_1 = require("../../src/core/client");
const mock_socket_1 = require("mock-socket");
const chai_1 = require("chai");
require("mocha");
describe("Client Tests", () => __awaiter(this, void 0, void 0, function* () {
    let mockServer;
    let bp;
    let p, res;
    beforeEach(function () {
        mockServer = new mock_socket_1.Server("ws://localhost:6868");
        bp = new client_1.ButtplugClient();
        bp.Connect("ws://localhost:6868");
        p = new Promise((resolve) => { res = resolve; });
    });
    afterEach(function (done) {
        mockServer.stop(done);
    });
    function delaySend(aMsg) {
        setTimeout(() => {
            mockServer.send("[" + aMsg.toJSON() + "]");
        }, 0);
    }
    it("Should deal with request/reply correctly", () => __awaiter(this, void 0, void 0, function* () {
        mockServer.on('message', (jsonmsg) => {
            let msg = Messages.FromJSON(jsonmsg)[0];
            delaySend(new Messages.Ok(msg.Id));
        });
        yield bp.StartScanning();
        yield bp.StopScanning();
    }));
    it("Should emit a log message on requestlog (testing basic event emitters)", () => __awaiter(this, void 0, void 0, function* () {
        mockServer.on('message', (jsonmsg) => {
            let msg = Messages.FromJSON(jsonmsg)[0];
            delaySend(new Messages.Ok(msg.Id));
            delaySend(new Messages.Log("Trace", "Test"));
        });
        let p = new Promise((resolve) => { res = resolve; });
        bp.on('log', (x) => {
            chai_1.expect(x).to.deep.equal(new Messages.Log("Trace", "Test"));
            res();
        });
        yield bp.RequestLog('Trace');
        return p;
    }));
    it("Should emit a device on addition", () => __awaiter(this, void 0, void 0, function* () {
        mockServer.on('message', (jsonmsg) => {
            let msg = Messages.FromJSON(jsonmsg)[0];
            delaySend(new Messages.Ok(msg.Id));
            delaySend(new Messages.DeviceAdded(0, "Test Device", ["SingleMotorVibrateCmd"]));
        });
        bp.on('deviceadded', (x) => {
            delaySend(new Messages.DeviceRemoved(0));
        });
        bp.on('deviceremoved', (x) => {
            res();
        });
        yield bp.StartScanning();
        return p;
    }));
    it("Should emit a device when device list request received with new devices", () => __awaiter(this, void 0, void 0, function* () {
        mockServer.on('message', (jsonmsg) => {
            let msg = Messages.FromJSON(jsonmsg)[0];
            delaySend(new Messages.DeviceList([new Messages.DeviceInfo(0, "Test Device", ["SingleMotorVibrateCmd"])], msg.Id));
        });
        bp.on('deviceadded', (x) => {
            res();
        });
        yield bp.RequestDeviceList();
        return p;
    }));
    it("Should allow correct device messages and reject unauthorized", () => __awaiter(this, void 0, void 0, function* () {
        mockServer.on('message', (jsonmsg) => {
            let msg = Messages.FromJSON(jsonmsg)[0];
            delaySend(new Messages.Ok(msg.Id));
            if (msg.getType() == 'StartScanning') {
                delaySend(new Messages.DeviceAdded(0, "Test Device", ["SingleMotorVibrateCmd"]));
            }
            if (msg instanceof Messages.ButtplugDeviceMessage) {
                chai_1.expect(msg.DeviceIndex).to.equal(0);
            }
        });
        let device;
        bp.on('deviceadded', (x) => __awaiter(this, void 0, void 0, function* () {
            device = x;
            yield bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(1.0));
            try {
                yield bp.SendDeviceMessage(x, new Messages.KiirooRawCmd(2));
                throw Error("Should've thrown!");
            }
            catch (_) {
                res();
            }
        }));
        yield bp.StartScanning();
        return p;
    }));
}));
//# sourceMappingURL=client.js.map
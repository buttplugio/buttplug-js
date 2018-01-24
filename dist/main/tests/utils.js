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
const web_bluetooth_mock_1 = require("web-bluetooth-mock");
class BPTestClient extends index_1.ButtplugClient {
    constructor(ClientName) {
        super(ClientName);
    }
    get PingTimer() {
        return this._pingTimer;
    }
    SendCheckedMessage(aMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.CheckConnector();
            // This will throw if our message is invalid
            index_1.CheckMessage(aMsg);
            return yield this.SendUncheckedMessage(aMsg);
        });
    }
    SendUncheckedMessage(aMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            let r;
            aMsg.Id = this._counter;
            const msgPromise = new Promise((resolve) => { r = resolve; });
            this._waitingMsgs.set(this._counter, r);
            this._counter += 1;
            this._connector.Send(aMsg);
            return yield msgPromise;
        });
    }
}
exports.BPTestClient = BPTestClient;
function SetupTestSuite() {
    // None of our tests should take very long.
    jest.setTimeout(1000);
    process.on("unhandledRejection", (error) => {
        throw new Error("Unhandled Promise rejection!");
    });
}
exports.SetupTestSuite = SetupTestSuite;
class WebBluetoothMockObject {
    constructor(device, gatt, service, txChar) {
        this.device = device;
        this.gatt = gatt;
        this.service = service;
        this.txChar = txChar;
    }
}
exports.WebBluetoothMockObject = WebBluetoothMockObject;
function MakeMockWebBluetoothDevice(deviceInfo) {
    const device = new web_bluetooth_mock_1.DeviceMock(deviceInfo.Names[0], [deviceInfo.Services[0]]);
    const gatt = device.gatt;
    const service = device.getServiceMock(deviceInfo.Services[0]);
    const tx = service.getCharacteristicMock(deviceInfo.Characteristics.tx);
    return new WebBluetoothMockObject(device, gatt, service, tx);
}
exports.MakeMockWebBluetoothDevice = MakeMockWebBluetoothDevice;
//# sourceMappingURL=utils.js.map
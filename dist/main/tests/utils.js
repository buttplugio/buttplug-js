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
function SetupLovenseTestDevice(mockBT, deviceLetter = "W") {
    const oldWrite = mockBT.txChar.writeValue;
    mockBT.txChar.writeValue = () => __awaiter(this, void 0, void 0, function* () {
        const infoBuf = Buffer.from(`${deviceLetter}:01:000000000000`);
        const arrBuf = new ArrayBuffer(infoBuf.length);
        // If we don't convert and load into a view, the buffer conversion later
        // won't work.
        const view = new Uint8Array(arrBuf);
        for (let i = 0; i < infoBuf.length; ++i) {
            view[i] = infoBuf[i];
        }
        mockBT.rxChar.value = new DataView(arrBuf);
        mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
        mockBT.txChar.writeValue = oldWrite;
    });
}
exports.SetupLovenseTestDevice = SetupLovenseTestDevice;
function SetupTestSuite() {
    // None of our tests should take very long.
    jest.setTimeout(1000);
    process.on("unhandledRejection", (reason, p) => {
        throw new Error(`Unhandled Promise rejection!\n---\n${reason.stack}\n---\n`);
    });
}
exports.SetupTestSuite = SetupTestSuite;
class WebBluetoothMockObject {
    constructor(device, gatt, service, txChar, rxChar) {
        this.device = device;
        this.gatt = gatt;
        this.service = service;
        this.txChar = txChar;
        this.rxChar = rxChar;
    }
}
exports.WebBluetoothMockObject = WebBluetoothMockObject;
function MakeMockWebBluetoothDevice(deviceInfo) {
    let name;
    if (deviceInfo.Names.length > 0) {
        name = deviceInfo.Names[0];
    }
    else if (deviceInfo.NamePrefixes.length > 0) {
        name = deviceInfo.NamePrefixes[0] + "-test";
    }
    else {
        throw new Error("Cannot create mock device!");
    }
    const device = new web_bluetooth_mock_1.DeviceMock(name, [deviceInfo.Services[0]]);
    const gatt = device.gatt;
    const service = device.getServiceMock(deviceInfo.Services[0]);
    let tx;
    if (Object.keys(deviceInfo.Characteristics).indexOf("tx") !== -1) {
        tx = service.getCharacteristicMock(deviceInfo.Characteristics.tx);
    }
    else {
        // In this case, we are expected to query devices and find rx/tx
        // characteristics. Since this is a test and we have no devices, we can't do
        // that. Just make one up.
        tx = service.getCharacteristicMock("55555555-5555-5555-5555-555555555555");
        tx.properties.write = true;
        tx.properties.writeWithoutResponse = true;
    }
    let rx;
    if (Object.keys(deviceInfo.Characteristics).indexOf("rx") !== -1) {
        rx = service.getCharacteristicMock(deviceInfo.Characteristics.rx);
    }
    else {
        // In this case, we are expected to query devices and find rx/tx
        // characteristics. Since this is a test and we have no devices, we can't do
        // that. Just make one up.
        rx = service.getCharacteristicMock("55555556-5555-5555-5555-555555555555");
        rx.properties.notify = true;
    }
    return new WebBluetoothMockObject(device, gatt, service, tx, rx);
}
exports.MakeMockWebBluetoothDevice = MakeMockWebBluetoothDevice;
function SetupTestServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new index_1.ButtplugClient("Test Client");
        const server = new index_1.ButtplugServer("Test Server");
        server.ClearDeviceManagers();
        const testdevicemanager = new index_2.TestDeviceManager();
        server.AddDeviceManager(testdevicemanager);
        const localConnector = new index_1.ButtplugEmbeddedServerConnector();
        localConnector.Server = server;
        yield client.Connect(localConnector);
        return Promise.resolve({ Client: client,
            Server: server,
            TestDeviceManager: testdevicemanager,
            Connector: localConnector });
    });
}
exports.SetupTestServer = SetupTestServer;
//# sourceMappingURL=utils.js.map
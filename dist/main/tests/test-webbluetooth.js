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
const web_bluetooth_mock_1 = require("web-bluetooth-mock");
const Client_1 = require("../src/client/Client");
const utils_1 = require("./utils");
const index_1 = require("../src/index");
const Lovense_1 = require("../src/server/bluetooth/devices/Lovense");
utils_1.SetupTestSuite();
describe("WebBluetooth library tests", () => {
    let p;
    let res;
    let rej;
    let bp;
    let mockBT;
    let bluetooth;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
        // We assume we're using a lovense device for all tests here so set it up.
        mockBT = utils_1.MakeMockWebBluetoothDevice(Lovense_1.Lovense.DeviceInfo);
        utils_1.SetupLovenseTestDevice(mockBT);
        const g = global;
        g.navigator = g.navigator || {};
        bluetooth = new web_bluetooth_mock_1.WebBluetoothMock([mockBT.device]);
        g.navigator.bluetooth = bluetooth;
        bp = new Client_1.ButtplugClient("Bluetooth Test Client");
        yield bp.ConnectLocal();
    }));
    it("should find webbluetooth, add manager, discover device", () => __awaiter(this, void 0, void 0, function* () {
        jest.spyOn(bluetooth, "requestDevice");
        jest.spyOn(mockBT.gatt, "connect");
        yield bp.StartScanning();
        expect(bluetooth.requestDevice).toHaveBeenCalled();
        expect(mockBT.gatt.connect).toHaveBeenCalled();
    }));
    it("should emit device removed on disconnect", () => __awaiter(this, void 0, void 0, function* () {
        bp.on("deviceremoved", () => res());
        yield bp.StartScanning();
        yield bp.StopScanning();
        mockBT.device.dispatchEvent(new Event("gattserverdisconnected"));
        return p;
    }));
    it("should write value to port on message", () => __awaiter(this, void 0, void 0, function* () {
        yield bp.StartScanning();
        yield bp.StopScanning();
        jest.spyOn(mockBT.txChar, "writeValue");
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 1)]));
        expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:20;"));
    }));
    it("should stop scanning on requestdevice being cancelled", () => __awaiter(this, void 0, void 0, function* () {
        bp.on("scanningfinished", () => res());
        bluetooth.requestDevice = () => {
            throw new Error("User cancelled");
        };
        yield bp.StartScanning();
        return p;
    }));
    it("should stop scanning on device not opening", () => __awaiter(this, void 0, void 0, function* () {
        bp.on("scanningfinished", () => res());
        mockBT.gatt.connect = () => {
            throw new Error("Connection error");
        };
        // Make sure we at least have the right error code. Id and message may vary.
        yield expect(bp.StartScanning()).rejects.toHaveProperty("ErrorCode", index_1.ErrorClass.ERROR_DEVICE);
        return p;
    }));
    it("should subscribe on connect for lovense device, unsubscribe on disconnect", () => __awaiter(this, void 0, void 0, function* () {
        jest.spyOn(mockBT.rxChar, "startNotifications");
        jest.spyOn(mockBT.rxChar, "stopNotifications");
        yield bp.StartScanning();
        yield bp.StopScanning();
        expect(mockBT.rxChar.startNotifications).toBeCalled();
        yield bp.Disconnect();
        expect(mockBT.rxChar.stopNotifications).toBeCalled();
    }));
});
//# sourceMappingURL=test-webbluetooth.js.map
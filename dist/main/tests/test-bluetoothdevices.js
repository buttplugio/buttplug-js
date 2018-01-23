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
const WeVibe_1 = require("../src/server/bluetooth/devices/WeVibe");
const FleshlightLaunch_1 = require("../src/server/bluetooth/devices/FleshlightLaunch");
const VorzeA10Cyclone_1 = require("../src/server/bluetooth/devices/VorzeA10Cyclone");
utils_1.SetupTestSuite();
describe("WebBluetooth library tests", () => {
    let p;
    let res;
    let rej;
    let bp;
    let mockBT;
    let bluetooth;
    beforeEach(() => {
        p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    });
    const SetupDevice = (deviceInfo) => __awaiter(this, void 0, void 0, function* () {
        const g = global;
        mockBT = utils_1.MakeMockWebBluetoothDevice(deviceInfo);
        g.navigator = g.navigator || {};
        bluetooth = new web_bluetooth_mock_1.WebBluetoothMock([mockBT.device]);
        g.navigator.bluetooth = bluetooth;
        bp = new Client_1.ButtplugClient("Bluetooth Test Client");
        yield bp.ConnectLocal();
    });
    it("should convert lovense commands properly", () => __awaiter(this, void 0, void 0, function* () {
        yield SetupDevice(Lovense_1.LovenseRev5.DeviceInfo);
        yield bp.StartScanning();
        yield bp.StopScanning();
        jest.spyOn(mockBT.txChar, "writeValue");
        yield expect(bp.SendDeviceMessage(bp.Devices[0], new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 1),
            new index_1.SpeedSubcommand(0, 2)]))).rejects.toThrow();
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 1)]));
        expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:20;"));
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.SingleMotorVibrateCmd(.5));
        expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:10;"));
        yield bp.StopAllDevices();
        expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:0;"));
    }));
    it("should convert wevibe commands properly", () => __awaiter(this, void 0, void 0, function* () {
        yield SetupDevice(WeVibe_1.WeVibe.DeviceInfo);
        yield bp.StartScanning();
        yield bp.StopScanning();
        jest.spyOn(mockBT.txChar, "writeValue");
        yield expect(bp.SendDeviceMessage(bp.Devices[0], new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 1),
            new index_1.SpeedSubcommand(1, 1)]))).rejects.toThrow();
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 1)]));
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x0f, 0x03, 0x00, 0xff, 0x00, 0x03, 0x00, 0x00]));
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.SingleMotorVibrateCmd(.5));
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x0f, 0x03, 0x00, 0x77, 0x00, 0x03, 0x00, 0x00]));
        yield bp.StopAllDevices();
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x0f, 0x03, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00]));
    }));
    it("should convert fleshlight commands properly", () => __awaiter(this, void 0, void 0, function* () {
        yield SetupDevice(FleshlightLaunch_1.FleshlightLaunch.DeviceInfo);
        yield bp.StartScanning();
        yield bp.StopScanning();
        jest.spyOn(mockBT.txChar, "writeValue");
        yield expect(bp.SendDeviceMessage(bp.Devices[0], new index_1.LinearCmd([new index_1.VectorSubcommand(0, 1, 1),
            new index_1.VectorSubcommand(1, 1, 1)]))).rejects.toThrow();
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.FleshlightLaunchFW12Cmd(99, 99));
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([99, 99]));
        // We should expect to be at position 99 here, so calculate time and
        // movement from that accordingly.
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.LinearCmd([new index_1.VectorSubcommand(0, .5, 500)]));
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([49, 19]));
        yield bp.StopAllDevices();
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0, 0]));
    }));
    it("should convert vorze commands properly", () => __awaiter(this, void 0, void 0, function* () {
        yield SetupDevice(VorzeA10Cyclone_1.VorzeA10Cyclone.DeviceInfo);
        yield bp.StartScanning();
        yield bp.StopScanning();
        jest.spyOn(mockBT.txChar, "writeValue");
        yield expect(bp.SendDeviceMessage(bp.Devices[0], new index_1.RotateCmd([new index_1.RotateSubcommand(0, 1, true),
            new index_1.RotateSubcommand(1, 1, false)]))).rejects.toThrow();
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.RotateCmd([new index_1.RotateSubcommand(0, 1, true)]));
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x01, 0x01, (100 | (0x80)) & 0xff]));
        yield bp.SendDeviceMessage(bp.Devices[0], new index_1.VorzeA10CycloneCmd(50, false));
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x01, 0x01, 50]));
        yield bp.StopAllDevices();
        expect(mockBT.txChar.writeValue).toBeCalledWith(new Uint8Array([0x01, 0x01, 0]));
    }));
});
//# sourceMappingURL=test-bluetoothdevices.js.map
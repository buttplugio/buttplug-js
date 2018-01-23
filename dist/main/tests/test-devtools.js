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
const index_1 = require("../src/devtools/index");
const index_2 = require("../src/index");
describe("devtools tests", () => {
    let p;
    let res;
    let rej;
    function resetTestPromise() {
        p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
    }
    beforeEach(() => {
        resetTestPromise();
    });
    it("should translate test device calls correctly", () => __awaiter(this, void 0, void 0, function* () {
        const bp = yield index_1.CreateDevToolsClient();
        const tdm = index_1.TestDeviceManager.Get();
        let deviceCount = 0;
        bp.on("deviceadded", (x) => {
            deviceCount += 1;
            if (deviceCount === 2) {
                res();
            }
        });
        yield bp.StartScanning();
        yield p;
        const vibrateDevice = tdm.VibrationDevice;
        const linearDevice = tdm.LinearDevice;
        resetTestPromise();
        vibrateDevice.on("vibrate", (speed) => {
            res(speed);
        });
        yield bp.SendDeviceMessage(bp.Devices[0], new index_2.SingleMotorVibrateCmd(1));
        yield expect(p).resolves.toBe(1);
        resetTestPromise();
        vibrateDevice.removeAllListeners();
        vibrateDevice.on("vibrate", (speed) => {
            res(speed);
        });
        yield bp.SendDeviceMessage(bp.Devices[0], new index_2.VibrateCmd([new index_2.SpeedSubcommand(0, 0.5)]));
        yield expect(p).resolves.toBe(0.5);
        resetTestPromise();
        vibrateDevice.removeAllListeners();
        vibrateDevice.on("vibrate", (speed) => {
            res(speed);
        });
        yield bp.StopAllDevices();
        yield expect(p).resolves.toBe(0);
        resetTestPromise();
        vibrateDevice.removeAllListeners();
        linearDevice.on("linear", (obj) => {
            res(obj);
        });
        yield bp.SendDeviceMessage(bp.Devices[1], new index_2.FleshlightLaunchFW12Cmd(50, 50));
        yield expect(p).resolves.toEqual({ position: 50, speed: 50 });
        resetTestPromise();
        linearDevice.removeAllListeners();
        linearDevice.on("linear", (obj) => {
            res(obj);
        });
        yield bp.SendDeviceMessage(bp.Devices[1], new index_2.LinearCmd([new index_2.VectorSubcommand(0, .25, 300)]));
        yield expect(p).resolves.toEqual({ position: 27, speed: 16 });
        resetTestPromise();
        linearDevice.removeAllListeners();
        linearDevice.on("linear", (obj) => {
            res(obj);
        });
        yield bp.StopAllDevices();
        yield expect(p).resolves.toEqual({ position: 27, speed: 16 });
    }));
});
//# sourceMappingURL=test-devtools.js.map
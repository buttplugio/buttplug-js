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
const utils_1 = require("./utils");
const index_1 = require("../src/index");
utils_1.SetupTestSuite();
describe("Message Utils Tests", () => {
    const testVibrateDevice = new index_1.Device(0, "Test Vibrate Device", {
        VibrateCmd: { FeatureCount: 2 },
    });
    const testRotateDevice = new index_1.Device(0, "Test Rotate Device", {
        RotateCmd: { FeatureCount: 1 },
    });
    const testLinearDevice = new index_1.Device(0, "Test Linear Device", {
        LinearCmd: { FeatureCount: 1 },
    });
    it("should create correct messages", () => {
        expect(index_1.CreateSimpleVibrateCmd(testVibrateDevice, 0.5))
            .toEqual(new index_1.VibrateCmd([new index_1.SpeedSubcommand(0, 0.5), new index_1.SpeedSubcommand(1, .5)], 0, 1));
        expect(index_1.CreateSimpleRotateCmd(testRotateDevice, 0.5, true))
            .toEqual(new index_1.RotateCmd([new index_1.RotateSubcommand(0, 0.5, true)], 0, 1));
        expect(index_1.CreateSimpleLinearCmd(testLinearDevice, 0.5, 0.5))
            .toEqual(new index_1.LinearCmd([new index_1.VectorSubcommand(0, 0.5, 0.5)], 0, 1));
    });
    it("should throw on wrong allowed messages", () => {
        expect(() => index_1.CreateSimpleVibrateCmd(testRotateDevice, 0.5)).toThrow();
        expect(() => index_1.CreateSimpleLinearCmd(testRotateDevice, 0.5, 0.5)).toThrow();
        expect(() => index_1.CreateSimpleRotateCmd(testVibrateDevice, 0.5, true)).toThrow();
    });
    it("should reject on out of bounds arguments", () => __awaiter(this, void 0, void 0, function* () {
        expect(() => index_1.CreateSimpleVibrateCmd(testVibrateDevice, 1.5)).toThrow();
        expect(() => index_1.CreateSimpleVibrateCmd(testVibrateDevice, -0.5)).toThrow();
        expect(() => index_1.CreateSimpleRotateCmd(testRotateDevice, 1.5, true)).toThrow();
        expect(() => index_1.CreateSimpleRotateCmd(testRotateDevice, -0.5, true)).toThrow();
        expect(() => index_1.CreateSimpleLinearCmd(testRotateDevice, 1.5, 1000)).toThrow();
        expect(() => index_1.CreateSimpleLinearCmd(testRotateDevice, -0.5, 1000)).toThrow();
    }));
});
//# sourceMappingURL=test-messageutils.js.map
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
const BluetoothDeviceInfo_1 = require("../BluetoothDeviceInfo");
const ButtplugBluetoothDevice_1 = require("../ButtplugBluetoothDevice");
const Messages = require("../../../core/Messages");
class WeVibe extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super(`WeVibe ${aDeviceImpl.Name}`, aDeviceImpl);
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Speeds.length !== 1) {
                return new Messages.Error(`WeVibe devices require VibrateCmd to have 1 speed command, ` +
                    `${aMsg.Speeds.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            const speed = Math.floor(aMsg.Speed * 15);
            const data = new Uint8Array([0x0f, 0x03, 0x00, (speed << 4) | (speed), 0x00, 0x03, 0x00, 0x00]);
            yield this._deviceImpl.WriteValue("tx", data);
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
        this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            return new WeVibe(aDeviceImpl);
        });
    }
    get MessageSpecifications() {
        return {
            VibrateCmd: { FeatureCount: 1 },
            SingleMotorVibrateCmd: {},
            StopDeviceCmd: {},
        };
    }
}
WeVibe.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["4 Plus", "Ditto", "Nova", "Wish",
    "Pivot", "Verge", "Cougar"], ["f000bb03-0451-4000-b000-000000000000"], { tx: "f000c000-0451-4000-b000-000000000000",
    rx: "f000b000-0451-4000-b000-000000000000" }, WeVibe.CreateInstance);
exports.WeVibe = WeVibe;
//# sourceMappingURL=WeVibe.js.map
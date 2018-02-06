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
class Maxpro extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super(`Maxpro ${aDeviceImpl.Name}`, aDeviceImpl);
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Speeds.length !== 1) {
                return new Messages.Error(`Maxpro devices require VibrateCmd to have 1 speed command, ` +
                    `${aMsg.Speeds.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            // Speed range for Maxpro toys are 10-100 for some reason.
            const speed = Math.floor(aMsg.Speed * 100);
            const data = new Uint8Array([0x55, 0x04, 0x07, 0xff, 0xff, 0x3f, speed, 0x5f, speed, 0x00]);
            const checksum = data.reduce((prev, cur) => prev + cur) & 0xFF;
            data[9] = checksum;
            yield this._deviceImpl.WriteValue("tx", data);
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
        this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Maxpro(aDeviceImpl);
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
Maxpro.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["M2"], ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], { tx: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
    rx: "6e400003-b5a3-f393-e0a9-e50e24dcca9e" }, Maxpro.CreateInstance);
exports.Maxpro = Maxpro;
//# sourceMappingURL=Maxpro.js.map
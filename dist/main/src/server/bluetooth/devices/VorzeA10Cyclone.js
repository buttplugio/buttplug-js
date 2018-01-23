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
class VorzeA10Cyclone extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super("Vorze A10 Cyclone", aDeviceImpl);
        this.HandleRotateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Rotations.length !== 1) {
                return new Messages.Error(`Vorze A10 Cyclone devices require RotateCmd to have 1 rotation command,` +
                    ` ${aMsg.Rotations.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleVorzeA10CycloneCmd(new Messages.VorzeA10CycloneCmd(aMsg.Rotations[0].Speed * 100, aMsg.Rotations[0].Clockwise, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleVorzeA10CycloneCmd(new Messages.VorzeA10CycloneCmd(0, false, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleVorzeA10CycloneCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            const rawSpeed = (((aMsg.Clockwise ? 1 : 0) << 7) | aMsg.Speed) & 0xff;
            yield this._deviceImpl.WriteValue("tx", new Uint8Array([0x01, 0x01, rawSpeed]));
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.VorzeA10CycloneCmd.name, this.HandleVorzeA10CycloneCmd);
        this.MsgFuncs.set(Messages.RotateCmd.name, this.HandleRotateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Send initializer byte
            aDeviceImpl.WriteValue("cmd", new Uint8Array([0x00]));
            return new VorzeA10Cyclone(aDeviceImpl);
        });
    }
    get MessageSpecifications() {
        return {
            RotateCmd: { FeatureCount: 1 },
            VorzeA10CycloneCmd: {},
            StopDeviceCmd: {},
        };
    }
}
VorzeA10Cyclone.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["CycSA"], ["40ee1111-63ec-4b7f-8ce7-712efd55b90e"], { tx: "40ee2222-63ec-4b7f-8ce7-712efd55b90e" }, VorzeA10Cyclone.CreateInstance);
exports.VorzeA10Cyclone = VorzeA10Cyclone;
//# sourceMappingURL=VorzeA10Cyclone.js.map
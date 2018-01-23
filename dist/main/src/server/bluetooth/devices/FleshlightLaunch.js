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
class FleshlightLaunch extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super("Fleshlight Launch", aDeviceImpl);
        this._lastPosition = 0;
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(0, 0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleFleshlightLaunchFW12Cmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._lastPosition = aMsg.Position;
            yield this._deviceImpl.WriteValue("tx", new Uint8Array([aMsg.Position, aMsg.Speed]));
            return new Messages.Ok(aMsg.Id);
        });
        this.HandleLinearCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Vectors.length !== 1) {
                return new Messages.Error("LinearCmd requires 1 vector for this device.", Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            // Move between 5/95, otherwise we'll allow the device to smack into hard
            // stops because of braindead firmware.
            const range = 90;
            const vector = aMsg.Vectors[0];
            const currentPosition = vector.Position * 100;
            const positionDelta = Math.abs(currentPosition - this._lastPosition);
            let speed = Math.floor(25000 * Math.pow(((vector.Duration * 90) / positionDelta), -1.05));
            // Clamp speed on 0 <= x <= 95 so we don't break the launch.
            speed = Math.min(Math.max(speed, 0), 95);
            const positionGoal = Math.floor(((currentPosition / 99) * range) + ((99 - range) / 2));
            // We'll set this._lastPosition in FleshlightLaunchFW12Cmd, since
            // everything kinda funnels to that.
            return yield this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(speed, positionGoal, aMsg.DeviceIndex, aMsg.Id));
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
        this.MsgFuncs.set(Messages.LinearCmd.name, this.HandleLinearCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            // Send initializer byte
            yield aDeviceImpl.WriteValue("cmd", new Uint8Array([0x00]));
            return new FleshlightLaunch(aDeviceImpl);
        });
    }
    get MessageSpecifications() {
        return {
            FleshlightLaunchFW12Cmd: {},
            StopDeviceCmd: {},
            LinearCmd: { FeatureCount: 1 },
        };
    }
}
FleshlightLaunch.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["Launch"], ["88f80580-0000-01e6-aace-0002a5d5c51b"], { cmd: "88f80583-0000-01e6-aace-0002a5d5c51b",
    // rx: "88f80582-0000-01e6-aace-0002a5d5c51b",
    tx: "88f80581-0000-01e6-aace-0002a5d5c51b" }, FleshlightLaunch.CreateInstance);
exports.FleshlightLaunch = FleshlightLaunch;
//# sourceMappingURL=FleshlightLaunch.js.map
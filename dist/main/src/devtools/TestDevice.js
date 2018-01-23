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
const index_1 = require("../index");
const Messages = require("../index");
class TestDevice extends index_1.ButtplugDevice {
    constructor(name, shouldVibrate = false, shouldLinear = false) {
        super(`Test Device - ${name}`);
        this._connected = false;
        this._linearSpeed = 0;
        this._linearPosition = 0;
        this._vibrateSpeed = 0;
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (this.MsgFuncs.has(Messages.VibrateCmd.name)) {
                this.emit("vibrate", 0);
            }
            else if (this.MsgFuncs.has(Messages.LinearCmd.name)) {
                this.emit("linear", { position: this._linearPosition,
                    speed: this._linearSpeed });
            }
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._vibrateSpeed = aMsg.Speed;
            this.emit("vibrate", aMsg.Speed);
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return this.HandleSingleMotorVibrateCmd(new index_1.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleFleshlightLaunchFW12Cmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._linearPosition = aMsg.Position;
            this._linearSpeed = aMsg.Speed;
            this.emit("linear", { position: this._linearPosition,
                speed: this._linearSpeed });
            return Promise.resolve(new Messages.Ok(aMsg.Id));
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
            const positionDelta = Math.abs(currentPosition - this._linearPosition);
            let speed = Math.floor(25000 * Math.pow(((vector.Duration * 90) / positionDelta), -1.05));
            // Clamp speed on 0 <= x <= 95 so we don't break the launch.
            speed = Math.min(Math.max(speed, 0), 95);
            const positionGoal = Math.floor(((currentPosition / 99) * range) + ((99 - range) / 2));
            // We'll set this._lastPosition in FleshlightLaunchFW12Cmd, since
            // everything kinda funnels to that.
            return yield this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(speed, positionGoal, aMsg.DeviceIndex, aMsg.Id));
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        if (shouldVibrate) {
            this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
            this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
        }
        if (shouldLinear) {
            this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd.name, this.HandleFleshlightLaunchFW12Cmd);
            this.MsgFuncs.set(Messages.LinearCmd.name, this.HandleLinearCmd);
        }
    }
    get Connected() {
        return this._connected;
    }
    set Connected(connected) {
        this._connected = connected;
    }
    get MessageSpecifications() {
        if (this.MsgFuncs.has(Messages.VibrateCmd.name)) {
            return {
                VibrateCmd: { FeatureCount: 1 },
                SingleMotorVibrateCmd: {},
                StopDeviceCmd: {},
            };
        }
        else if (this.MsgFuncs.has(Messages.LinearCmd.name)) {
            return {
                LinearCmd: { FeatureCount: 1 },
                FleshlightLaunchFW12Cmd: {},
                StopDeviceCmd: {},
            };
        }
        return {};
    }
    Disconnect() {
        this.emit("deviceremoved", this);
    }
}
exports.TestDevice = TestDevice;
//# sourceMappingURL=TestDevice.js.map
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
const Messages_1 = require("../../../core/Messages");
class Lovense extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super(`Lovense ${aDeviceImpl.Name}`, aDeviceImpl);
        this._initPromise = new Promise((res, rej) => { this._initResolve = res; });
        this._isClockwise = false;
        this._specs = {
            VibrateCmd: { FeatureCount: 1 },
            SingleMotorVibrateCmd: {},
            StopDeviceCmd: {},
        };
        this.Initialize = () => __awaiter(this, void 0, void 0, function* () {
            this._deviceImpl.addListener("characteristicvaluechanged", this.OnValueChanged);
            yield this._deviceImpl.Subscribe("rx");
            yield this._deviceImpl.WriteString("tx", "DeviceType;");
            yield this._initPromise;
        });
        this.OnValueChanged = (aCharacteristic, aValue) => __awaiter(this, void 0, void 0, function* () {
            // If we haven't initialized yet, consider this to be the first read, for the device info.
            if (this._initResolve !== undefined) {
                this.ParseDeviceType(aValue.toString());
                const res = this._initResolve;
                this._initResolve = undefined;
                res();
                return;
            }
            // TODO Fill in battery/accelerometer/etc reads
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
            if (this._specs.hasOwnProperty("RotateCmd")) {
                this.HandleRotateCmd(new Messages.RotateCmd([new Messages_1.RotateSubcommand(0, 0, this._isClockwise)], 0, aMsg.Id));
            }
            return new Messages.Ok(aMsg.Id);
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            const speeds = [];
            for (let i = 0; i < this._specs.VibrateCmd.FeatureCount; i++) {
                speeds.push(new Messages.SpeedSubcommand(i, aMsg.Speed));
            }
            return yield this.HandleVibrateCmd(new Messages.VibrateCmd(speeds, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Speeds.length > this._specs.VibrateCmd.FeatureCount) {
                return new Messages.Error(`Lovense devices require VibrateCmd to have at most ` +
                    `${this._specs.VibrateCmd.FeatureCount} speed commands, ` +
                    `${aMsg.Speeds.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            for (const cmd of aMsg.Speeds) {
                const index = this._specs.VibrateCmd.FeatureCount > 1 ? (cmd.Index + 1).toString(10) : "";
                const speed = Math.floor(20 * cmd.Speed);
                yield this._deviceImpl.WriteString("tx", `Vibrate${index}:${speed};`);
            }
            return new Messages.Ok(aMsg.Id);
        });
        this.HandleRotateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Rotations.length !== 1) {
                return new Messages.Error(`Lovense devices require RotateCmd to have 1 rotate command, ` +
                    `${aMsg.Rotations.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            const rotateCmd = aMsg.Rotations[0];
            if (rotateCmd.Index !== 0) {
                return new Messages.Error("Rotation command sent for invalid index.");
            }
            if (rotateCmd.Clockwise !== this._isClockwise) {
                yield this._deviceImpl.WriteString("tx", "RotateChange;");
            }
            const speed = Math.floor(20 * rotateCmd.Speed);
            yield this._deviceImpl.WriteString("tx", `Rotate:${speed};`);
            return new Messages.Ok(aMsg.Id);
        });
    }
    static CreateInstance(aDeviceImpl) {
        return __awaiter(this, void 0, void 0, function* () {
            const dev = new Lovense(aDeviceImpl);
            yield dev.Initialize();
            return dev;
        });
    }
    get MessageSpecifications() {
        return this._specs;
    }
    ParseDeviceType(aDeviceType) {
        // Typescript gets angry if we try to destructure this into consts/lets
        // differently or all lets (since deviceVersion never changes and
        // deviceAddress isn't used), and I don't wanna deal with assigning to const
        // then let, so this works well enough.
        let deviceLetter;
        let deviceVersion;
        let deviceAddress;
        [deviceLetter, deviceVersion, deviceAddress] = aDeviceType.split(":");
        if (!Lovense._deviceNames.hasOwnProperty(deviceLetter)) {
            deviceLetter = "0";
        }
        this._name = `Lovense ${Lovense._deviceNames[deviceLetter]} v${deviceVersion}`;
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
        this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
        if (deviceLetter === "P") {
            // Edge has 2 motors
            this._specs.VibrateCmd = { FeatureCount: 2 };
        }
        else if (deviceLetter === "A" || deviceLetter === "C") {
            // Nora has rotation
            this._specs.RotateCmd = { FeatureCount: 1 };
            this.MsgFuncs.set(Messages.RotateCmd.name, this.HandleRotateCmd);
        }
    }
}
Lovense.DeviceInfo = (() => {
    // Start with the two non-standard UUIDs, which come from the original
    // versions of the Max/Nora toys.
    const uuids = ["0000fff0-0000-1000-8000-00805f9b34fb",
        "6e400001-b5a3-f393-e0a9-e50e24dcca9e"];
    // Future-proofing for possible Lovense UUIDs, based on the pattern of the
    // current firmware.
    for (let i = 0; i < 16; ++i) {
        uuids.push(`5${i.toString(16)}300001-0023-4bd4-bbd5-a6920e4c5653`);
        uuids.push(`5${i.toString(16)}300001-0024-4bd4-bbd5-a6920e4c5653`);
    }
    return new BluetoothDeviceInfo_1.BluetoothDeviceInfo([], ["LVS"], uuids, {}, Lovense.CreateInstance);
})();
Lovense._deviceNames = {
    A: "Nora",
    B: "Max",
    C: "Nora",
    L: "Ambi",
    O: "Osci",
    P: "Edge",
    S: "Lush",
    W: "Domi",
    Z: "Hush",
    0: "Unknown",
};
exports.Lovense = Lovense;
//# sourceMappingURL=Lovense.js.map
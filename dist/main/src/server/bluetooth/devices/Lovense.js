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
class Lovense extends ButtplugBluetoothDevice_1.ButtplugBluetoothDevice {
    constructor(aDeviceImpl) {
        super(`Lovense ${aDeviceImpl.Name}`, aDeviceImpl);
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Speeds.length !== 1) {
                return new Messages.Error(`Lovense devices require VibrateCmd to have 1 speed command, ` +
                    `${aMsg.Speeds.length} sent.`, Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return yield this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            const speed = Math.floor(20 * aMsg.Speed);
            yield this._deviceImpl.WriteValue("tx", Buffer.from("Vibrate:" + speed + ";"));
            return new Messages.Ok(aMsg.Id);
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd.name, this.HandleStopDeviceCmd);
        this.MsgFuncs.set(Messages.VibrateCmd.name, this.HandleVibrateCmd);
        this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, this.HandleSingleMotorVibrateCmd);
    }
    static CreateInstance(aDeviceImpl) {
        return Promise.resolve(new Lovense(aDeviceImpl));
    }
    get MessageSpecifications() {
        return {
            VibrateCmd: { FeatureCount: 1 },
            SingleMotorVibrateCmd: {},
            StopDeviceCmd: {},
        };
    }
}
Lovense._deviceNames = { "LVS-A011": "Nora",
    "LVS-C011": "Nora",
    "LVS-B011": "Max",
    "LVS-L009": "Ambi",
    "LVS-S001": "Lush",
    "LVS-S35": "Lush",
    "LVS-Z36": "Hush",
    "LVS-Z001": "Hush",
    "LVS_Z001": "Hush",
    "LVS-Hush41": "Hush",
    "LVS-Domi37": "Domi",
    "LVS-Domi38": "Domi",
    "LVS-Domi39": "Domi",
    "LVS-Domi40": "Domi",
    "LVS-P36": "Edge",
    "LVS-Edge37": "Edge",
    "LVS-Edge38": "Edge",
    "LVS-Edge39": "Edge",
    "LVS-Edge40": "Edge",
    "LVS-Lush41": "Lush" };
exports.Lovense = Lovense;
class LovenseRev1 {
}
LovenseRev1.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-A011", "LVS-C011", "LVS-B011", "LVS-L009"], ["0000fff0-0000-1000-8000-00805f9b34fb"], { tx: "0000fff2-0000-1000-8000-00805f9b34fb",
}, Lovense.CreateInstance);
exports.LovenseRev1 = LovenseRev1;
class LovenseRev2 {
}
LovenseRev2.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-S001", "LVS-Z001", "LVS_Z001"], ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], { tx: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
}, Lovense.CreateInstance);
exports.LovenseRev2 = LovenseRev2;
class LovenseRev3 {
}
LovenseRev3.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-P36"], ["50300001-0024-4bd4-bbd5-a6920e4c5653"], { tx: "50300002-0024-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev3 = LovenseRev3;
class LovenseRev4 {
}
LovenseRev4.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Domi37", "LVS-Domi38", "LVS-Domi39", "LVS-Domi40"], ["57300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "57300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev4 = LovenseRev4;
class LovenseRev5 {
}
LovenseRev5.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Z36"], ["5a300001-0024-4bd4-bbd5-a6920e4c5653"], { tx: "5a300002-0024-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev5 = LovenseRev5;
class LovenseRev6 {
}
LovenseRev6.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Edge37", "LVS-Edge38", "LVS-Edge39", "LVS-Edge40"], ["50300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "50300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev6 = LovenseRev6;
class LovenseRev7 {
}
LovenseRev7.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-S35"], ["53300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "53300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev7 = LovenseRev7;
class LovenseRev8 {
}
LovenseRev8.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Hush41"], ["5a300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "5a300002-0023-4bd4-bbd5-a6920e4c5653",
}, Lovense.CreateInstance);
exports.LovenseRev8 = LovenseRev8;
//# sourceMappingURL=Lovense.js.map
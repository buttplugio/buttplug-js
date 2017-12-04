"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var BluetoothDeviceInfo_1 = require("../BluetoothDeviceInfo");
var ButtplugBluetoothDevice_1 = require("../ButtplugBluetoothDevice");
var Messages = require("../../../core/Messages");
// The TextEncoder polyfill is 600k (DAMNIT JOSH). Locally (for things like the
// node device manager), not a huge deal. For web hosted libraries, we'll assume
// the browser has it and ignore the require, since this class is only really
// useful for browsers with WebBluetooth anyways.
var TextEncoder = typeof (window) !== "undefined" ? window.TextEncoder : undefined;
if (TextEncoder === undefined) {
    TextEncoder = require("text-encoding").TextEncoder;
}
var Lovense = /** @class */ (function (_super) {
    __extends(Lovense, _super);
    function Lovense(aDeviceImpl) {
        var _this = _super.call(this, "Lovense " + aDeviceImpl.Name, aDeviceImpl) || this;
        _this.HandleStopDeviceCmd = function (aMsg) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.HandleSingleMotorVibrateCmd(new Messages.SingleMotorVibrateCmd(0, aMsg.DeviceIndex, aMsg.Id))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        _this.HandleSingleMotorVibrateCmd = function (aMsg) { return __awaiter(_this, void 0, void 0, function () {
            var speed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        speed = Math.floor(20 * aMsg.Speed);
                        return [4 /*yield*/, this._deviceImpl.WriteValue("tx", new TextEncoder().encode("Vibrate:" + speed + ";"))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Messages.Ok(aMsg.Id)];
                }
            });
        }); };
        _this.MsgFuncs.set(Messages.StopDeviceCmd.name, _this.HandleStopDeviceCmd);
        _this.MsgFuncs.set(Messages.SingleMotorVibrateCmd.name, _this.HandleSingleMotorVibrateCmd);
        return _this;
    }
    Lovense.CreateInstance = function (aDeviceImpl) {
        return Promise.resolve(new Lovense(aDeviceImpl));
    };
    Lovense._deviceNames = { "LVS-A011": "Nora",
        "LVS-C011": "Nora",
        "LVS-B011": "Max",
        "LVS-L009": "Ambi",
        "LVS-S001": "Lush",
        "LVS-Z001": "Hush",
        "LVS-P36": "Edge" };
    return Lovense;
}(ButtplugBluetoothDevice_1.ButtplugBluetoothDevice));
exports.Lovense = Lovense;
var LovenseRev1 = /** @class */ (function () {
    function LovenseRev1() {
    }
    LovenseRev1.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-A011", "LVS-C011", "LVS-B011", "LVS-L009"], ["0000fff0-0000-1000-8000-00805f9b34fb"], { tx: "0000fff2-0000-1000-8000-00805f9b34fb",
    }, Lovense.CreateInstance);
    return LovenseRev1;
}());
exports.LovenseRev1 = LovenseRev1;
var LovenseRev2 = /** @class */ (function () {
    function LovenseRev2() {
    }
    LovenseRev2.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-S001", "LVS-Z001"], ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"], { tx: "6e400002-b5a3-f393-e0a9-e50e24dcca9e",
    }, Lovense.CreateInstance);
    return LovenseRev2;
}());
exports.LovenseRev2 = LovenseRev2;
var LovenseRev3 = /** @class */ (function () {
    function LovenseRev3() {
    }
    LovenseRev3.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-P36"], ["50300001-0024-4bd4-bbd5-a6920e4c5653"], { tx: "50300002-0024-4bd4-bbd5-a6920e4c5653",
    }, Lovense.CreateInstance);
    return LovenseRev3;
}());
exports.LovenseRev3 = LovenseRev3;
var LovenseRev4 = /** @class */ (function () {
    function LovenseRev4() {
    }
    LovenseRev4.DeviceInfo = new BluetoothDeviceInfo_1.BluetoothDeviceInfo(["LVS-Domi37"], ["57300001-0023-4bd4-bbd5-a6920e4c5653"], { tx: "57300002-0023-4bd4-bbd5-a6920e4c5653",
    }, Lovense.CreateInstance);
    return LovenseRev4;
}());
exports.LovenseRev4 = LovenseRev4;
//# sourceMappingURL=Lovense.js.map
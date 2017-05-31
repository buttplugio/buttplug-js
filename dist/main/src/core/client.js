'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Messages = require("./messages");
const device_1 = require("./device");
class ButtplugClient extends events_1.EventEmitter {
    constructor() {
        super();
        this._devices = new Map();
        this._counter = 1;
        this._waitingMsgs = new Map();
        this.Connect = (aUrl) => {
            this._ws = new WebSocket(aUrl);
            this._ws.addEventListener('message', (ev) => { this.ParseIncomingMessage(ev); });
        };
        this.SendMsgExpectOk = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            let res, rej;
            let msg = yield this.SendMessage(aMsg);
            let p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
            switch (msg.getType()) {
                case 'Ok':
                    res();
                    break;
                default:
                    rej();
                    break;
            }
            return p;
        });
        this.RequestDeviceList = () => __awaiter(this, void 0, void 0, function* () {
            let deviceList = (yield this.SendMessage(new Messages.RequestDeviceList()));
            deviceList.Devices.forEach((d) => {
                if (!this._devices.has(d.DeviceIndex)) {
                    let device = device_1.Device.fromMsg(d);
                    this._devices.set(d.DeviceIndex, device);
                    this.emit('deviceadded', device);
                }
            });
        });
        this.StartScanning = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.SendMsgExpectOk(new Messages.StartScanning());
        });
        this.StopScanning = () => __awaiter(this, void 0, void 0, function* () {
            return yield this.SendMsgExpectOk(new Messages.StopScanning());
        });
        this.RequestLog = (aLogLevel) => __awaiter(this, void 0, void 0, function* () {
            return yield this.SendMsgExpectOk(new Messages.RequestLog(aLogLevel));
        });
        this.ParseJSONMessage = (aJSONMsg) => {
            let msgs = Messages.FromJSON(aJSONMsg);
            msgs.forEach((x) => {
                if (x.Id > 0 && this._waitingMsgs.has(x.Id)) {
                    let res = this._waitingMsgs.get(x.Id);
                    // We already checked for this via has, but typescript is bitching if I
                    // don't do it again.
                    if (res === undefined) {
                        return;
                    }
                    res(x);
                    return;
                }
                switch (x.constructor.name) {
                    case 'Log':
                        this.emit('log', x);
                        break;
                    case 'DeviceAdded':
                        let added_msg = x;
                        let d = device_1.Device.fromMsg(added_msg);
                        this._devices.set(added_msg.DeviceIndex, d);
                        this.emit('deviceadded', d);
                        break;
                    case 'DeviceRemoved':
                        let removed_msg = x;
                        if (this._devices.has(removed_msg.DeviceIndex)) {
                            let d = this._devices.get(removed_msg.DeviceIndex);
                            this._devices.delete(removed_msg.DeviceIndex);
                            this.emit('deviceremoved', d);
                        }
                        break;
                }
                ;
            });
        };
        this.ParseIncomingMessage = (aEvent) => {
            if (typeof (aEvent.data) === 'string') {
                this.ParseJSONMessage(aEvent.data);
            }
            else if (aEvent.data instanceof Blob) {
                let reader = new FileReader();
                reader.addEventListener('load', (ev) => { this.OnReaderLoad(ev); });
                reader.readAsText(aEvent.data);
            }
        };
    }
    SendMessage(aMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            aMsg.Id = this._counter;
            let msgPromise = new Promise(resolve => { res = resolve; });
            this._waitingMsgs.set(this._counter, res);
            this._counter += 1;
            this._ws.send("[" + aMsg.toJSON() + "]");
            return yield msgPromise;
        });
    }
    OnReaderLoad(aEvent) {
        this.ParseJSONMessage(aEvent.target.result);
    }
    SendDeviceMessage(aDevice, aDeviceMsg) {
        return __awaiter(this, void 0, void 0, function* () {
            let dev = this._devices.get(aDevice.Index);
            if (dev === undefined) {
                return Promise.reject(new Error("Device not available."));
            }
            if (dev.AllowedMessages.indexOf(aDeviceMsg.getType()) == -1) {
                return Promise.reject(new Error("Device does not accept that message type."));
            }
            aDeviceMsg.DeviceIndex = aDevice.Index;
            return yield this.SendMsgExpectOk(aDeviceMsg);
        });
    }
}
exports.ButtplugClient = ButtplugClient;
//# sourceMappingURL=client.js.map
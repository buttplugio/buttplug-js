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
const Logging_1 = require("../../core/Logging");
const events_1 = require("events");
class WebBluetoothDevice extends events_1.EventEmitter {
    constructor(_deviceInfo, _device) {
        super();
        this._deviceInfo = _deviceInfo;
        this._device = _device;
        this._logger = Logging_1.ButtplugLogger.Logger;
        this._characteristics = new Map();
        this.Connect = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} connecting`);
            this._device.addEventListener("gattserverdisconnected", this.OnDisconnect);
            this._server = yield this._device.gatt.connect();
            this._service = yield this._server.getPrimaryService(this._deviceInfo.Services[0]);
            for (const name of Object.getOwnPropertyNames(this._deviceInfo.Characteristics)) {
                this._characteristics.set(name, yield this._service.getCharacteristic(this._deviceInfo.Characteristics[name]));
            }
        });
        this.OnDisconnect = () => {
            this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
            this._device.removeEventListener("gattserverdisconnected", this.OnDisconnect);
            this.emit("deviceremoved");
        };
        this.WriteValue = (aCharacteristic, aValue) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                return;
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} writing ${aValue} to ${chr.uuid}`);
            yield chr.writeValue(aValue);
        });
        this.ReadValue = (aCharacteristic) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                throw new Error("Tried to access wrong characteristic!");
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} reading from ${chr.uuid}`);
            return yield chr.readValue();
        });
    }
    static CreateDevice(aDeviceInfo, aDevice) {
        return __awaiter(this, void 0, void 0, function* () {
            const deviceImpl = new WebBluetoothDevice(aDeviceInfo, aDevice);
            yield deviceImpl.Connect();
            const device = yield aDeviceInfo.Create(deviceImpl);
            // Use a fat arrow closure here, as we need to close over this definition of device.
            deviceImpl.addListener("deviceremoved", () => {
                device.OnDisconnect();
            });
            Logging_1.ButtplugLogger.Logger.Debug(`WebBluetoothDevice: Creating ${device.constructor.name}`);
            return device;
        });
    }
    get Name() {
        return this._device.name;
    }
    get Id() {
        return this._device.id;
    }
}
exports.WebBluetoothDevice = WebBluetoothDevice;
//# sourceMappingURL=WebBluetoothDevice.js.map
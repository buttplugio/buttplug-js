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
const string_decoder_1 = require("string_decoder");
class WebBluetoothDevice extends events_1.EventEmitter {
    constructor(_deviceInfo, _device) {
        super();
        this._deviceInfo = _deviceInfo;
        this._device = _device;
        this._notificationHandlers = new Map();
        this._logger = Logging_1.ButtplugLogger.Logger;
        this._decoder = new string_decoder_1.StringDecoder("utf-8");
        this._characteristics = new Map();
        this.Connect = () => __awaiter(this, void 0, void 0, function* () {
            this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} connecting`);
            this._device.addEventListener("gattserverdisconnected", this.OnDisconnect);
            this._server = yield this._device.gatt.connect();
            // We passed along a list of services we expect to work with all hardware as
            // part of the connection filters, so only those services will be found when
            // running getPrimaryServices
            const services = yield this._server.getPrimaryServices();
            if (services.length === 0) {
                this._logger.Error(`Cannot find gatt service to connect to on device ${this._device.name}`);
                throw new Error(`Cannot find gatt service to connect to on device ${this._device.name}`);
            }
            // For now, we assume we're only using one service on each device. This will
            // most likely change in the future.
            this._service = services[0];
            // If the device info contains characteristic address and identity
            // information, use that to try and establish characteristic objects.
            for (const name of Object.getOwnPropertyNames(this._deviceInfo.Characteristics)) {
                this._characteristics.set(name, yield this._service.getCharacteristic(this._deviceInfo.Characteristics[name]));
            }
            // If no characteristics are present in the DeviceInfo block, we assume that
            // we're connecting to a simple rx/tx service, and can query to figure out
            // characteristics. Assume that the characteristics have tx/rx references.
            if (this._characteristics.entries.length === 0) {
                const characteristics = yield this._service.getCharacteristics();
                for (const char of characteristics) {
                    if (char.properties.write ||
                        char.properties.writeWithoutResponse ||
                        char.properties.reliableWrite) {
                        this._characteristics.set("tx", char);
                    }
                    else if (char.properties.read ||
                        char.properties.broadcast ||
                        char.properties.notify ||
                        char.properties.indicate) {
                        this._characteristics.set("rx", char);
                    }
                }
            }
            // If at this point we still don't have any characteristics, something is
            // wrong, error out.
        });
        this.Disconnect = () => __awaiter(this, void 0, void 0, function* () {
            for (const chr of this._notificationHandlers.keys()) {
                this.Unsubscribe(chr);
            }
            this._server.disconnect();
        });
        this.OnDisconnect = () => {
            this._logger.Debug(`WebBluetoothDevice: ${this.constructor.name} disconnecting`);
            this._device.removeEventListener("gattserverdisconnected", this.OnDisconnect);
            this.emit("deviceremoved");
        };
        this.WriteString = (aCharacteristic, aValue) => __awaiter(this, void 0, void 0, function* () {
            return yield this.WriteValue(aCharacteristic, Buffer.from(aValue));
        });
        this.WriteValue = (aCharacteristic, aValue) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                throw new Error("Tried to access wrong characteristic!");
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} writing ${aValue} to ${chr.uuid}`);
            yield chr.writeValue(aValue);
        });
        this.ReadString = (aCharacteristic) => __awaiter(this, void 0, void 0, function* () {
            const value = yield this.ReadValue(aCharacteristic);
            return this._decoder.end(Buffer.from(value));
        });
        this.ReadValue = (aCharacteristic) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                throw new Error("Tried to access wrong characteristic!");
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} reading from ${chr.uuid}`);
            return yield chr.readValue();
        });
        this.Subscribe = (aCharacteristic) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                throw new Error("Tried to access wrong characteristic!");
            }
            if (this._notificationHandlers.has(aCharacteristic)) {
                throw new Error("Already listening on this characteristic!");
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} subscribing to updates from ${chr.uuid}`);
            yield chr.startNotifications();
            this._notificationHandlers.set(aCharacteristic, (event) => {
                this.CharacteristicValueChanged(event, aCharacteristic);
            });
            chr.addEventListener("characteristicvaluechanged", this._notificationHandlers.get(aCharacteristic));
        });
        this.Unsubscribe = (aCharacteristic) => __awaiter(this, void 0, void 0, function* () {
            if (!this._characteristics.has(aCharacteristic)) {
                throw new Error("Tried to access wrong characteristic!");
            }
            if (!this._notificationHandlers.has(aCharacteristic)) {
                throw new Error("Not listening on this characteristic!");
            }
            const chr = this._characteristics.get(aCharacteristic);
            this._logger.Trace(`WebBluetoothDevice: ${this.constructor.name} unsubscribing to updates from ${chr.uuid}`);
            chr.removeEventListener("characteristicvaluechanged", this._notificationHandlers.get(aCharacteristic));
            this._notificationHandlers.delete(aCharacteristic);
            yield chr.stopNotifications();
        });
        this.CharacteristicValueChanged = (aEvent, aCharacteristic) => {
            // For some reason this EventTarget doesn't have a value prop?
            const eventValue = aEvent.target.value;
            this.emit("characteristicvaluechanged", aCharacteristic, Buffer.from(eventValue.buffer));
        };
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
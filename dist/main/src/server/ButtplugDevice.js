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
const Messages = require("../core/Messages");
const events_1 = require("events");
class ButtplugDevice extends events_1.EventEmitter {
    constructor(_name) {
        super();
        this._name = _name;
        this.MsgFuncs = new Map();
        this.ParseMessage = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (!this.MsgFuncs.has(aMsg.Type)) {
                return new Messages.Error(`${this._name} cannot handle message of type ${aMsg.Type}`, Messages.ErrorClass.ERROR_MSG, aMsg.Id);
            }
            // Non-null assurance in the middle of functions looks weird.
            return this.MsgFuncs.get(aMsg.Type)(aMsg);
        });
    }
    get Name() {
        return this._name;
    }
    get AllowedMessageTypes() {
        return Object.keys(this.MessageSpecifications);
    }
}
exports.ButtplugDevice = ButtplugDevice;
//# sourceMappingURL=ButtplugDevice.js.map
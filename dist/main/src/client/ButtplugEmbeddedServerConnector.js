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
const events_1 = require("events");
const ButtplugServer_1 = require("../server/ButtplugServer");
class ButtplugEmbeddedServerConnector extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this._connected = false;
        this._server = null;
        this.Connect = () => __awaiter(this, void 0, void 0, function* () {
            this._connected = true;
            if (this._server === null) {
                this._server = new ButtplugServer_1.ButtplugServer();
            }
            this._server.addListener("message", this.OnMessageReceived);
            return Promise.resolve();
        });
        this.Disconnect = () => {
            if (!this._connected) {
                return;
            }
            this._connected = false;
            this._server = null;
            this.emit("disconnect");
        };
        this.Send = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (!this._connected) {
                throw new Error("ButtplugClient not connected");
            }
            const returnMsg = yield this._server.SendMessage(aMsg);
            this.emit("message", [returnMsg]);
        });
        this.OnMessageReceived = (aMsg) => {
            this.emit("message", [aMsg]);
        };
    }
    set Server(server) {
        this._server = server;
    }
    get Server() {
        return this._server;
    }
    IsConnected() {
        return this._connected;
    }
}
exports.ButtplugEmbeddedServerConnector = ButtplugEmbeddedServerConnector;
//# sourceMappingURL=ButtplugEmbeddedServerConnector.js.map
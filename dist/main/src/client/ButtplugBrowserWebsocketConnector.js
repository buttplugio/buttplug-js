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
const MessageUtils_1 = require("../core/MessageUtils");
class ButtplugBrowserWebsocketConnector extends events_1.EventEmitter {
    constructor(_url) {
        super();
        this._url = _url;
        this.Connect = () => __awaiter(this, void 0, void 0, function* () {
            const ws = new WebSocket(this._url);
            let res;
            let rej;
            const p = new Promise((resolve, reject) => { res = resolve; rej = reject; });
            // In websockets, our error rarely tells us much, as for security reasons
            // browsers usually only throw Error Code 1006. It's up to those using this
            // library to state what the problem might be.
            const conErrorCallback = (ev) => rej();
            ws.addEventListener("open", (ev) => __awaiter(this, void 0, void 0, function* () {
                this._ws = ws;
                this._ws.addEventListener("message", (aMsg) => { this.ParseIncomingMessage(aMsg); });
                this._ws.removeEventListener("close", conErrorCallback);
                this._ws.addEventListener("close", this.Disconnect);
                res();
            }));
            ws.addEventListener("close", conErrorCallback);
            return p;
        });
        this.Disconnect = () => {
            if (!this.Connected) {
                return;
            }
            this._ws.close();
            this._ws = undefined;
            this.emit("disconnect");
        };
        this.Send = (aMsg) => {
            if (!this.Connected) {
                throw new Error("ButtplugClient not connected");
            }
            this._ws.send("[" + aMsg.toJSON() + "]");
        };
        this.ParseIncomingMessage = (aEvent) => {
            if (typeof (aEvent.data) === "string") {
                const msgs = MessageUtils_1.FromJSON(aEvent.data);
                this.emit("message", msgs);
            }
            else if (aEvent.data instanceof Blob) {
                const reader = new FileReader();
                reader.addEventListener("load", (ev) => { this.OnReaderLoad(ev); });
                reader.readAsText(aEvent.data);
            }
        };
    }
    get Connected() {
        return this._ws !== undefined;
    }
    OnReaderLoad(aEvent) {
        const msgs = MessageUtils_1.FromJSON(aEvent.target.result);
        this.emit("message", msgs);
    }
}
exports.ButtplugBrowserWebsocketConnector = ButtplugBrowserWebsocketConnector;
//# sourceMappingURL=ButtplugBrowserWebsocketConnector.js.map
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
var WebSocket = require("ws");
var events_1 = require("events");
var __1 = require("..");
/**
 * Connector class for using the node ws library as a websocket client to a
 * buttplug server. Users should build an instance of this class and pass it to
 * the ButtplugClient.Connect() function.
 */
var ButtplugNodeWebsocketClientConnector = /** @class */ (function (_super) {
    __extends(ButtplugNodeWebsocketClientConnector, _super);
    /***
     * @param url URL of buttplug server to connect to
     * @param rejectUnauthorized If true, reject unauthorized certificates that fail verification
     */
    function ButtplugNodeWebsocketClientConnector(url, rejectUnauthorized) {
        var _this = _super.call(this) || this;
        /// Websocket client
        _this.wsClient = null;
        /// If true, reject unauthorized certificates that fail verification
        _this.rejectUnauthorized = true;
        _this.rejectUnauthorized = rejectUnauthorized;
        _this.url = url;
        return _this;
    }
    /***
     * Called by ButtplugClient to establish websocket connection.
     */
    ButtplugNodeWebsocketClientConnector.prototype.Connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var res, rej, ws, p, conErrorCallback;
            return __generator(this, function (_a) {
                ws = new WebSocket(this.url, {
                    rejectUnauthorized: this.rejectUnauthorized,
                });
                p = new Promise(function (resolve, reject) { res = resolve; rej = reject; });
                conErrorCallback = function (ev) { return rej(); };
                ws.on("open", function (ev) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        this.wsClient = ws;
                        this.wsClient.on("message", function (aMsg) { _this.emit("message", __1.FromJSON(aMsg)); });
                        this.wsClient.on("close", this.Disconnect);
                        res();
                        return [2 /*return*/];
                    });
                }); });
                ws.on("close", conErrorCallback);
                return [2 /*return*/, p];
            });
        });
    };
    /***
     * Called by ButtplugClient to disconnect websocket connection.
     */
    ButtplugNodeWebsocketClientConnector.prototype.Disconnect = function () {
        if (!this.IsConnected()) {
            throw new Error("Not connected!");
        }
        this.wsClient.close();
    };
    /***
     * Called by ButtplugClient to send a message over the websocket.
     */
    ButtplugNodeWebsocketClientConnector.prototype.Send = function (msg) {
        if (!this.IsConnected()) {
            throw new Error("Not connected!");
        }
        // Make sure our message is packed in an array. Messy.
        this.wsClient.send("[" + msg.toJSON() + "]");
    };
    /***
     * Called by ButtplugClient to verify connection status.
     */
    ButtplugNodeWebsocketClientConnector.prototype.IsConnected = function () {
        return this.wsClient !== null;
    };
    return ButtplugNodeWebsocketClientConnector;
}(events_1.EventEmitter));
exports.ButtplugNodeWebsocketClientConnector = ButtplugNodeWebsocketClientConnector;
//# sourceMappingURL=ButtplugNodeWebsocketClientConnector.js.map
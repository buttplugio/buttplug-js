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
var fs = require("fs");
var ws = require("ws");
var https = require("https");
var __1 = require("..");
/**
 * Derives from the base ButtplugServer class, adds capabilities to the server
 * for listening on and communicating with websockets in a native node
 * application.
 */
var ButtplugNodeWebsocketServer = /** @class */ (function (_super) {
    __extends(ButtplugNodeWebsocketServer, _super);
    function ButtplugNodeWebsocketServer() {
        var _this = _super.call(this) || this;
        _this.wsServer = null;
        return _this;
    }
    /**
     * Starts an insecure (non-ssl) instance of the server. This server will not
     * be accessible from clients/applications running on https instances.
     *
     * @param port Network port to listen on (defaults to 12345)
     * @param host Host address to listen on (defaults to localhost)
     */
    ButtplugNodeWebsocketServer.prototype.StartInsecureServer = function (port, host) {
        if (port === void 0) { port = 12345; }
        if (host === void 0) { host = "localhost"; }
        this.wsServer = new ws.Server({ host: host, port: port });
        this.InitServer();
    };
    /**
     * Starts a secure instance of the server. Requires an SSL certificate to
     * already be generated.
     *
     * @param certFilePath Path to certificate file
     * @param keyFilePath Path to certificate private key file
     * @param port Network port to listen on (defaults to 12345)
     * @param host Host address to listen on (defaults to localhost)
     */
    ButtplugNodeWebsocketServer.prototype.StartSecureServer = function (certFilePath, keyFilePath, port, host) {
        if (port === void 0) { port = 12345; }
        if (host === void 0) { host = "localhost"; }
        var pems = {};
        pems.cert = fs.readFileSync(certFilePath);
        pems.private = fs.readFileSync(keyFilePath);
        var server = https.createServer({
            cert: pems.cert,
            key: pems.private,
        }).listen(port, host);
        this.wsServer = new ws.Server({ server: server });
        this.InitServer();
    };
    /**
     * Shuts down the server, closing all connections.
     */
    ButtplugNodeWebsocketServer.prototype.StopServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var closeRes, closePromise;
            return __generator(this, function (_a) {
                if (this.wsServer === null) {
                    throw new Error("Websocket server is null!");
                }
                closePromise = new Promise(function (res, rej) { closeRes = res; });
                this.wsServer.close(function () { return closeRes(); });
                return [2 /*return*/, closePromise];
            });
        });
    };
    /**
     * Used to set up server after Websocket connection created.
     */
    ButtplugNodeWebsocketServer.prototype.InitServer = function () {
        if (this.wsServer === null) {
            throw new Error("Websocket server is null!");
        }
        var bs = this;
        this.wsServer.on("connection", function connection(client) {
            var _this = this;
            client.on("message", function (message) { return __awaiter(_this, void 0, void 0, function () {
                var msg, _i, msg_1, m, outgoing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            msg = __1.FromJSON(message);
                            _i = 0, msg_1 = msg;
                            _a.label = 1;
                        case 1:
                            if (!(_i < msg_1.length)) return [3 /*break*/, 4];
                            m = msg_1[_i];
                            return [4 /*yield*/, bs.SendMessage(m)];
                        case 2:
                            outgoing = _a.sent();
                            // Make sure our message is packed in an array, as the buttplug spec
                            // requires.
                            client.send("[" + outgoing.toJSON() + "]");
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            bs.on("message", function outgoing(message) {
                // Make sure our message is packed in an array, as the buttplug spec
                // requires.
                client.send("[" + message.toJSON() + "]");
            });
        });
    };
    return ButtplugNodeWebsocketServer;
}(__1.ButtplugServer));
exports.ButtplugNodeWebsocketServer = ButtplugNodeWebsocketServer;
//# sourceMappingURL=ButtplugNodeWebsocketServer.js.map
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mock_socket_1 = require("mock-socket");
var Client_1 = require("../src/client/Client");
var Messages = require("../src/core/Messages");
var MessageUtils_1 = require("../src/core/MessageUtils");
describe("Client Tests", function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    function delaySend(aMsg) {
        process.nextTick(function () { return mockServer.send("[" + aMsg.toJSON() + "]"); });
    }
    var mockServer, bp, p, res, rej, BPTestClient;
    return __generator(this, function (_a) {
        BPTestClient = /** @class */ (function (_super) {
            __extends(BPTestClient, _super);
            function BPTestClient(ClientName) {
                return _super.call(this, ClientName) || this;
            }
            Object.defineProperty(BPTestClient.prototype, "PingTimer", {
                get: function () {
                    return this._pingTimer;
                },
                enumerable: true,
                configurable: true
            });
            return BPTestClient;
        }(Client_1.ButtplugClient));
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            var serverInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer = new mock_socket_1.Server("ws://localhost:6868");
                        p = new Promise(function (resolve, reject) { res = resolve; rej = reject; });
                        serverInfo = function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            delaySend(new Messages.ServerInfo(0, 0, 0, 0, 0, "Test Server", msg.Id));
                            mockServer.removeEventListener("message", serverInfo);
                        };
                        mockServer.on("message", serverInfo);
                        bp = new Client_1.ButtplugClient("Test Buttplug Client");
                        return [4 /*yield*/, bp.ConnectWebsocket("ws://localhost:6868")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function (done) {
            mockServer.stop(done);
        });
        it("Should deal with request/reply correctly", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer.on("message", function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            delaySend(new Messages.Ok(msg.Id));
                        });
                        return [4 /*yield*/, bp.StartScanning()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, bp.StopScanning()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should emit a log message on requestlog (testing basic event emitters)", function () { return __awaiter(_this, void 0, void 0, function () {
            var finishTestPromise;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer.on("message", function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            delaySend(new Messages.Ok(msg.Id));
                            delaySend(new Messages.Log("Trace", "Test"));
                        });
                        finishTestPromise = new Promise(function (resolve) { res = resolve; });
                        bp.on("log", function (x) {
                            expect(x).toEqual(new Messages.Log("Trace", "Test"));
                            res();
                        });
                        return [4 /*yield*/, bp.RequestLog("Trace")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, finishTestPromise];
                }
            });
        }); });
        it("Should emit a device on addition", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer.on("message", function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            expect(msg.constructor.name).toEqual("StartScanning");
                            delaySend(new Messages.Ok(msg.Id));
                            delaySend(new Messages.DeviceAdded(0, "Test Device", ["SingleMotorVibrateCmd"]));
                        });
                        bp.on("deviceadded", function (x) {
                            delaySend(new Messages.DeviceRemoved(0));
                        });
                        bp.on("deviceremoved", function (x) {
                            res();
                        });
                        return [4 /*yield*/, bp.StartScanning()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, p];
                }
            });
        }); });
        it("Should emit a device when device list request received with new devices", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer.on("message", function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            delaySend(new Messages.DeviceList([new Messages.DeviceInfo(0, "Test Device", ["SingleMotorVibrateCmd"])], msg.Id));
                        });
                        bp.on("deviceadded", function (x) {
                            res();
                        });
                        return [4 /*yield*/, bp.RequestDeviceList()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, p];
                }
            });
        }); });
        it("Should emit when device scanning is over", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer.on("message", function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            delaySend(new Messages.Ok(msg.Id));
                            delaySend(new Messages.ScanningFinished());
                        });
                        bp.on("scanningfinished", function (x) {
                            res();
                        });
                        return [4 /*yield*/, bp.StartScanning()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, p];
                }
            });
        }); });
        it("Should allow correct device messages and reject unauthorized", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer.on("message", function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            delaySend(new Messages.Ok(msg.Id));
                            if (msg.getType() === "StartScanning") {
                                delaySend(new Messages.DeviceAdded(0, "Test Device", ["SingleMotorVibrateCmd"]));
                            }
                            if (msg instanceof Messages.ButtplugDeviceMessage) {
                                expect(msg.DeviceIndex).toEqual(0);
                            }
                        });
                        bp.on("deviceadded", function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        device = x;
                                        return [4 /*yield*/, bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(1.0))];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, bp.SendDeviceMessage(x, new Messages.KiirooCmd("2"))];
                                    case 3:
                                        _a.sent();
                                        throw Error("Should've thrown!");
                                    case 4:
                                        _1 = _a.sent();
                                        res();
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, bp.StartScanning()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, p];
                }
            });
        }); });
        it("Should reject schema violating message", function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var device;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockServer.on("message", function (jsonmsg) {
                            var msg = MessageUtils_1.FromJSON(jsonmsg)[0];
                            delaySend(new Messages.Ok(msg.Id));
                            if (msg.getType() === "StartScanning") {
                                delaySend(new Messages.DeviceAdded(0, "Test Device", ["SingleMotorVibrateCmd"]));
                            }
                            if (msg instanceof Messages.ButtplugDeviceMessage) {
                                expect(msg.DeviceIndex).toEqual(0);
                            }
                        });
                        bp.on("deviceadded", function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var _2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        device = x;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, bp.SendDeviceMessage(x, new Messages.SingleMotorVibrateCmd(50))];
                                    case 2:
                                        _a.sent();
                                        rej(new Error("Should've thrown!"));
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _2 = _a.sent();
                                        res();
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, bp.StartScanning()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, p];
                }
            });
        }); });
        it("Should receive disconnect event on disconnect", function () { return __awaiter(_this, void 0, void 0, function () {
            var bplocal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bplocal = new Client_1.ButtplugClient("Test Client");
                        bplocal.addListener("disconnect", function () { res(); });
                        return [4 /*yield*/, bplocal.ConnectLocal()];
                    case 1:
                        _a.sent();
                        bplocal.Disconnect();
                        return [2 /*return*/, p];
                }
            });
        }); });
        it("Should receive disconnect event on websocket disconnect", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                bp.addListener("disconnect", function () { res(); });
                mockServer.close();
                return [2 /*return*/, p];
            });
        }); });
        it("Should shut down ping timer on disconnect", function () { return __awaiter(_this, void 0, void 0, function () {
            var bplocal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bplocal = new BPTestClient("Test Client");
                        bplocal.addListener("disconnect", function () {
                            expect(bplocal.PingTimer).toEqual(null);
                            res();
                        });
                        return [4 /*yield*/, bplocal.ConnectLocal()];
                    case 1:
                        _a.sent();
                        bplocal.Disconnect();
                        return [2 /*return*/, p];
                }
            });
        }); });
        it("Should get error on scanning when no device managers available.", function () { return __awaiter(_this, void 0, void 0, function () {
            var bplocal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bplocal = new Client_1.ButtplugClient("Test Client");
                        bplocal.addListener("disconnect", function () { res(); });
                        return [4 /*yield*/, bplocal.ConnectLocal()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, expect(bplocal.StartScanning()).rejects.toThrow()];
                    case 2:
                        _a.sent();
                        bplocal.Disconnect();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
//# sourceMappingURL=client.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var ServerMessageHub = (function (_super) {
    __extends(ServerMessageHub, _super);
    function ServerMessageHub() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ServerMessageHub, "Instance", {
        get: function () {
            return ServerMessageHub.sInstance;
        },
        enumerable: true,
        configurable: true
    });
    ServerMessageHub.prototype.emitMessage = function (aMsg) {
        this.emit("message", aMsg);
    };
    ServerMessageHub.sInstance = new ServerMessageHub();
    return ServerMessageHub;
}(events_1.EventEmitter));
exports.default = ServerMessageHub;
//# sourceMappingURL=ServerMessageHub.js.map
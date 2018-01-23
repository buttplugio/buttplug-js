"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class ServerMessageHub extends events_1.EventEmitter {
    static get Instance() {
        return ServerMessageHub.sInstance;
    }
    emitMessage(aMsg) {
        this.emit("message", aMsg);
    }
}
ServerMessageHub.sInstance = new ServerMessageHub();
exports.ServerMessageHub = ServerMessageHub;
//# sourceMappingURL=ServerMessageHub.js.map
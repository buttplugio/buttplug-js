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
const fs = require("fs");
const ws = require("ws");
const https = require("https");
const __1 = require("..");
/**
 * Derives from the base ButtplugServer class, adds capabilities to the server
 * for listening on and communicating with websockets in a native node
 * application.
 */
class ButtplugNodeWebsocketServer extends __1.ButtplugServer {
    constructor() {
        super();
        this.wsServer = null;
    }
    /**
     * Starts an insecure (non-ssl) instance of the server. This server will not
     * be accessible from clients/applications running on https instances.
     *
     * @param port Network port to listen on (defaults to 12345)
     * @param host Host address to listen on (defaults to localhost)
     */
    StartInsecureServer(port = 12345, host = "localhost") {
        this.wsServer = new ws.Server({ host, port });
        this.InitServer();
    }
    /**
     * Starts a secure instance of the server. Requires an SSL certificate to
     * already be generated.
     *
     * @param certFilePath Path to certificate file
     * @param keyFilePath Path to certificate private key file
     * @param port Network port to listen on (defaults to 12345)
     * @param host Host address to listen on (defaults to localhost)
     */
    StartSecureServer(certFilePath, keyFilePath, port = 12345, host = "localhost") {
        const pems = {};
        pems.cert = fs.readFileSync(certFilePath);
        pems.private = fs.readFileSync(keyFilePath);
        const server = https.createServer({
            cert: pems.cert,
            key: pems.private,
        }).listen(port, host);
        this.wsServer = new ws.Server({ server });
        this.InitServer();
    }
    /**
     * Shuts down the server, closing all connections.
     */
    StopServer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.wsServer === null) {
                throw new Error("Websocket server is null!");
            }
            // ws's close doesn't follow the callback style util.promisify expects (only
            // has a passing callback, no failing), so just build our own. Could've
            // wrapped it in a 2 argument closure but eh.
            let closeRes;
            const closePromise = new Promise((res, rej) => { closeRes = res; });
            this.wsServer.close(() => closeRes());
            return closePromise;
        });
    }
    /**
     * Used to set up server after Websocket connection created.
     */
    InitServer() {
        if (this.wsServer === null) {
            throw new Error("Websocket server is null!");
        }
        const bs = this;
        this.wsServer.on("connection", function connection(client) {
            client.on("message", (message) => __awaiter(this, void 0, void 0, function* () {
                const msg = __1.FromJSON(message);
                for (const m of msg) {
                    const outgoing = yield bs.SendMessage(m);
                    // Make sure our message is packed in an array, as the buttplug spec
                    // requires.
                    client.send("[" + outgoing.toJSON() + "]");
                }
            }));
            bs.on("message", function outgoing(message) {
                // Make sure our message is packed in an array, as the buttplug spec
                // requires.
                client.send("[" + message.toJSON() + "]");
            });
        });
    }
}
exports.ButtplugNodeWebsocketServer = ButtplugNodeWebsocketServer;
//# sourceMappingURL=ButtplugNodeWebsocketServer.js.map
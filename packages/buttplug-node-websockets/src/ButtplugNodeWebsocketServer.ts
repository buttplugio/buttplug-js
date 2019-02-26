/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as fs from "fs";
import * as ws from "ws";
import * as https from "https";
import { FromJSON, ButtplugServer, ButtplugInitException } from "buttplug";

/**
 * Derives from the base ButtplugServer class, adds capabilities to the server
 * for listening on and communicating with websockets in a native node
 * application.
 */
export class ButtplugNodeWebsocketServer extends ButtplugServer {

  private httpsServer: https.Server | null = null;
  private wsServer: ws.Server | null = null;

  public constructor(name: string, maxPingTime: number = 0) {
    super(name, maxPingTime);
  }

  /**
   * Starts an insecure (non-ssl) instance of the server. This server will not
   * be accessible from clients/applications running on https instances.
   *
   * @param port Network port to listen on (defaults to 12345)
   * @param host Host address to listen on (defaults to localhost)
   */
  public StartInsecureServer = (port: number = 12345, host: string = "localhost") => {
    this.wsServer = new ws.Server({host, port});
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
  public StartSecureServer = (certFilePath: string, keyFilePath: string,
                              port: number = 12345, host: string = "localhost") => {
      const pems: any = {};
      if (!fs.existsSync(certFilePath)) {
        throw new ButtplugInitException(`Certificate file ${certFilePath} does not exist.`);
      }
      if (!fs.existsSync(keyFilePath)) {
        throw new ButtplugInitException(`Key file ${keyFilePath} does not exist.`);
      }
      pems.cert = fs.readFileSync(certFilePath);
      pems.private = fs.readFileSync(keyFilePath);
      this.httpsServer = https.createServer({
        cert: pems.cert,
        key: pems.private,
      }).listen(port, host);
      this.wsServer = new ws.Server({ server: this.httpsServer });
      this.InitServer();
    }

  /**
   * Shuts down the server, closing all connections.
   */
  public StopServer = async () => {
    if (this.wsServer === null) {
      throw new Error("Websocket server is null!");
    }
    // ws's close doesn't follow the callback style util.promisify expects (only
    // has a passing callback, no failing), so just build our own. Could've
    // wrapped it in a 2 argument closure but eh.
    let closeRes: () => void;
    const closePromise = new Promise((res, rej) => { closeRes = res; });
    for (const client of this.wsServer.clients) {
      client.close();
    }
    this.wsServer.close(() => {
      this.wsServer = null;
      if (this.httpsServer !== null) {
        this.httpsServer.close(() => closeRes());
      } else {
        closeRes();
      }
    });
    return closePromise;
  }

  /**
   * Used to set up server after Websocket connection created.
   */
  private InitServer = () => {
    if (this.wsServer === null) {
      throw new Error("Websocket server is null!");
    }
    const bs: ButtplugServer = this;
    this.wsServer.on("connection", function connection(client) {
      client.on("error", (err) => {
        console.log(`Error in websocket connection: ${err.message}`);
        client.terminate();
      });
      client.on("message", async (message) => {
        const msg = FromJSON(message);
        for (const m of msg) {
          const outgoing = await bs.SendMessage(m);
          // Make sure our message is packed in an array, as the buttplug spec
          // requires.
          client.send("[" + outgoing.toJSON() + "]");
        }
      });

      bs.on("message", function outgoing(message) {
        // Make sure our message is packed in an array, as the buttplug spec
        // requires.
        client.send("[" + message.toJSON() + "]");
      });
    });
  }
}

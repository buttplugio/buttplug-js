/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as commander from "commander";
import * as selfsigned from "selfsigned";
import * as fs from "fs";
import { ButtplugServer, ButtplugLogger, ButtplugLogLevel } from "buttplug";
import { ButtplugNodeBluetoothLEDeviceManager } from "buttplug-node-bluetoothle-manager";
import { ButtplugNodeWebsocketServer } from "buttplug-node-websockets";

import * as packageinfo from "../package.json";

export class ButtplugServerCLI {

  private _server: ButtplugServer;

  public RunServer() {
    this.BuildOptions();

    if (commander.serverversion) {
      this.PrintVersion();
      return;
    }

    if (commander.generatecert) {
      this.GenerateCertificate();
      return;
    }

    if (commander.websocketserver && commander.ipcserver) {
      console.log("Can only run IPC or websocket server, not both");
      return;
    }

    // If we get this far, we'll at least try running a server, so set up
    // exit/Ctrl-C routes.
    this.SetupExit();

    if (commander.websocketserver) {
      this.RunWebsocketServer();
    }

    if (commander.ipcserver) {
      console.log("IPC server not yet implemented");
      return;
    }
  }

  private SetupExit() {
    if (process.platform === "win32") {
      // const rl = require("readline").createInterface({
      //   input: process.stdin,
      //   output: process.stdout,
      // });

      // rl.on("SIGINT", () => {
      //   process.emit("SIGINT");
      // });
    }

    process.on("SIGINT", async () => {
      if (this._server) {
        this._server.Disconnect();
      }
      if (commander.websocketserver) {
        await (this._server as ButtplugNodeWebsocketServer).StopServer();
      }
      process.exit();
    });

  }

  private PrintVersion() {
    console.log(packageinfo.version);
  }

  private BuildOptions() {
    commander
      .version(packageinfo.version)
      .option("--servername <name>", "Name of server to pass to connecting clients", "Buttplug Server")
      .option("--serverversion", "Print version and exit")
      .option("--generatecert", "Generates self signed certificate for secure websocket servers, and exits.")
      .option("--deviceconfig <filename>", "Device configuration file (if none specified, will use internal version)")
      .option("--userdeviceconfig <filename>", "User device configuration file")
      .option("--websocketserver", "Run websocket server")
      .option("--host <hostname>", "Host for websocket server.", "localhost")
      .option("--port <number>", "Port to listen on, defaults to 12345.", 12345)
      .option("--certfile <filename>", "Cert file to load for SSL")
      .option("--privfile <filename>", "Private key file to load for SSL")
      .option("--ipcserver", "Run IPC server")
      .option("--ipcpipe", "IPC Pipe Name for IPC Server IO")
      .option("--guipipe", "IPC Pipe Name for GUI Info Output")
      .option("--pingtime <ping>", "Ping timeout maximum for server (in milliseconds, 0 = off/infinite ping)", 0)
      .option("--stayopen", "If passed, server will stay running after client disconnection")
      .option("--log <loglevel>", "Prints logs to console at specified log level.", "Off")
      .parse(process.argv);
  }

  private GenerateCertificate() {
    console.log("Creating secure selfsigned keys...");
    if (fs.existsSync("cert.pem") || fs.existsSync("private.pem")) {
      console.log("Please remove cert.pem and private.pem files before generating new keys.");
      return;
    }
    const pems = selfsigned.generate(undefined, { days: 365 });
    fs.writeFileSync("cert.pem", pems.cert);
    fs.writeFileSync("private.pem", pems.private);
    console.log("cert.pem and private.pem generated");
    return;
  }

  private LogToConsole() {
    ButtplugLogger.Logger.MaximumConsoleLogLevel = ButtplugLogLevel[commander.log as string];
  }

  private RunIPCServer() {
    // TODO Actually implement IPC server
  }

  private RunWebsocketServer() {
    const wsServer = new ButtplugNodeWebsocketServer(commander.servername, commander.pingtime);
    if (commander.certfile !== undefined && commander.privfile !== undefined) {
      console.log("Starting secure websocket server");
      wsServer.StartSecureServer(commander.certfile, commander.privfile, commander.port, commander.host);
    } else {
      console.log("Starting insecure websocket server");
      wsServer.StartInsecureServer(commander.port, commander.host);
    }
    this._server = wsServer;
    this.InitServer();
    console.log("Listening on port " + commander.port);
  }

  private InitServer() {
    this._server.AddDeviceManager(new ButtplugNodeBluetoothLEDeviceManager());
  }
}

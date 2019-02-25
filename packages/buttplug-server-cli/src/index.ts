/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as commander from "commander";
import { ButtplugServer, ButtplugLogger, ButtplugLogLevel } from "buttplug";
import { ButtplugNodeBluetoothLEDeviceManager } from "buttplug-node-bluetoothle-manager";
import { ButtplugNodeWebsocketServer } from "buttplug-node-websockets";

import * as packageinfo from "../package.json";

function InitServer(aServer: ButtplugServer) {
  aServer.AddDeviceManager(new ButtplugNodeBluetoothLEDeviceManager());
}

async function main() {
  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });

  commander
    .version(packageinfo.version)
    .option("--servername <name>", "Name of server to pass to connecting clients", "Buttplug Server")
    .option("--serverversion", "Print version and exit")
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

  if (commander.serverversion) {
    console.log(packageinfo.version);
    return;
  }

  let server: ButtplugServer;

  if (commander.websocketserver && commander.ipcserver) {
    console.log("Server cannot run ipc and websocket at the same time");
    return;
  }

  if (commander.log !== "Off") {
    ButtplugLogger.Logger.MaximumConsoleLogLevel = ButtplugLogLevel[commander.log as string];
  }

  if (commander.websocketserver) {
    const wsServer = new ButtplugNodeWebsocketServer(commander.servername, commander.pingtime);
    if (commander.certfile !== undefined && commander.privfile !== undefined) {
      console.log("Starting secure websocket server");
      wsServer.StartSecureServer(commander.certfile, commander.privfile, commander.port, commander.host);
    } else {
      console.log("Starting insecure websocket server");
      wsServer.StartInsecureServer(commander.port, commander.host);
    }
    server = wsServer;
    InitServer(server);
    console.log("Listening on port " + commander.port);
  } else if (commander.ipcserver) {
    // Probably need to actually implement an IPC server now, huh.
    console.log("ipc not yet implemented");
    return;
  } else {
    console.log("Server must run in either ipc or websocket mode");
    return;
  }

  if (process.platform === "win32") {
    const rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    // rl.on("SIGINT", () => {
    //   process.emit("SIGINT");
    // });
  }

  process.on("SIGINT", () => {
    server.Disconnect();
    if (commander.websocketserver) {
      (server as ButtplugNodeWebsocketServer).StopServer();
    }
    process.exit();
  });
}

main();

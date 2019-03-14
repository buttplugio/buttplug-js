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
import * as net from "net";
import * as path from "path";
import { ButtplugGuiProtocol } from "./buttplug-gui-proto";
import { ButtplugLogger, ButtplugLogLevel } from "buttplug";
import { ButtplugNodeBluetoothLEDeviceManager } from "buttplug-node-bluetoothle-manager";
import { ButtplugNodeWebsocketServer } from "buttplug-node-websockets";

import * as packageinfo from "../package.json";

export class ButtplugServerCLI {

  private _wsServer: ButtplugNodeWebsocketServer | null = null;
  private _guiPipe: net.Socket | null = null;

  public async RunServer() {
    this.BuildOptions();

    if (commander.serverversion) {
      this.PrintVersion();
      return;
    }

    if (commander.generatecert) {
      this.GenerateCertificate(commander.generatecert);
      return;
    }

    if (commander.guipipe) {
      let res;
      let rej;
      console.log(`Buttplug server connecting to GUI on IPC pipe ${commander.guipipe}`);
      // Promisify has problems getting createConnection's return type right
      // (may be typescript misinterpretting one of the overloads?), so just
      // doing it manually here.
      const connectPromise = new Promise<void>((rs, rj) => { res = rs; rej = rj; });
      this._guiPipe = net.createConnection(commander.guipipe, () => res() );
      await connectPromise;
      // Monkey patch stdout/stderr at this point to shove everything over our pipe.
      process.stdout.write = process.stderr.write = this.SendGuiLogMessage.bind(this);
      this._guiPipe.addListener("data", (aData: Buffer) => {
        this.OnGuiMessage(aData);
      });
      console.log(`Buttplug server connected to GUI on IPC pipe ${commander.guipipe}`);
      this.SendGuiLogMessage(`Buttplug server connected to GUI on IPC pipe ${commander.guipipe}`);
    } else {
      console.log(`No valid pipe at ${commander.guipipe}`);
    }

    if (!commander.websocketserver && !commander.ipcserver) {
      console.log("Must specify either Websocket or IPC server!");
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

  private async OnGuiMessage(aMsg: Buffer) {
    const msg = ButtplugGuiProtocol.ServerControlMessage.decode(aMsg);
    if (msg.stop !== null) {
      this.Shutdown();
    }
  }

  private SendMessage(aMsg: ButtplugGuiProtocol.ServerProcessMessage) {
    if (!this._guiPipe) {
      return;
    }
    const buffer = Buffer.from(ButtplugGuiProtocol.ServerProcessMessage.encode(aMsg).finish());
    this._guiPipe!.write(buffer);
  }

  private SendGuiLogMessage(aMsg: string) {
    const logmsg = ButtplugGuiProtocol.ServerProcessMessage.create({
      processLog: ButtplugGuiProtocol.ServerProcessMessage.ProcessLog.create({ message: aMsg }),
    });
    this.SendMessage(logmsg);
  }

  private async Shutdown() {
    if (this._wsServer) {
      await this._wsServer.Disconnect();
      await this._wsServer.StopServer();
      this._wsServer = null;
    }
    if (this._guiPipe) {
      const exitMsg = ButtplugGuiProtocol.ServerProcessMessage.create({
        processEnded: ButtplugGuiProtocol.ServerProcessMessage.ProcessEnded.create(),
      });
      this.SendMessage(exitMsg);
      this._guiPipe.destroy();
      this._guiPipe = null;
    }

    process.exit();
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
      process.exit();
    });

    process.on("beforeExit", async () => {
      await this.Shutdown();
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
      .option("--generatecert <path>", "Generates self signed certificate for secure websocket servers at the path specified, and exits.")
      .option("--deviceconfig <filename>", "Device configuration file (if none specified, will use internal version)")
      .option("--userdeviceconfig <filename>", "User device configuration file")
      .option("--websocketserver", "Run websocket server")
      .option("--websocketallinterfaces", "If passed, listen on all interfaces. Otherwise only listen on 127.0.0.1.")
      .option("--insecureport <number>",
              "Port to listen on for insecure websocket connections. Only listens on this port if this argument is passed.")
      .option("--secureport <number>",
              "Port to listen on secure websocket connections (requires cert to be passed), defaults to 12345.", 12345)
      .option("--certfile <filename>", "Cert file to load for SSL")
      .option("--privfile <filename>", "Private key file to load for SSL")
      .option("--ipcserver", "Run IPC server")
      .option("--ipcpipe <path>", "IPC Pipe Name for IPC Server IO")
      .option("--guipipe <path>", "IPC Pipe Name for GUI Info Output")
      .option("--pingtime <ping>", "Ping timeout maximum for server (in milliseconds, 0 = off/infinite ping)", 0)
      .option("--stayopen", "If passed, server will stay running after client disconnection")
      .option("--log <loglevel>", "Prints logs to console at specified log level.", "Off")
      .parse(process.argv);
  }

  private GenerateCertificate(aPath: string) {
    console.log("Creating secure selfsigned keys...");
    if (fs.existsSync("cert.pem") || fs.existsSync("private.pem")) {
      console.log("Please remove cert.pem and private.pem files before generating new keys.");
      return;
    }
    const pems = selfsigned.generate(undefined, { days: 365 });
    fs.writeFileSync(path.join(aPath, "cert.pem"), pems.cert);
    fs.writeFileSync(path.join(aPath, "private.pem"), pems.private);
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
    const host: string = commander.websocketallinterfaces ? "0.0.0.0" : "127.0.0.1";

    const wsServer = new ButtplugNodeWebsocketServer(commander.servername, commander.pingtime);
    if (commander.secureport && commander.certfile !== undefined && commander.privfile !== undefined) {
      this.SendGuiLogMessage("Starting secure websocket server");
      wsServer.StartSecureServer(commander.certfile,
                                 commander.privfile,
                                 commander.secureport,
                                 host);
      this.SendGuiLogMessage(`Secure server listening on port ${commander.secureport}`);
    } else if (commander.insecureport) {
      this.SendGuiLogMessage("Starting insecure websocket server");
      wsServer.StartInsecureServer(commander.insecureport, host);
      this.SendGuiLogMessage(`Insecure server listening on port ${commander.insecureport}`);
    }
    this._wsServer = wsServer;
    this.InitServer();
  }

  private InitServer() {
    if (this._wsServer) {
      this._wsServer.AddDeviceManager(new ButtplugNodeBluetoothLEDeviceManager());
    }
  }
}

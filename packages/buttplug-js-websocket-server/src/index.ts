import * as commander from "commander";
import * as ws from "ws";
import * as fs from "fs";
import * as util from "util";
import * as https from "https";
import * as http from "http";
import { ButtplugServer, ButtplugMessage, FromJSON } from "buttplug";
import { ButtplugNodeBluetoothLEDeviceManager } from "buttplug-node-bluetoothle-manager";
const selfsigned = require("selfsigned");

async function main() {
  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });

  commander
    .version("0.0.1-alpha")
    .option("-p, --port <number>", "Port to listen on, defaults to 12345.", 12345)
    .option("--nossl", "If passed, do not use SSL. Needed for ScriptPlayer. SSL on by default otherwise.", false)
    .parse(process.argv);

  let wsServer;
  if (commander.nossl) {
    console.log("Not using SSL.");
    const server = http.createServer().listen(commander.port);
    wsServer = new ws.Server({server});
  } else {
    console.log("Using SSL.");
    const attrs = [{
      name: "commonName",
      value: "buttplug.localhost",
    }, {
      name: "organizationName",
      value: "Metafetish",
    }];

    let pems: any = {};
    const existsAsync = util.promisify(fs.exists);

    if (await existsAsync("cert.pem") && await existsAsync("private.pem")) {
      console.log("Loading keys");
      pems.cert = fs.readFileSync("cert.pem");
      pems.private = fs.readFileSync("private.pem");
    } else {
      console.log("Creating keys");
      pems = selfsigned.generate(undefined, { days: 365 });
      fs.writeFileSync("cert.pem", pems.cert);
      fs.writeFileSync("private.pem", pems.private);
    }

    const server = https.createServer({
      cert: pems.cert,
      key: pems.private,
    }).listen(commander.port);
    wsServer = new ws.Server({server});
  }

  console.log("Listening on port " + commander.port);
  const bs = new ButtplugServer();
  bs.AddDeviceManager(new ButtplugNodeBluetoothLEDeviceManager());

  wsServer.on("connection", function connection(client) {
    client.on("message", async (message) => {
      const msg = FromJSON(message);
      for (const m of msg) {
        const outgoing = await bs.SendMessage(m);
        client.send("[" + outgoing.toJSON() + "]");
      }
    });

    bs.on("message", function outgoing(message) {
      client.send("[" + message.toJSON() + "]");
    });
  });

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

    process.exit();
  });
}

main();

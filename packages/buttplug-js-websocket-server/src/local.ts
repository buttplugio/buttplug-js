import * as commander from "commander";
import * as fs from "fs";
import * as util from "util";
import * as https from "https";
import * as http from "http";
import { ButtplugClient, ButtplugServer, ButtplugMessage, FromJSON, ButtplugEmbeddedServerConnector } from "buttplug";
import { ButtplugNodeBluetoothLEDeviceManager } from "buttplug-node-bluetoothle-manager";
const selfsigned = require("selfsigned");

async function main() {
  process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });

  commander
    .version("0.0.1-alpha")
    .parse(process.argv);
  let res;
  const p = new Promise((resolve, reject) => { res = resolve });
  const bs = new ButtplugServer();
  bs.AddDeviceManager(new ButtplugNodeBluetoothLEDeviceManager());
  const localConnector = new ButtplugEmbeddedServerConnector();
  localConnector.Server = bs;
  const bc = new ButtplugClient("Buttplug Local Client");
  await bc.Connect(localConnector);
  bc.on("deviceadded", (d) => {
    console.log(`Device Found: ${d.Name}`);
    res();
  });
  console.log("starting scan");
  await bc.StartScanning();
  console.log("scanning");
  await p;
  console.log("Found a device, exiting.")
  await bc.Disconnect();
  process.exit();
}

main();

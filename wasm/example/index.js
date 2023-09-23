import {ButtplugWasmClientConnector} from "../dist/buttplug-wasm.mjs";
import {ButtplugClient} from "../../js/dist/web/buttplug.mjs";

async function test_wasm() {
  let client = new ButtplugClient("Test Client");
  await ButtplugWasmClientConnector.activateLogging();
  await client.connect(new ButtplugWasmClientConnector());
  await client.startScanning();
}
onload = () => document.getElementById('b').onclick = () => test_wasm();

let client;
let index;

async function test_wasm() {
  index = await import("../../pkg/buttplug.js");
  console.log("Imported WASM");
  index.buttplug_activate_env_logger("debug");
  let ptr = 0;
  client = index.buttplug_create_embedded_wasm_connector("test client", () => {}, ptr);
  console.log(ptr);
  let rsi = `
  [
    {
      "RequestServerInfo": {
        "Id": 1,
        "ClientName": "Test Client",
        "MessageVersion": 3
      }
    }
  ]
  `;
  index.buttplug_client_send_json_message(client, new TextEncoder().encode(rsi), (output) => {
    let str = new TextDecoder().decode(output);
    console.log(str);
  });
}

function start_scanning() {
  let startscanning = `
  [
    {
      "StartScanning": {
        "Id": 1
      }
    }
  ]
  `;
  index.buttplug_client_send_json_message(client, new TextEncoder().encode(startscanning), (output) => {
    let str = new TextDecoder().decode(output);
    console.log(str);
  });
}

test_wasm()
onload = () => document.getElementById('b').onclick = () => start_scanning();
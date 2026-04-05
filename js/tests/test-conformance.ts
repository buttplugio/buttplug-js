/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

/**
 * Conformance tests for ButtplugClient against the Buttplug v4 protocol.
 *
 * Each test spins up a minimal in-process WebSocket server that implements just
 * enough of the protocol to drive the client through one conformance scenario.
 * This is analogous to how the Rust buttplug_client tests use
 * build_conformance_server + ButtplugInProcessClientConnector.
 *
 * NOTE: Using the Rust conformance harness binary directly is not viable here
 * because the harness sends RequestServerInfo as a side-effect (directly to the
 * server), which collides with ButtplugClient also sending it on connect —
 * the server rejects the second one with HandshakeAlreadyHappened.
 *
 * Known failures (as of writing):
 *   ping_required — ping timer in ButtplugClient.ts is commented out (~line 134)
 *
 * Discovered bugs:
 *   DeviceFeatureOutput.Value typed as `number` in Messages.ts but the
 *   implementation (ButtplugClientDeviceFeature.ts:66) reads Value[1] as an
 *   array index — the interface definition is wrong.
 */

import WebSocket, { WebSocketServer } from "ws";
import {
  ButtplugClient,
  ButtplugNodeWebsocketClientConnector,
  DeviceOutput,
} from "../src";
import * as Messages from "../src/core/Messages";

const PORT_BASE = 14000;

jest.setTimeout(15000);

// ─── Protocol helpers ─────────────────────────────────────────────────────────

function msgId(msg: Messages.ButtplugMessage): number | undefined {
  for (const [, v] of Object.entries(msg)) {
    if (v !== undefined) return (v as { Id?: number }).Id;
  }
}

// ─── Conformance device definitions ──────────────────────────────────────────
//
// DeviceFeatureOutput.Value must be [min, max] even though Messages.ts types it
// as `number`. The feature implementation reads Value[1] as the step ceiling.

const DEVICES: Messages.DeviceList["Devices"] = {
  0: {
    DeviceIndex: 0,
    DeviceName: "Conformance Test Vibrator",
    DeviceFeatures: {
      0: { FeatureDescriptor: "Vibrate 1", FeatureIndex: 0,
           Output: { Vibrate: { Value: [0, 100] as unknown as number } }, Input: {} },
      1: { FeatureDescriptor: "Vibrate 2", FeatureIndex: 1,
           Output: { Vibrate: { Value: [0, 100] as unknown as number } }, Input: {} },
      2: { FeatureDescriptor: "Rotate",    FeatureIndex: 2,
           Output: { Rotate: { Value: [-100, 100] as unknown as number } }, Input: {} },
      3: { FeatureDescriptor: "Battery",   FeatureIndex: 3,
           Output: {},
           Input: { Battery: { Value: [0, 100], Command: [Messages.InputCommandType.Read] } } },
    },
  },
  1: {
    DeviceIndex: 1,
    DeviceName: "Conformance Test Positioner",
    DeviceFeatures: {
      0: { FeatureDescriptor: "Position",   FeatureIndex: 0,
           Output: { Position: { Value: [0, 100] as unknown as number } }, Input: {} },
      1: { FeatureDescriptor: "Position With Duration", FeatureIndex: 1,
           Output: { HwPositionWithDuration: { Value: [0, 100] as unknown as number, Duration: 10000 } }, Input: {} },
      2: { FeatureDescriptor: "Oscillate",  FeatureIndex: 2,
           Output: { Oscillate: { Value: [0, 100] as unknown as number } }, Input: {} },
      3: { FeatureDescriptor: "Button",     FeatureIndex: 3,
           Output: {},
           Input: { Button: { Value: [0, 1], Command: [Messages.InputCommandType.Subscribe, Messages.InputCommandType.Unsubscribe] } } },
    },
  },
  2: {
    DeviceIndex: 2,
    DeviceName: "Conformance Test Multi",
    DeviceFeatures: {
      0: { FeatureDescriptor: "Constrict",    FeatureIndex: 0,
           Output: { Constrict: { Value: [0, 100] as unknown as number } }, Input: {} },
      1: { FeatureDescriptor: "Spray",        FeatureIndex: 1,
           Output: { Spray: { Value: [0, 100] as unknown as number } }, Input: {} },
      2: { FeatureDescriptor: "Temperature",  FeatureIndex: 2,
           Output: { Temperature: { Value: [-100, 100] as unknown as number } }, Input: {} },
      3: { FeatureDescriptor: "Led",          FeatureIndex: 3,
           Output: { Led: { Value: [0, 100] as unknown as number } }, Input: {} },
      4: { FeatureDescriptor: "RSSI",         FeatureIndex: 4,
           Output: {},
           Input: { RSSI: { Value: [-128, 0], Command: [Messages.InputCommandType.Read] } } },
      5: { FeatureDescriptor: "Pressure",     FeatureIndex: 5,
           Output: {},
           Input: { Pressure: { Value: [0, 65535], Command: [Messages.InputCommandType.Subscribe, Messages.InputCommandType.Unsubscribe] } } },
    },
  },
};

// ─── Minimal in-test server ───────────────────────────────────────────────────

class MinimalButtplugServer {
  private wss: WebSocketServer;
  private ws: WebSocket | null = null;
  readonly received: Messages.ButtplugMessage[] = [];
  private _connectResolve: (() => void) | null = null;

  constructor(port: number, private maxPingTime = 0) {
    this.wss = new WebSocketServer({ port });
    this.wss.on("connection", ws => {
      this.ws = ws;
      ws.on("message", (raw: Buffer) => this.handle(raw.toString()));
      this._connectResolve?.();
    });
  }

  waitForClient(): Promise<void> {
    return new Promise(resolve => { this._connectResolve = resolve; });
  }

  private _rejectNextOutput = false;

  private send(msg: Messages.ButtplugMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify([msg]));
    }
  }

  private handle(raw: string): void {
    const msgs = JSON.parse(raw) as Messages.ButtplugMessage[];
    for (const msg of msgs) {
      this.received.push(msg);
      const id = msgId(msg);

      if (msg.RequestServerInfo !== undefined) {
        this.send({ ServerInfo: {
          Id: id, ServerName: "Conformance Test Server",
          MaxPingTime: this.maxPingTime,
          ProtocolVersionMajor: 4, ProtocolVersionMinor: 0,
        }});
      } else if (msg.RequestDeviceList !== undefined) {
        // Respond with empty list initially; devices appear after StartScanning
        this.send({ DeviceList: { Id: id, Devices: {} } });
      } else if (msg.StartScanning !== undefined) {
        this.send({ Ok: { Id: id } });
        // Push device list + ScanningFinished after a short tick
        setTimeout(() => {
          this.send({ DeviceList: { Id: 0, Devices: DEVICES } });
          this.send({ ScanningFinished: { Id: 0 } });
        }, 50);
      } else if (msg.StopScanning !== undefined) {
        this.send({ Ok: { Id: id } });
      } else if (msg.OutputCmd !== undefined) {
        if (this._rejectNextOutput) {
          this._rejectNextOutput = false;
          this.send({ Error: {
            Id: id,
            ErrorMessage: "Device command rejected by server",
            ErrorCode: Messages.ErrorClass.ERROR_DEVICE,
          }});
        } else {
          this.send({ Ok: { Id: id } });
        }
      } else if (msg.InputCmd !== undefined) {
        this.send({ Ok: { Id: id } });
      } else if (msg.StopCmd !== undefined) {
        this.send({ Ok: { Id: id } });
      } else if (msg.Ping !== undefined) {
        this.send({ Ok: { Id: id } });
      }
    }
  }

  /** Push a new device list (e.g. to simulate device removal). */
  pushDeviceList(devices: Messages.DeviceList["Devices"]): void {
    this.send({ DeviceList: { Id: 0, Devices: devices } });
  }

  /** Drop the WebSocket connection from the server side. */
  dropConnection(): void {
    this.ws?.close();
  }

  /** Cause the next OutputCmd to receive an Error response instead of Ok. */
  rejectNextOutputCmd(): void {
    this._rejectNextOutput = true;
  }

  count(type: keyof Messages.ButtplugMessage): number {
    return this.received.filter(m => m[type] !== undefined).length;
  }

  async close(): Promise<void> {
    this.ws?.terminate();
    return new Promise(resolve => this.wss.close(() => resolve()));
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

async function connectClient(
  port: number
): Promise<{ client: ButtplugClient; cleanup: () => Promise<void> }> {
  const client = new ButtplugClient("JS Conformance Test");
  const connector = new ButtplugNodeWebsocketClientConnector(
    `ws://127.0.0.1:${port}`
  );
  await client.connect(connector);
  return {
    client,
    cleanup: async () => {
      if (client.connected) {
        await client.disconnect().catch(() => {});
      }
    },
  };
}

async function waitForDevices(
  client: ButtplugClient,
  count: number
): Promise<void> {
  return new Promise(resolve => {
    let seen = 0;
    client.on("deviceadded", () => {
      seen++;
      if (seen >= count) resolve();
    });
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("ButtplugClient Conformance Tests", () => {
  let server: MinimalButtplugServer;

  afterEach(async () => {
    await server.close();
  });

  // ─── core_protocol ─────────────────────────────────────────────────────────
  it("core_protocol: connect, enumerate 3 devices, send output commands", async () => {
    server = new MinimalButtplugServer(PORT_BASE);
    const { client, cleanup } = await connectClient(PORT_BASE);

    const ready = waitForDevices(client, 3);
    await client.startScanning();
    await ready;

    expect(client.devices.size).toBe(3);

    const names = Array.from(client.devices.values()).map(d => d.name);
    expect(names).toContain("Conformance Test Vibrator");
    expect(names).toContain("Conformance Test Positioner");
    expect(names).toContain("Conformance Test Multi");

    const vibrator    = client.devices.get(0)!;
    const positioner  = client.devices.get(1)!;
    const multi       = client.devices.get(2)!;

    // --- Output commands ---
    const cmdsBefore = server.count("OutputCmd");

    await vibrator.runOutput(DeviceOutput.Vibrate.percent(0.5));
    await positioner.runOutput(DeviceOutput.Position.percent(0.5));
    await positioner.runOutput(DeviceOutput.Oscillate.percent(0.75));
    await multi.runOutput(DeviceOutput.Constrict.percent(0.5));
    await multi.runOutput(DeviceOutput.Spray.percent(0.5));
    await multi.runOutput(DeviceOutput.Temperature.percent(0.5));
    await multi.runOutput(DeviceOutput.Led.percent(0.5));

    // Vibrator has 2 Vibrate features — runOutput fans out to both
    const cmdsAfter = server.count("OutputCmd");
    // 2 (vibrate×2) + 1 + 1 + 1 + 1 + 1 + 1 = 8
    expect(cmdsAfter - cmdsBefore).toBe(8);

    // --- Stop commands ---
    await vibrator.stop();
    expect(server.count("StopCmd")).toBeGreaterThanOrEqual(1);

    await client.stopAllDevices();
    expect(server.count("StopCmd")).toBeGreaterThanOrEqual(2);

    await cleanup();
  });

  // ─── ping_required ─────────────────────────────────────────────────────────
  // KNOWN FAILURE: The ping timer in ButtplugClient.ts (initializeConnection,
  // ~line 134) is commented out. The client receives MaxPingTime > 0 in
  // ServerInfo but never sends Ping. This test will FAIL until the timer is
  // uncommented and method names updated to the current API.
  it("ping_required: client must send Ping when MaxPingTime > 0 [KNOWN FAILURE]", async () => {
    // Server requires a ping every 500ms
    server = new MinimalButtplugServer(PORT_BASE + 1, 500);
    const { client } = await connectClient(PORT_BASE + 1);
    client.on("disconnect", () => {});

    // Wait 1.5× the MaxPingTime; a correct client would have pinged by now
    await sleep(750);

    const pings = server.count("Ping");
    console.log(`  Ping messages received by server: ${pings}`);
    if (pings === 0) {
      console.log("  NOTE: Ping timer is commented out in ButtplugClient.ts ~line 134.");
    }
    // A compliant client must have sent at least one Ping within 500ms
    expect(pings).toBeGreaterThan(0);
  });

  // ─── error_handling ────────────────────────────────────────────────────────
  it("error_handling: client surfaces device errors and stays usable", async () => {
    server = new MinimalButtplugServer(PORT_BASE + 2);
    const { client, cleanup } = await connectClient(PORT_BASE + 2);

    const ready = waitForDevices(client, 3);
    await client.startScanning();
    await ready;

    const vibrator = client.devices.get(0)!;
    // Use feature-level API to send a single OutputCmd (device.runOutput fans
    // out to all matching features, making it hard to inject a single rejection)
    const feature0 = vibrator.features.get(0)!;

    // Server will reject the next OutputCmd with a device Error
    server.rejectNextOutputCmd();

    // The client should surface the error as a rejected promise
    await expect(
      feature0.runOutput(DeviceOutput.Vibrate.percent(0.5))
    ).rejects.toBeDefined();

    // Connection must still be usable after a device error
    expect(client.connected).toBe(true);

    // Subsequent command succeeds normally
    await expect(
      feature0.runOutput(DeviceOutput.Vibrate.percent(0.25))
    ).resolves.toBeUndefined();

    await cleanup();
  });

  // ─── ping_timeout ──────────────────────────────────────────────────────────
  it("ping_timeout: client emits disconnect when server closes connection", async () => {
    server = new MinimalButtplugServer(PORT_BASE + 3, 300);
    const { client } = await connectClient(PORT_BASE + 3);

    const disconnected = new Promise<void>(resolve =>
      client.on("disconnect", resolve)
    );

    // Simulate server dropping the connection (as a real server would after
    // the ping timeout, since the client never pings)
    setTimeout(() => server.dropConnection(), 400);

    await expect(disconnected).resolves.toBeUndefined();
    expect(client.connected).toBe(false);
  });

  // ─── reconnection ──────────────────────────────────────────────────────────
  // Whether this passes depends on whether ButtplugClient can reconnect (it
  // can, using a new connector) and whether timing allows it. The test
  // explicitly creates a new client/server to exercise the reconnect path.
  it("reconnection: new client connects successfully after server restart", async () => {
    // First server + client
    server = new MinimalButtplugServer(PORT_BASE + 4);
    const { client: client1 } = await connectClient(PORT_BASE + 4);

    const client1Disconnected = new Promise<void>(resolve =>
      client1.on("disconnect", resolve)
    );

    // Tear down first server
    await server.close();
    await expect(client1Disconnected).resolves.toBeUndefined();

    // Re-open server on same port — simulates server restart
    server = new MinimalButtplugServer(PORT_BASE + 4);

    // Fresh client should connect successfully
    const { client: client2, cleanup } = await connectClient(PORT_BASE + 4);
    expect(client2.connected).toBe(true);

    await cleanup();
  });
});

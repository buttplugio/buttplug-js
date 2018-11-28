import { ButtplugClient, CheckMessage, ButtplugServer, ButtplugEmbeddedServerConnector } from "../src/index";
import { TestDeviceManager } from "../src/devtools/index";
import { BluetoothDeviceInfo } from "../src/server/bluetooth/BluetoothDeviceInfo";
import * as Messages from "../src/core/Messages";
import { WebBluetoothMock, DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";

export class BPTestClient extends ButtplugClient {
  constructor(ClientName: string) {
    super(ClientName);
  }
  public get PingTimer() {
    return this._pingTimer;
  }

  public async SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>  {
    return super.SendMessage(aMsg);
  }
}

export function SetupLovenseTestDevice(mockBT: WebBluetoothMockObject, deviceLetter: string = "W") {
  const oldWrite = mockBT.txChar.writeValue;
  mockBT.txChar.writeValue = async (): Promise<void> => {
    const infoBuf = Buffer.from(`${deviceLetter}:01:000000000000`);
    const arrBuf = new ArrayBuffer(infoBuf.length);
    // If we don't convert and load into a view, the buffer conversion later
    // won't work.
    const view = new Uint8Array(arrBuf);
    for (let i = 0; i < infoBuf.length; ++i) {
      view[i] = infoBuf[i];
    }
    mockBT.rxChar.value = new DataView(arrBuf);
    mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
    mockBT.txChar.writeValue = oldWrite;
  };
}

export function SetupTestSuite() {
  // None of our tests should take very long.
  jest.setTimeout(1000);
  process.on("unhandledRejection", (reason, p) => {
    throw new Error(`Unhandled Promise rejection!\n---\n${reason.stack}\n---\n`);
  });
}

export class WebBluetoothMockObject {
  constructor(public device: DeviceMock,
              public gatt: GattMock,
              public service: PrimaryServiceMock,
              public txChar: CharacteristicMock,
              public rxChar: CharacteristicMock) {
  }
}

export function MakeMockWebBluetoothDevice(deviceInfo: BluetoothDeviceInfo): WebBluetoothMockObject {
  let name: string;
  if (deviceInfo.Names.length > 0) {
    name = deviceInfo.Names[0];
  } else if (deviceInfo.NamePrefixes.length > 0) {
    name = deviceInfo.NamePrefixes[0] + "-test";
  } else {
    throw new Error("Cannot create mock device!");
  }
  const device = new DeviceMock(name, [deviceInfo.Services[0]]);
  const gatt = device.gatt;
  const service = device.getServiceMock(deviceInfo.Services[0]);
  let tx: CharacteristicMock;
  if (Object.keys(deviceInfo.Characteristics).indexOf("tx") !== -1) {
    tx = service.getCharacteristicMock((deviceInfo.Characteristics as any).tx);
  } else {
    // In this case, we are expected to query devices and find rx/tx
    // characteristics. Since this is a test and we have no devices, we can't do
    // that. Just make one up.
    tx = service.getCharacteristicMock("55555555-5555-5555-5555-555555555555");
    tx.properties.write = true;
    tx.properties.writeWithoutResponse = true;
  }
  let rx: CharacteristicMock;
  if (Object.keys(deviceInfo.Characteristics).indexOf("rx") !== -1) {
    rx = service.getCharacteristicMock((deviceInfo.Characteristics as any).rx);
  } else {
    // In this case, we are expected to query devices and find rx/tx
    // characteristics. Since this is a test and we have no devices, we can't do
    // that. Just make one up.
    rx = service.getCharacteristicMock("55555556-5555-5555-5555-555555555555");
    rx.properties.notify = true;
  }
  return new WebBluetoothMockObject(device, gatt, service, tx, rx);
}

export async function SetupTestServer(): Promise<any> {
  const client = new ButtplugClient("Test Client");
  const server = new ButtplugServer("Test Server");
  server.ClearDeviceManagers();
  const testdevicemanager = new TestDeviceManager();
  server.AddDeviceManager(testdevicemanager);
  const localConnector = new ButtplugEmbeddedServerConnector();
  localConnector.Server = server;
  await client.Connect(localConnector);
  return Promise.resolve({Client: client,
                          Server: server,
                          TestDeviceManager: testdevicemanager,
                          Connector: localConnector});
}

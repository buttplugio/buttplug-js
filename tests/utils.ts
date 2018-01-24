import { ButtplugClient, CheckMessage } from "../src/index";
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
  public async SendCheckedMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    this.CheckConnector();
    // This will throw if our message is invalid
    CheckMessage(aMsg);
    return await this.SendUncheckedMessage(aMsg);
  }

  public async SendUncheckedMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>  {
    let r;
    aMsg.Id = this._counter;
    const msgPromise = new Promise<Messages.ButtplugMessage>((resolve) => { r = resolve; });
    this._waitingMsgs.set(this._counter, r);
    this._counter += 1;
    this._connector!.Send(aMsg);
    return await msgPromise;
  }
}

export function SetupTestSuite() {
  // None of our tests should take very long.
  jest.setTimeout(1000);
  process.on("unhandledRejection", (error) => {
    throw new Error("Unhandled Promise rejection!");
  });
}

export class WebBluetoothMockObject {
  constructor(public device: DeviceMock,
              public gatt: GattMock,
              public service: PrimaryServiceMock,
              public txChar: CharacteristicMock) {
  }
}

export function MakeMockWebBluetoothDevice(deviceInfo: BluetoothDeviceInfo): WebBluetoothMockObject {
  const device = new DeviceMock(deviceInfo.Names[0], [deviceInfo.Services[0]]);
  const gatt = device.gatt;
  const service = device.getServiceMock(deviceInfo.Services[0]);
  const tx = service.getCharacteristicMock((deviceInfo.Characteristics as any).tx);
  return new WebBluetoothMockObject(device, gatt, service, tx);
}

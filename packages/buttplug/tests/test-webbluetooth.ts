/*
import { WebBluetoothMock, DeviceMock, CharacteristicMock, PrimaryServiceMock, GattMock } from "web-bluetooth-mock";
import { ButtplugClient } from "../src/client/Client";
import { SetupTestSuite } from "./utils";
import { GetEndpoint, Endpoints, DeviceConfigurationManager,
         ButtplugDevice, ButtplugEmbeddedClientConnector } from "../src/index";
import { ButtplugDeviceException } from "../src/core/Exceptions";
import { BluetoothLEProtocolConfiguration } from "../src/devices/configuration/BluetoothLEProtocolConfiguration";
import { WebBluetoothDevice } from "../src/server/managers/webbluetooth/WebBluetoothDevice";

SetupTestSuite();

export class WebBluetoothMockObject {
  constructor(public device: DeviceMock,
              public gatt: GattMock,
              public service: PrimaryServiceMock,
              public txChar: CharacteristicMock,
              public rxChar: CharacteristicMock) {
  }
}

export function MakeMockWebBluetoothDevice(deviceInfo: BluetoothLEProtocolConfiguration): WebBluetoothMockObject {
  let name: string;
  name = deviceInfo.Names[0];

  if (name.endsWith("*")) {
    name = name.substr(0, name.length - 1).concat("Test");
  }

  const firstService = deviceInfo.Services.entries().next().value;
  const [serviceUuid, serviceChrs] = firstService;

  const device = new DeviceMock(name, [serviceUuid]);
  const gatt = device.gatt;
  const service = device.getServiceMock(serviceUuid);

  // TODO Instead of building a bunch of fake characteristics, we should use
  // what's listed in the config file, and only build when we expect to do discovery anyways.
  let tx: CharacteristicMock;
  if (serviceChrs.has(GetEndpoint(Endpoints.Tx)!)) {
    tx = service.getCharacteristicMock(serviceChrs.get(GetEndpoint(Endpoints.Tx)!)!);
  } else {
    // In this case, we are expected to query devices and find rx/tx
    // characteristics. Since this is a test and we have no devices, we can't do
    // that. Just make one up.
    tx = service.getCharacteristicMock("55555555-5555-5555-5555-555555555555");
  }
  tx.properties.write = true;
  tx.properties.writeWithoutResponse = true;
  let rx: CharacteristicMock;
  if (serviceChrs.has(GetEndpoint(Endpoints.Rx)!)) {
    rx = service.getCharacteristicMock(serviceChrs.get(GetEndpoint(Endpoints.Rx)!)!);
  } else {
    // In this case, we are expected to query devices and find rx/tx
    // characteristics. Since this is a test and we have no devices, we can't do
    // that. Just make one up.
    rx = service.getCharacteristicMock("55555556-5555-5555-5555-555555555555");
  }
  rx.properties.notify = true;
  return new WebBluetoothMockObject(device, gatt, service, tx, rx);
}

describe("WebBluetooth library tests", () => {
  let p: Promise<void>;
  let res: () => void;
  let bp: ButtplugClient;
  let mockBT: WebBluetoothMockObject;
  let bluetooth: WebBluetoothMock;

  beforeEach(async () => {
    p = new Promise((resolve) => { res = resolve; });
    // We assume we're using a lovense device for all tests here so set it up.
    DeviceConfigurationManager.LoadFromInternalConfig();
    // If we don't have a lovense definition, this will all come crashing down,
    // but meh, whatever.
    const [config, protocolType] = DeviceConfigurationManager
      .Manager
      .Find(new BluetoothLEProtocolConfiguration(["LVS-test"], new Map<string, Map<Endpoints, string>>()))!;
    mockBT = MakeMockWebBluetoothDevice(config as BluetoothLEProtocolConfiguration);

    // Set up the device
    const deviceImpl = new WebBluetoothDevice(config as BluetoothLEProtocolConfiguration, mockBT.device);
    await deviceImpl.Connect();
    const protocol = new protocolType(deviceImpl);
    const device = new ButtplugDevice(protocol, deviceImpl);
    const identBuffer = Buffer.from("W:01:000000000000", "utf8");
    mockBT.rxChar.value = new DataView(identBuffer.buffer, identBuffer.byteOffset, identBuffer.byteLength);
    const g = global as any;
    g.navigator = g.navigator || {};
    bluetooth = new WebBluetoothMock([mockBT.device]);
    g.navigator.bluetooth = bluetooth;
    bp = new ButtplugClient("Bluetooth Test Client");
    await bp.Connect(new ButtplugEmbeddedClientConnector());
  });

  it("should find webbluetooth, add manager, discover device", async () => {
    jest.spyOn(bluetooth, "requestDevice");
    jest.spyOn(mockBT.gatt, "connect");
    jest.spyOn(mockBT.txChar, "writeValue");
    process.nextTick(() => {
      mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
    });

    await bp.StartScanning();

    expect(bluetooth.requestDevice).toHaveBeenCalled();
    expect(mockBT.gatt.connect).toHaveBeenCalled();
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("DeviceType;"));
  });

  it("should emit device removed on disconnect", async () => {
    bp.on("deviceremoved", () => res());
    process.nextTick(() => {
      mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
    });
    await bp.StartScanning();
    await bp.StopScanning();
    mockBT.device.dispatchEvent(new Event("gattserverdisconnected"));
    return p;
  });

  it("should write value to port on message", async () => {
    process.nextTick(() => {
      mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
    });
    await bp.StartScanning();
    await bp.StopScanning();
    jest.spyOn(mockBT.txChar, "writeValue");
    await bp.Devices[0].SendVibrateCmd(1);
    expect(mockBT.txChar.writeValue).toBeCalledWith(Buffer.from("Vibrate:20;"));
  });

  it("should stop scanning on requestdevice being cancelled", async () => {
    bp.on("scanningfinished", () => res());
    bluetooth.requestDevice = () => {
      throw new ButtplugDeviceException("User cancelled");
    };
    process.nextTick(() => {
      mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
    });
    await bp.StartScanning();
    return p;
  });

  it("should stop scanning on device not opening", async () => {
    bp.on("scanningfinished", () => res());
    mockBT.gatt.connect = () => {
      throw new Error("Injected connection error");
    };
    // Make sure we at least have the right error code. Id and message may vary.
    await expect(bp.StartScanning())
      .rejects
      .toThrow(new Error("Cannot open device LVS-Test: Error: Injected connection error"));
    return p;
  });

  it("should subscribe on connect for lovense device, unsubscribe on disconnect", async () => {
    jest.spyOn(mockBT.rxChar, "startNotifications");
    jest.spyOn(mockBT.rxChar, "stopNotifications");
    process.nextTick(() => {
      mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
    });
    await bp.StartScanning();
    await bp.StopScanning();
    expect(mockBT.rxChar.startNotifications).toBeCalled();
    await bp.Disconnect();
    expect(mockBT.rxChar.stopNotifications).toBeCalled();
  });

  it("should throw all the way up through the client when write fails", async () => {
    process.nextTick(() => {
      mockBT.rxChar.dispatchEvent(new CustomEvent("characteristicvaluechanged"));
    });
    await bp.StartScanning();
    await bp.StopScanning();
    const oldValue = mockBT.txChar.writeValue;
    mockBT.txChar.writeValue = () => {
      throw new DOMException("GATT operation already in progress.");
    };
    await expect(bp.Devices[0].SendVibrateCmd(1)).rejects.toThrow();
    mockBT.txChar.writeValue = oldValue;
  });
});
*/
import { DeviceConfigurationManager, Endpoints } from "../src";
import { BluetoothLEProtocolConfiguration } from "../src/devices/configuration/BluetoothLEProtocolConfiguration";

describe("Device Configuration Manager Tests", async () => {
  beforeEach(() => {
    DeviceConfigurationManager.LoadFromInternalConfig();
  });

  it("Find static named protocols correctly", () => {
    const wevibeConfig = new BluetoothLEProtocolConfiguration(["Cougar"], new Map<string, Map<Endpoints, string>>());
    expect(DeviceConfigurationManager.Manager.Find(wevibeConfig)).toBeTruthy();
  });

  it("Find wildcarded protocols correctly", () => {
    const lovenseConfig = new BluetoothLEProtocolConfiguration(["LVS-Test"], new Map<string, Map<Endpoints, string>>());
    expect(DeviceConfigurationManager.Manager.Find(lovenseConfig)).toBeTruthy();
  });

  it("Return false on invalid protocols", () => {
    const invalidConfig = new BluetoothLEProtocolConfiguration(["Whatever"], new Map<string, Map<Endpoints, string>>());
    expect(DeviceConfigurationManager.Manager.Find(invalidConfig)).toBeFalsy();
  });

  it("GetAllConfigsOfType should return > 0 types", () => {
    expect(DeviceConfigurationManager
           .Manager
           .GetAllConfigsOfType(BluetoothLEProtocolConfiguration)
           .length).toBeGreaterThan(0);
  });
});

import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../index";
import { TestDevice } from "./TestDevice";
import { ButtplugLogger } from "../index";

export class TestDeviceManager extends EventEmitter implements IDeviceSubtypeManager {

  private _isScanning = false;
  private _testVibrationDevice = new TestDevice("Test Vibration Device", true, false, false);
  private _testLinearDevice = new TestDevice("Test Linear Device", false, true, false);
  private _testRotationDevice = new TestDevice("Test Rotation Device", false, false, true);

  public constructor() {
    super();
  }

  public ConnectVibrationDevice() {
    ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Vibration Device");
    this._testVibrationDevice.Connected = true;
    this.emit("deviceadded", this._testVibrationDevice);
  }

  public ConnectLinearDevice() {
    ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Linear Device");
    this._testLinearDevice.Connected = true;
    this.emit("deviceadded", this._testLinearDevice);
  }

  public ConnectRotationDevice() {
    ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Rotation Device");
    this._testRotationDevice.Connected = true;
    this.emit("deviceadded", this._testRotationDevice);
  }

  public StartScanning(): void {
    ButtplugLogger.Logger.Debug("TestDeviceManager: Starting Scan");
    this._isScanning = true;
    // Always emit devices. If they're duplicates, the device manager will weed
    // them out.
    setTimeout(() =>  {
      this.ConnectVibrationDevice();
      this.ConnectLinearDevice();
      this.ConnectRotationDevice();
    }, 50);
    setTimeout(() => this.StopScanning(), 100);
  }

  public get VibrationDevice() {
    return this._testVibrationDevice;
  }

  public get LinearDevice() {
    return this._testLinearDevice;
  }

  public get RotationDevice() {
    return this._testRotationDevice;
  }

  public StopScanning(): void {
    ButtplugLogger.Logger.Debug("TestDeviceManager: Stopping Scan");
    this._isScanning = false;
    this.emit("scanningfinished");
  }

  public get IsScanning(): boolean {
    return this._isScanning;
  }
}

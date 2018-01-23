import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../index";
import { TestDevice } from "./TestDevice";

export class TestDeviceManager extends EventEmitter implements IDeviceSubtypeManager {

  public static Get(): TestDeviceManager {
    if (!TestDeviceManager._testManager) {
      TestDeviceManager._testManager = new TestDeviceManager();
    }
    return TestDeviceManager._testManager;
  }

  private static _testManager: TestDeviceManager | null = null;

  private _isScanning = false;
  private _testVibrationDevice = new TestDevice("Test Vibration Device", true, false);
  private _testLinearDevice = new TestDevice("Test Linear Device", false, true);

  protected constructor() {
    super();
  }

  public ConnectVibrationDevice() {
    this._testVibrationDevice.Connected = true;
    this.emit("deviceadded", this._testVibrationDevice);
  }

  public ConnectLinearDevice() {
    this._testLinearDevice.Connected = true;
    this.emit("deviceadded", this._testLinearDevice);
  }

  public StartScanning(): void {
    this._isScanning = true;
    if (!this._testVibrationDevice.Connected) {
      setTimeout(() => this.ConnectVibrationDevice(), 50);
    }
    if (!this._testLinearDevice.Connected) {
      setTimeout(() => this.ConnectLinearDevice(), 50);
    }
    setTimeout(() => this.StopScanning(), 100);
  }

  public get VibrationDevice() {
    return this._testVibrationDevice;
  }

  public get LinearDevice() {
    return this._testLinearDevice;
  }

  public StopScanning(): void {
    this._isScanning = false;
    this.emit("scanningfinished");
  }

  public get IsScanning(): boolean {
    return this._isScanning;
  }

}

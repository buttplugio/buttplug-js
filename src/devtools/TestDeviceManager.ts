import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../index";
import { TestDevice } from "./TestDevice";

export class TestDeviceManager extends EventEmitter implements IDeviceSubtypeManager {

  private _isScanning = false;

  public StartScanning(): void {
    this._isScanning = true;
    setTimeout(() => this.emit("deviceadded", new TestDevice("Test Device 1")), 250);
    setTimeout(() => this.StopScanning(), 500);
  }

  public StopScanning(): void {
    this._isScanning = false;
    this.emit("scanningfinished");
  }

  public get IsScanning(): boolean {
    return this._isScanning;
  }
}

/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { EventEmitter } from "events";
import { IDeviceSubtypeManager } from "../server/IDeviceSubtypeManager";
import { TestDeviceProtocol } from "./TestDeviceProtocol";
import { ButtplugLogger } from "../core/Logging";
import { ButtplugDevice } from "../devices/ButtplugDevice";
import { TestDeviceImpl } from "./TestDeviceImpl";

export class TestDeviceSubtypeManager extends EventEmitter implements IDeviceSubtypeManager {

  private _logger: ButtplugLogger = ButtplugLogger.Logger;
  private _isScanning = false;
  private _testVibrationDevice: ButtplugDevice;
  private _testLinearDevice: ButtplugDevice;
  private _testRotationDevice: ButtplugDevice;
  private _testVibrationProtocol: TestDeviceProtocol;
  private _testLinearProtocol: TestDeviceProtocol;
  private _testRotationProtocol: TestDeviceProtocol;

  public constructor() {
    super();
    let vibrationDevice = new TestDeviceImpl("Test Vibration Device");
    this._testVibrationProtocol = new TestDeviceProtocol(vibrationDevice.Name, vibrationDevice, true, false, false);
    this._testVibrationDevice = new ButtplugDevice(this._testVibrationProtocol, vibrationDevice);
    let linearDevice = new TestDeviceImpl("Test Linear Device");
    this._testLinearProtocol = new TestDeviceProtocol(linearDevice.Name, linearDevice, false, true, false);
    this._testLinearDevice = new ButtplugDevice(this._testLinearProtocol, linearDevice);
    let rotationDevice = new TestDeviceImpl("Test Rotation Device");
    this._testRotationProtocol = new TestDeviceProtocol(rotationDevice.Name, rotationDevice, false, false, true)
    this._testRotationDevice = new ButtplugDevice(this._testRotationProtocol, rotationDevice);
  }

  public SetLogger(aLogger: ButtplugLogger) {
    this._logger = aLogger;
  }

  public ConnectVibrationDevice() {
    this._logger.Debug("TestDeviceManager: Connecting Vibration Device");
    this.emit("deviceadded", this._testVibrationDevice);
  }

  public ConnectLinearDevice() {
    this._logger.Debug("TestDeviceManager: Connecting Linear Device");
    this.emit("deviceadded", this._testLinearDevice);
  }

  public ConnectRotationDevice() {
    this._logger.Debug("TestDeviceManager: Connecting Rotation Device");
    this.emit("deviceadded", this._testRotationDevice);
  }

  public StartScanning(): void {
    this._logger.Debug("TestDeviceManager: Starting Scan");
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

  public get VibrationProtocol() {
    return this._testVibrationProtocol;
  }

  public get LinearProtocol() {
    return this._testLinearProtocol;
  }

  public get RotationProtocol() {
    return this._testRotationProtocol;
  }

  public StopScanning(): void {
    this._logger.Debug("TestDeviceManager: Stopping Scan");
    this._isScanning = false;
    this.emit("scanningfinished");
  }

  public get IsScanning(): boolean {
    return this._isScanning;
  }
}


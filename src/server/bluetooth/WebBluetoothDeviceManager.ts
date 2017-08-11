import IDeviceSubtypeManager from "../IDeviceSubtypeManager";

export default class WebBluetoothDeviceManager implements IDeviceSubtypeManager {
  public StartScanning() {
    return false;
  }

  public StopScanning() {
    return false;
  }

  public IsScanning() {
    return false;
  }
}

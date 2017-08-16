import BluetoothDeviceInfo from "../BluetoothDeviceInfo";

export default class FleshlightLaunch {
  public static readonly DeviceInfo = new BluetoothDeviceInfo(["Launch"],
                                                              ["88f80580-0000-01e6-aace-0002a5d5c51b"],
                                                              { cmd: "88f80583-0000-01e6-aace-0002a5d5c51b",
                                                                rx: "88f80582-0000-01e6-aace-0002a5d5c51b",
                                                                tx: "88f80581-0000-01e6-aace-0002a5d5c51b"});
}

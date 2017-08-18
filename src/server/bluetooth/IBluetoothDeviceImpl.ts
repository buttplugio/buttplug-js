export default interface IBluetoothDeviceImpl {
  WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
  ReadValue: (aCharacteristic: string) => Promise<BufferSource>;
}

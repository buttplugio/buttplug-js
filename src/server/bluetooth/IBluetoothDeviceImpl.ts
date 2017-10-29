export interface IBluetoothDeviceImpl {
  Name: string;
  WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
  ReadValue: (aCharacteristic: string) => Promise<BufferSource>;
}

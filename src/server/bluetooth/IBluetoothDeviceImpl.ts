import { EventEmitter } from "events";

export interface IBluetoothDeviceImpl extends EventEmitter {
  Name: string;
  Id: string;
  WriteValue: (aCharacteristic: string, aValue: Uint8Array) => Promise<void>;
  WriteString: (aCharacteristic: string, aValue: string) => Promise<void>;
  ReadValue: (aCharacteristic: string) => Promise<BufferSource>;
  ReadString: (aCharacteristic: string) => Promise<string>;
  Subscribe: (aCharacteristic: string) => Promise<void>;
  Disconnect: () => Promise<void>;
}

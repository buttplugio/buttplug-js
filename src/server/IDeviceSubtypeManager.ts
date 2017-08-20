import {EventEmitter} from "events";

export default interface IDeviceSubtypeManager extends EventEmitter {
  StartScanning(): void;
  StopScanning(): void;
  IsScanning(): void;
}

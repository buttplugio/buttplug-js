import {EventEmitter} from "events";

export interface IDeviceSubtypeManager extends EventEmitter {
  readonly IsScanning: boolean;
  StartScanning(): void;
  StopScanning(): void;
}

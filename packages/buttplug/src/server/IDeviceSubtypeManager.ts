import {EventEmitter} from "events";
import { ButtplugLogger } from "../core/Logging";

export interface IDeviceSubtypeManager extends EventEmitter {
  readonly IsScanning: boolean;
  SetLogger(aLogger: ButtplugLogger): void;
  StartScanning(): void;
  StopScanning(): void;
}

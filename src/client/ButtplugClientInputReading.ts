import type { ButtplugClientDevice } from './ButtplugClientDevice';
import type { IButtplugClientDeviceFeature } from './ButtplugClientDeviceFeature';
import * as Messages from '../core/Messages';

export interface ButtplugClientInputReading {
  readonly device: ButtplugClientDevice;
  readonly feature: IButtplugClientDeviceFeature;
  readonly inputType: Messages.InputType;
  readonly value: number;
}

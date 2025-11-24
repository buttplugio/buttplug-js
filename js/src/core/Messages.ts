/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

// tslint:disable:max-classes-per-file
'use strict';

import { ButtplugMessageError } from "./Exceptions";

export const SYSTEM_MESSAGE_ID = 0;
export const DEFAULT_MESSAGE_ID = 1;
export const MAX_ID = 4294967295;
export const MESSAGE_SPEC_VERSION_MAJOR = 4;
export const MESSAGE_SPEC_VERSION_MINOR = 0;

// Base message interfaces
export interface ButtplugMessage {
  Ok?: Ok;
  Ping?: Ping;
  Error?: Error;
  RequestServerInfo?: RequestServerInfo;
  ServerInfo?: ServerInfo;
  RequestDeviceList?: RequestDeviceList;
  StartScanning?: StartScanning;
  StopScanning?: StopScanning;
  StopAllDevices?: StopAllDevices;
  ScanningFinished?: ScanningFinished;
  StopDeviceCmd?: StopDeviceCmd;
  InputCmd?: InputCmd;
  OutputCmd?: OutputCmd;
  DeviceList?: DeviceList;
};

export function msgId(msg: ButtplugMessage): number {
  for (let [_, entry] of Object.entries(msg)) {
    if (entry != undefined) {
      return entry.Id;
    }
  }
  throw new ButtplugMessageError(`Message ${msg} does not have an ID.`);
}

export function setMsgId(msg: ButtplugMessage, id: number) {
  for (let [_, entry] of Object.entries(msg)) {
    if (entry != undefined) {
      entry.Id = id;
      return;
    }
  }
  throw new ButtplugMessageError(`Message ${msg} does not have an ID.`);
}

export interface Ok {
  Id: number | undefined;
}

export interface Ping {
  Id: number | undefined;
}

export enum ErrorClass {
  ERROR_UNKNOWN,
  ERROR_INIT,
  ERROR_PING,
  ERROR_MSG,
  ERROR_DEVICE,
}

export interface Error {
  ErrorMessage: string;
  ErrorCode: ErrorClass;
  Id: number | undefined;
}

export interface RequestDeviceList {
  Id: number | undefined;
}

export interface StartScanning {
  Id: number | undefined;
}

export interface StopScanning {
  Id: number | undefined;
}

export interface StopAllDevices {
  Id: number | undefined;
}

export interface ScanningFinished {
  Id: number | undefined;
}

export interface RequestServerInfo {
  ClientName: string;
  ProtocolVersionMajor: number;
  ProtocolVersionMinor: number;
  Id: number | undefined;
}

export interface ServerInfo {
  MaxPingTime: number;
  ServerName: string;
  ProtocolVersionMajor: number;
  ProtocolVersionMinor: number;
  Id: number | undefined;
}

export interface DeviceFeature {
  FeatureDescriptor: string;
  Output: {[key: string]: DeviceFeatureOutput};
  Input: {[key: string]: DeviceFeatureInput};
  FeatureIndex: number;
}

export interface DeviceInfo {
  DeviceIndex: number;
  DeviceName: string;
  DeviceFeatures: {[key: number]: DeviceFeature};
  DeviceDisplayName?: string;
  DeviceMessageTimingGap?: number;
}

export interface DeviceList {
  Devices: {[key: number]: DeviceInfo};
  Id: number | undefined;
}

export enum OutputType {
  Unknown = 'Unknown',
  Vibrate = 'Vibrate',
  Rotate = 'Rotate',
  Oscillate = 'Oscillate',
  Constrict = 'Constrict',
  Inflate = 'Inflate',
  Position = 'Position',
  PositionWithDuration = 'PositionWithDuration',
  Temperature = 'Temperature',
  Led = 'Led'
}

export enum InputType {
  Unknown = 'Unknown',
  Battery = 'Battery',
  RSSI = 'RSSI',
  Button = 'Button',
  Pressure = 'Pressure',
  // Temperature,
  // Accelerometer,
  // Gyro,
}

export enum InputCommandType {
  Read = 'Read',
  Subscribe = 'Subscribe'
}

export interface DeviceFeatureInput {
  InputCommandType: InputCommandType[];
}

export interface DeviceFeatureOutput {
  Value?: number;
  Position?: number;
  Duration?: number;
} 

export interface OutputCmd  {
  DeviceIndex: number;
  FeatureIndex: number;
  Command: {[key: string]: DeviceFeatureOutput};
  Id: number | undefined;
}

// Device Input Commands

export interface InputCmd {
  DeviceIndex: number;
  FeatureIndex: number;
  InputType: InputType;
  InputCommandtype: InputCommandType;
  Id: number | undefined;
}

export interface InputValue {
  Level: number;
}

export interface InputReading {
  DeviceIndex: number;
  FeatureIndex: number;
  InputData: {[key: string]: InputValue};
  Id: number | undefined;
}

export interface StopDeviceCmd {
  Id: number | undefined;
  DeviceIndex: number;
}
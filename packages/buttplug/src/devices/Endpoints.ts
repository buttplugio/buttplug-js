/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

// taken from https://stackoverflow.com/questions/54039138/
type Entries<T extends object> = { [K in keyof T]: [K, T[K]] }[keyof T];

function reverseEnum<E extends Record<keyof E, string | number>>(
  e: E,
): { [K in E[keyof E]]: Extract<Entries<E>, [any, K]>[0] };
function reverseEnum(
  e: Record<string | number, string | number>,
): Record<string | number, string | number> {
  const ret: Record<string | number, string | number> = {};
  Object.keys(e).forEach((k) => ret[e[k]] = k);
  return ret;
}

function twoWayEnum<E extends Record<keyof E, string | number>>(e: E) {
  return Object.assign(reverseEnum(e), e);
}

export enum Endpoints {
  // Default outgoing endpoint name.
  Tx = "tx",

  // Default incoming endpoint name.
  Rx = "rx",

  // Command endpoint name. Used on some Kiiroo devices.
  Command = "command",

  // Generic name for devices that have a firmware loading endpoint.
  Firmware = "firmware",

  TxMode = "txmode",

  TxVibrate = "txvibrate",

  TxShock = "txshock",

  TxVendorControl = "txvendorcontrol",

  RxTouch = "rxtouch",

  RxAccel = "rxaccel",
}

const TwoWayEndpointsEnum = twoWayEnum(Endpoints);

export function GetEndpoint(aStrEndpoint: string): Endpoints | null {
  try {
    return TwoWayEndpointsEnum[aStrEndpoint];
  } catch {
    return null;
  }
}

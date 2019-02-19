/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { Endpoints } from "./Endpoints";

export class ButtplugDeviceWriteOptions
{
  public Endpoint: Endpoints = Endpoints.Tx;
  public WriteWithResponse: boolean = false;

  public constructor(init?:Partial<ButtplugDeviceWriteOptions>) {
    Object.assign(this, init);
  }
}

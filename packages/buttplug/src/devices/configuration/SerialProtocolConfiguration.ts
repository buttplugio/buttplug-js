/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { IProtocolConfiguration } from "./IProtocolConfiguration";

export class SerialProtocolConfiguration implements IProtocolConfiguration {
  public constructor(aObj: object) {
  }

  public Matches(aConfig: IProtocolConfiguration) : boolean {
    return false;
  }

  public Merge(aConfig: IProtocolConfiguration) : void {
  }
}

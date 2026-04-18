/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugError } from '../core/Exceptions';
import * as Messages from '../core/Messages';

export class ButtplugClientConnectorException extends ButtplugError {
  public constructor(message: string) {
    super(message, Messages.ErrorClass.ERROR_UNKNOWN);
  }
}

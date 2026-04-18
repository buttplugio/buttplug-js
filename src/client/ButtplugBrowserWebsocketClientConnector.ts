/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

'use strict';

import { IButtplugClientConnector } from './IButtplugClientConnector';
import { ButtplugMessage } from '../core/Messages';
import { ButtplugBrowserWebsocketConnector } from '../utils/ButtplugBrowserWebsocketConnector';

export class ButtplugBrowserWebsocketClientConnector
  extends ButtplugBrowserWebsocketConnector
  implements IButtplugClientConnector
{
  public send = (msg: ButtplugMessage): void => {
    if (!this.Connected) {
      throw new Error('ButtplugClient not connected');
    }
    this.sendMessage(msg);
  };
}

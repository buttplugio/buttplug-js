/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

'use strict';

import { ButtplugBrowserWebsocketClientConnector } from './ButtplugBrowserWebsocketClientConnector';
import { WebSocket as NodeWebSocket } from 'ws';

export class ButtplugNodeWebsocketClientConnector extends ButtplugBrowserWebsocketClientConnector {
  protected _websocketConstructor =
    NodeWebSocket as unknown as typeof WebSocket;
}

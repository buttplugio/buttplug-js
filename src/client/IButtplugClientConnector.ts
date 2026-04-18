/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { ButtplugMessage } from '../core/Messages';
import { EventEmitter } from 'eventemitter3';

export interface IButtplugClientConnector extends EventEmitter {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  initialize: () => Promise<void>;
  send: (msg: ButtplugMessage) => void;
  readonly Connected: boolean;
}

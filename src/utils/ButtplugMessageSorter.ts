/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as Messages from '../core/Messages';
import { ButtplugError } from '../core/Exceptions';

export class ButtplugMessageSorter {
  protected _counter = 1;
  protected _waitingMsgs: Map<
    number,
    [(val: Messages.ButtplugMessage) => void, (err: Error) => void]
  > = new Map();

  public constructor(private _useCounter: boolean) {}

  // One of the places we should actually return a promise, as we need to store
  // them while waiting for them to return across the line.
  // tslint:disable:promise-function-async
  public PrepareOutgoingMessage(
    msg: Messages.ButtplugMessage
  ): Promise<Messages.ButtplugMessage> {
    if (this._useCounter) {
      msg.Id = this._counter;
      // Always increment last, otherwise we might lose sync
      this._counter += 1;
    }
    let res;
    let rej;
    const msgPromise = new Promise<Messages.ButtplugMessage>(
      (resolve, reject) => {
        res = resolve;
        rej = reject;
      }
    );
    this._waitingMsgs.set(msg.Id, [res, rej]);
    return msgPromise;
  }

  public ParseIncomingMessages(
    msgs: Messages.ButtplugMessage[]
  ): Messages.ButtplugMessage[] {
    const noMatch: Messages.ButtplugMessage[] = [];
    for (const x of msgs) {
      if (x.Id !== Messages.SYSTEM_MESSAGE_ID && this._waitingMsgs.has(x.Id)) {
        const [res, rej] = this._waitingMsgs.get(x.Id)!;
        // If we've gotten back an error, reject the related promise using a
        // ButtplugException derived type.
        if (x.Type === Messages.Error) {
          rej(ButtplugError.FromError(x as Messages.Error));
          continue;
        }
        res(x);
        continue;
      } else {
        noMatch.push(x);
      }
    }
    return noMatch;
  }
}

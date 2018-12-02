import * as Messages from "../core/Messages";
import { ButtplugException } from "../core/Exceptions";

export class ButtplugMessageSorter {
  protected _counter: number = 1;
  protected _waitingMsgs: Map<number, [(val: Messages.ButtplugMessage) => void, (err: Error) => void]> = new Map();

  public PrepareOutgoingMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    aMsg.Id = this._counter;
    let res;
    let rej;
    const msgPromise = new Promise<Messages.ButtplugMessage>((resolve, reject) => { res = resolve; rej = reject; });
    this._waitingMsgs.set(this._counter, [res, rej]);
    // Always increment last, otherwise we might lose sync
    this._counter += 1;
    return msgPromise;
  }

  public ParseIncomingMessages(aMsgs: Messages.ButtplugMessage[]): Messages.ButtplugMessage[] {
    const noMatch: Messages.ButtplugMessage[] = [];
    for (const x of aMsgs) {
      if (x.Id !== Messages.SYSTEM_MESSAGE_ID && this._waitingMsgs.has(x.Id)) {
        const [res, rej] = this._waitingMsgs.get(x.Id)!;
        // If we've gotten back an error, reject the related promise using a
        // ButtplugException derived type.
        if (x.Type === Messages.Error) {
          rej(ButtplugException.FromError(x as Messages.Error));
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

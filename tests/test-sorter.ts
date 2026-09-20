import { ButtplugMessageSorter } from '../src/utils/ButtplugMessageSorter';
import { ButtplugDeviceError } from '../src/core/Exceptions';
import * as Messages from '../src/core/Messages';

class InspectableSorter extends ButtplugMessageSorter {
  public get pendingCount(): number {
    return this._waitingMsgs.size;
  }
}

describe('Message sorter completed requests', () => {
  it('releases successful requests and does not consume duplicate responses', async () => {
    const sorter = new InspectableSorter(true);
    const request: Messages.ButtplugMessage = { Ping: { Id: 1 } };
    const pending = sorter.PrepareOutgoingMessage(request);
    const response: Messages.ButtplugMessage = { Ok: { Id: Messages.msgId(request) } };
    expect(sorter.pendingCount).toBe(1);
    expect(sorter.ParseIncomingMessages([response])).toEqual([]);
    await expect(pending).resolves.toEqual(response);
    expect(sorter.pendingCount).toBe(0);
    expect(sorter.ParseIncomingMessages([response])).toEqual([response]);
  });

  it('releases rejected requests while preserving the protocol error', async () => {
    const sorter = new InspectableSorter(true);
    const request: Messages.ButtplugMessage = { Ping: { Id: 1 } };
    const pending = sorter.PrepareOutgoingMessage(request);
    const rejected = expect(pending).rejects.toBeInstanceOf(ButtplugDeviceError);
    const response: Messages.ButtplugMessage = {
      Error: { Id: Messages.msgId(request), ErrorCode: Messages.ErrorClass.ERROR_DEVICE, ErrorMessage: 'Device unavailable' },
    };
    expect(sorter.ParseIncomingMessages([response])).toEqual([]);
    await rejected;
    expect(sorter.pendingCount).toBe(0);
    expect(sorter.ParseIncomingMessages([response])).toEqual([response]);
  });
});

import * as Messages from "../../src/core/messages";
import {ButtplugClient} from "../../src/core/client";
import {Server} from 'mock-socket';
import { expect } from "chai";
import 'mocha';

describe("Client Tests", async () => {
  it ("Should deal with request/reply correctly", async () => {
    const mockServer = new Server("ws://localhost:6868");
    mockServer.on('message', (jsonmsg : string) => {
      let msg : Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      let ok = new Messages.Ok(msg.Id).toJSON();
      mockServer.send("[" + ok + "]");
    });
    let bp = new ButtplugClient();
    bp.Connect("ws://localhost:6868");
    expect(await bp.StartScanning()).to.deep.equal(new Messages.Ok(1));
    expect(await bp.StopScanning()).to.deep.equal(new Messages.Ok(2));
  });
});

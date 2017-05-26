import * as Messages from "../../src/core/messages";
import {ButtplugClient} from "../../src/core/client";
import {Server} from 'mock-socket';
import { expect } from "chai";
import 'mocha';

describe("Client Tests", async () => {
  var mockServer;
  beforeEach (function () {
    mockServer = new Server("ws://localhost:6868");
  });
  afterEach(function (done) {
    mockServer.stop(done);
  });

  it ("Should deal with request/reply correctly", async () => {
    mockServer.on('message', (jsonmsg : string) => {
      let msg : Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      let ok : string = new Messages.Ok(msg.Id).toJSON();
      mockServer.send("[" + ok + "]");
    });
    let bp = new ButtplugClient();
    bp.Connect("ws://localhost:6868");
    await bp.StartScanning();
    await bp.StopScanning();
  });
  it ("Should emit a log message on requestlog (testing basic event emitters)", async () => {
    mockServer.on('message', (jsonmsg : string) => {
      let msg : Messages.ButtplugMessage = Messages.FromJSON(jsonmsg)[0] as Messages.ButtplugMessage;
      let ok : string = new Messages.Ok(msg.Id).toJSON();
      mockServer.send("[" + ok + "]");
      setTimeout(() => {
        mockServer.send("[" + (new Messages.Log("Trace", "Test", 0)).toJSON() + "]");
      }, 0);
    });
    let bp = new ButtplugClient();
    let res;
    let p = new Promise((resolve) => { res = resolve; }).then(() => { mockServer.stop(); });
    bp.Connect("ws://localhost:6868");
    bp.on('log', (x) => {
      expect(x).to.deep.equal(new Messages.Log("Trace", "Test", 0));
      res();
    });
    await bp.RequestLog('Trace');
    return p;
  });
});

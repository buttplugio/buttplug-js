import { ButtplugClient, CheckMessage } from "../src/index";
import * as Messages from "../src/core/Messages";

export class BPTestClient extends ButtplugClient {
  constructor(ClientName: string) {
    super(ClientName);
  }
  public get PingTimer() {
    return this._pingTimer;
  }
  public async SendCheckedMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    this.CheckConnector();
    // This will throw if our message is invalid
    CheckMessage(aMsg);
    return await this.SendUncheckedMessage(aMsg);
  }

  public async SendUncheckedMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage>  {
    let r;
    aMsg.Id = this._counter;
    const msgPromise = new Promise<Messages.ButtplugMessage>((resolve) => { r = resolve; });
    this._waitingMsgs.set(this._counter, r);
    this._counter += 1;
    this._connector!.Send(aMsg);
    return await msgPromise;
  }
}

export function SetupTestSuite() {
  process.on("unhandledRejection", (error) => {
    throw new Error("Unhandled Promise rejection!");
  });
}

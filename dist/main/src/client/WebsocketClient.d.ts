import { ButtplugClient } from "./Client";
export declare class ButtplugWebsocketClient extends ButtplugClient {
    private _ws;
    constructor(aClientName: string);
    readonly Connected: boolean;
    Connect: (aUrl: string) => Promise<void>;
    Disconnect: () => void;
    protected Send: (aMsg: string) => void;
}

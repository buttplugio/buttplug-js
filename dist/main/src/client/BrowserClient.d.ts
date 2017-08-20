import { ButtplugClient } from "./Client";
import { ButtplugMessage } from "../core/Messages";
export declare class ButtplugBrowserClient extends ButtplugClient {
    private _connected;
    private _server;
    constructor(aClientName: string);
    readonly Connected: boolean;
    Connect: (aUrl: string) => Promise<void>;
    Disconnect: () => void;
    protected Send: (aMsg: ButtplugMessage) => Promise<void>;
    private OnMessageReceived;
}

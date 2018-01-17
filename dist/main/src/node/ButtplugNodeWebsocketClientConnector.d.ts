/// <reference types="node" />
import { EventEmitter } from "events";
import { IButtplugConnector } from "..";
/**
 * Connector class for using the node ws library as a websocket client to a
 * buttplug server. Users should build an instance of this class and pass it to
 * the ButtplugClient.Connect() function.
 */
export declare class ButtplugNodeWebsocketClientConnector extends EventEmitter implements IButtplugConnector {
    private wsClient;
    private url;
    private rejectUnauthorized;
    /***
     * @param url URL of buttplug server to connect to
     * @param rejectUnauthorized If true, reject unauthorized certificates that fail verification
     */
    constructor(url: string, rejectUnauthorized: boolean);
    /***
     * Called by ButtplugClient to establish websocket connection.
     */
    Connect(): Promise<void>;
    /***
     * Called by ButtplugClient to disconnect websocket connection.
     */
    Disconnect(): void;
    /***
     * Called by ButtplugClient to send a message over the websocket.
     */
    Send(msg: any): void;
    /***
     * Called by ButtplugClient to verify connection status.
     */
    IsConnected(): boolean;
}

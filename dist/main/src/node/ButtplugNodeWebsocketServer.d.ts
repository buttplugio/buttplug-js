import { ButtplugServer } from "..";
/**
 * Derives from the base ButtplugServer class, adds capabilities to the server
 * for listening on and communicating with websockets in a native node
 * application.
 */
export declare class ButtplugNodeWebsocketServer extends ButtplugServer {
    private wsServer;
    constructor();
    /**
     * Starts an insecure (non-ssl) instance of the server. This server will not
     * be accessible from clients/applications running on https instances.
     *
     * @param port Network port to listen on (defaults to 12345)
     * @param host Host address to listen on (defaults to localhost)
     */
    StartInsecureServer(port?: number, host?: string): void;
    /**
     * Starts a secure instance of the server. Requires an SSL certificate to
     * already be generated.
     *
     * @param certFilePath Path to certificate file
     * @param keyFilePath Path to certificate private key file
     * @param port Network port to listen on (defaults to 12345)
     * @param host Host address to listen on (defaults to localhost)
     */
    StartSecureServer(certFilePath: string, keyFilePath: string, port?: number, host?: string): void;
    /**
     * Shuts down the server, closing all connections.
     */
    StopServer(): Promise<{}>;
    /**
     * Used to set up server after Websocket connection created.
     */
    private InitServer();
}

import { ButtplugMessage, IButtplugClientConnector } from "buttplug";

export class ButtplugWasmClientConnector implements IButtplugClientConnector {
  readonly Connected: boolean = false;

  private constructor() {
    
  }

  public static createConnector = async (): Promise<ButtplugWasmClientConnector> => {
    let index = await import("./wasm/buttplug.js");
    index.buttplug_activate_env_logger("debug");
    let connector = new ButtplugWasmClientConnector();
    let serverPtr;
    connector.Connect = index.buttplug_create_embedded_wasm_connector(() => {}, serverPtr);
    return connector;
  }

  public Initialize = async (): Promise<void> => {};

  public Connect = async (): Promise<void> => {};
  public Disconnect = async (): Promise<void> => {};
  public Send = (msg: ButtplugMessage): Promise<ButtplugMessage> => { return undefined;};
}
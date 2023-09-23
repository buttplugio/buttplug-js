import { ButtplugMessage, IButtplugClientConnector, fromJSON } from 'buttplug';
import { EventEmitter } from 'eventemitter3';

export class ButtplugWasmClientConnector extends EventEmitter implements IButtplugClientConnector {
  private static _loggingActivated = false;
  private static wasmInstance: any;
  private _connected: boolean = false;
  private client: any;
  private serverPtr: any;

  constructor() {
    super();
  }
  
  public get Connected(): boolean { return this._connected }

  private static maybeLoadWasm = async() => {
    if (ButtplugWasmClientConnector.wasmInstance == undefined) {
      ButtplugWasmClientConnector.wasmInstance = await import('@/../rust/pkg/buttplug_wasm.js');
    }    
  }
  
  public static activateLogging = async (logLevel: string = "debug") => {
    await ButtplugWasmClientConnector.maybeLoadWasm();
    if (this._loggingActivated) {
      console.log("Logging already activated, ignoring.");
      return;
    }
    console.log("Turning on logging.");
    ButtplugWasmClientConnector.wasmInstance.buttplug_activate_env_logger(logLevel);
  }

  public initialize = async (): Promise<void> => {};

  public connect = async (): Promise<void> => {
    await ButtplugWasmClientConnector.maybeLoadWasm();
    //ButtplugWasmClientConnector.wasmInstance.buttplug_activate_env_logger('debug');
    console.log(ButtplugWasmClientConnector.wasmInstance.buttplug_create_embedded_wasm_server);    
    this.client = ButtplugWasmClientConnector.wasmInstance.buttplug_create_embedded_wasm_server((msgs) => {
      this.emitMessage(msgs);
    }, this.serverPtr);
    this._connected = true;
  };

  public disconnect = async (): Promise<void> => {};

  public send = (msg: ButtplugMessage): void => {
    console.log(msg);
    ButtplugWasmClientConnector.wasmInstance.buttplug_client_send_json_message(this.client, new TextEncoder().encode('[' + msg.toJSON() + ']'), (output) => {
      this.emitMessage(output);
    });
  };

  private emitMessage = (msg: Uint8Array) => {
    let str = new TextDecoder().decode(output);
    // This needs to use buttplug-js's fromJSON, otherwise we won't resolve the message name correctly.
    this.emit('message', fromJSON(str));
  }
}
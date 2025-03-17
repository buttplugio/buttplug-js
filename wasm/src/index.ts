import { ButtplugMessage, IButtplugClientConnector, fromJSON } from 'buttplug';
import { EventEmitter } from 'eventemitter3';

// Define WASM module type based on your exports
interface ButtplugWasmModule {
  buttplug_create_embedded_wasm_server: (callback: (msgs: Uint8Array) => void) => number;
  buttplug_free_embedded_wasm_server: (ptr: number) => void;
  buttplug_client_send_json_message: (
    serverPtr: number,
    buf: Uint8Array,
    callback: (output: Uint8Array) => void
  ) => void;
  buttplug_activate_env_logger: (level: string) => void;
}

export class ButtplugWasmClientConnector extends EventEmitter implements IButtplugClientConnector {
  private static _loggingActivated = false;
  private static wasmInstance: ButtplugWasmModule | undefined;
  private _connected: boolean = false;
  private client: number | null = null; // Server pointer from WASM

  constructor() {
    super();
  }

  public get Connected(): boolean {
    return this._connected;
  }

  private static maybeLoadWasm = async () => {
    if (!ButtplugWasmClientConnector.wasmInstance) {
      ButtplugWasmClientConnector.wasmInstance = await import('../rust/pkg/buttplug_wasm.js');
    }
  };

  public static activateLogging = async (logLevel: string = 'debug') => {
    await ButtplugWasmClientConnector.maybeLoadWasm();
    if (this._loggingActivated) {
      console.log('Logging already activated, ignoring.');
      return;
    }
    console.log('Turning on logging.');
    ButtplugWasmClientConnector.wasmInstance!.buttplug_activate_env_logger(logLevel);
    this._loggingActivated = true;
  };

  public initialize = async (): Promise<void> => {};

  public connect = async (): Promise<void> => {
    await ButtplugWasmClientConnector.maybeLoadWasm();
    this.client = ButtplugWasmClientConnector.wasmInstance!.buttplug_create_embedded_wasm_server(
      (msgs: Uint8Array) => {
        this.emitMessage(msgs);
      }
    );
    this._connected = true;
  };

  public disconnect = async (): Promise<void> => {
    if (this.client !== null) {
      ButtplugWasmClientConnector.wasmInstance!.buttplug_free_embedded_wasm_server(this.client);
      this.client = null;
    }
    this._connected = false;
  };

  public send = (msg: ButtplugMessage): void => {
    if (!this.client) {
      throw new Error('Not connected to server');
    }
    ButtplugWasmClientConnector.wasmInstance!.buttplug_client_send_json_message(
      this.client,
      new TextEncoder().encode('[' + msg.toJSON() + ']'),
      (output: Uint8Array) => {
        this.emitMessage(output);
      }
    );
  };

  private emitMessage = (msg: Uint8Array) => {
    const str = new TextDecoder().decode(msg);
    this.emit('message', fromJSON(str));
  };
}

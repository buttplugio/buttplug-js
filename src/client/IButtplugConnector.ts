import { ButtplugMessage } from "../core/Messages";
import { EventEmitter } from "events";

export interface IButtplugConnector extends EventEmitter {
  Connect: (aUrl: string) => Promise<void>;
  Disconnect: () => void;
  Send: (aMsg: ButtplugMessage) => void;
  IsConnected(): boolean;
}

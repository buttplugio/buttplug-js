import { ButtplugException } from "../core/Exceptions";
import * as Messages from "../core/Messages";

export class ButtplugClientConnectorException extends ButtplugException {
  public constructor(aMessage: string) {
    super(aMessage, Messages.ErrorClass.ERROR_UNKNOWN);
  }
}

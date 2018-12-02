import * as Messages from "./Messages";
import { ButtplugLogger } from "./Logging";

export class ButtplugException extends Error {

  public get ErrorClass(): Messages.ErrorClass {
    return this.errorClass;
  }

  public get InnerException(): Error | undefined {
    return this.innerError;
  }

  public get Id(): number | undefined {
    return this.messageId;
  }

  public static LogAndError<T extends ButtplugException>(aConstructor: new(aStr: string, aNum: number) => T,
                                                         aLogger: ButtplugLogger,
                                                         aMessage: string,
                                                         aId: number = Messages.SYSTEM_MESSAGE_ID): T {
    aLogger.Error(aMessage);
    return new aConstructor(aMessage, aId);
  }

  public static FromError(aError: Messages.Error) {
    switch (aError.ErrorCode) {
      case Messages.ErrorClass.ERROR_DEVICE:
        return new ButtplugDeviceException(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_INIT:
        return new ButtplugInitException(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_UNKNOWN:
        return new ButtplugUnknownException(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_PING:
        return new ButtplugPingException(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_MSG:
        return new ButtplugMessageException(aError.ErrorMessage, aError.Id);
      default:
        throw new Error(`Message type ${aError.ErrorCode} not handled`);
    }
  }
  public errorClass: Messages.ErrorClass = Messages.ErrorClass.ERROR_UNKNOWN;
  public innerError: Error | undefined;
  public messageId: number | undefined;

  protected constructor(aMessage: string,
                        aErrorClass: Messages.ErrorClass,
                        aId: number = Messages.SYSTEM_MESSAGE_ID,
                        aInner?: Error) {
    super(aMessage);
    this.errorClass = aErrorClass;
    this.innerError = aInner;
    this.messageId = aId;
  }
}

export class ButtplugInitException extends ButtplugException {
  public constructor(aMessage: string, aId: number = Messages.SYSTEM_MESSAGE_ID) {
    super(aMessage, Messages.ErrorClass.ERROR_INIT, aId);
  }
}

export class ButtplugDeviceException extends ButtplugException {
  public constructor(aMessage: string, aId: number = Messages.SYSTEM_MESSAGE_ID) {
    super(aMessage, Messages.ErrorClass.ERROR_DEVICE, aId);
  }
}

export class ButtplugMessageException extends ButtplugException {
  public constructor(aMessage: string, aId: number = Messages.SYSTEM_MESSAGE_ID) {
    super(aMessage, Messages.ErrorClass.ERROR_MSG, aId);
  }
}

export class ButtplugPingException extends ButtplugException {
  public constructor(aMessage: string, aId: number = Messages.SYSTEM_MESSAGE_ID) {
    super(aMessage, Messages.ErrorClass.ERROR_PING, aId);
  }
}

export class ButtplugUnknownException extends ButtplugException {
  public constructor(aMessage: string, aId: number = Messages.SYSTEM_MESSAGE_ID) {
    super(aMessage, Messages.ErrorClass.ERROR_UNKNOWN, aId);
  }
}

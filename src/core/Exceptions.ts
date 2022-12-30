/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import * as Messages from './Messages';
import { ButtplugLogger } from './Logging';

export class ButtplugError extends Error {
  public get ErrorClass(): Messages.ErrorClass {
    return this.errorClass;
  }

  public get InnerError(): Error | undefined {
    return this.innerError;
  }

  public get Id(): number | undefined {
    return this.messageId;
  }

  public get ErrorMessage(): Messages.ButtplugMessage {
    return new Messages.Error(this.message, this.ErrorClass, this.Id);
  }

  public static LogAndError<T extends ButtplugError>(
    constructor: new (str: string, num: number) => T,
    logger: ButtplugLogger,
    message: string,
    id: number = Messages.SYSTEM_MESSAGE_ID
  ): T {
    logger.Error(message);
    return new constructor(message, id);
  }

  public static FromError(error: Messages.Error) {
    switch (error.ErrorCode) {
      case Messages.ErrorClass.ERROR_DEVICE:
        return new ButtplugDeviceError(error.ErrorMessage, error.Id);
      case Messages.ErrorClass.ERROR_INIT:
        return new ButtplugInitError(error.ErrorMessage, error.Id);
      case Messages.ErrorClass.ERROR_UNKNOWN:
        return new ButtplugUnknownError(error.ErrorMessage, error.Id);
      case Messages.ErrorClass.ERROR_PING:
        return new ButtplugPingError(error.ErrorMessage, error.Id);
      case Messages.ErrorClass.ERROR_MSG:
        return new ButtplugMessageError(error.ErrorMessage, error.Id);
      default:
        throw new Error(`Message type ${error.ErrorCode} not handled`);
    }
  }

  public errorClass: Messages.ErrorClass = Messages.ErrorClass.ERROR_UNKNOWN;
  public innerError: Error | undefined;
  public messageId: number | undefined;

  protected constructor(
    message: string,
    errorClass: Messages.ErrorClass,
    id: number = Messages.SYSTEM_MESSAGE_ID,
    inner?: Error
  ) {
    super(message);
    this.errorClass = errorClass;
    this.innerError = inner;
    this.messageId = id;
  }
}

export class ButtplugInitError extends ButtplugError {
  public constructor(message: string, id: number = Messages.SYSTEM_MESSAGE_ID) {
    super(message, Messages.ErrorClass.ERROR_INIT, id);
  }
}

export class ButtplugDeviceError extends ButtplugError {
  public constructor(message: string, id: number = Messages.SYSTEM_MESSAGE_ID) {
    super(message, Messages.ErrorClass.ERROR_DEVICE, id);
  }
}

export class ButtplugMessageError extends ButtplugError {
  public constructor(message: string, id: number = Messages.SYSTEM_MESSAGE_ID) {
    super(message, Messages.ErrorClass.ERROR_MSG, id);
  }
}

export class ButtplugPingError extends ButtplugError {
  public constructor(message: string, id: number = Messages.SYSTEM_MESSAGE_ID) {
    super(message, Messages.ErrorClass.ERROR_PING, id);
  }
}

export class ButtplugUnknownError extends ButtplugError {
  public constructor(message: string, id: number = Messages.SYSTEM_MESSAGE_ID) {
    super(message, Messages.ErrorClass.ERROR_UNKNOWN, id);
  }
}

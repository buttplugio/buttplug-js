import { ButtplugDeviceError, ErrorClass } from "../src";

describe("ButtplugError", () => {
  it("exposes readonly error metadata through getters", () => {
    const error = new ButtplugDeviceError("Device failed", 7);

    expect(error.ErrorClass).toBe(ErrorClass.ERROR_DEVICE);
    expect(error.Id).toBe(7);
    expect(error.InnerError).toBeUndefined();

    const mutableError = error as unknown as {
      errorClass?: ErrorClass;
      messageId?: number;
    };
    mutableError.errorClass = ErrorClass.ERROR_UNKNOWN;
    mutableError.messageId = 99;

    expect(error.ErrorClass).toBe(ErrorClass.ERROR_DEVICE);
    expect(error.Id).toBe(7);
  });
});

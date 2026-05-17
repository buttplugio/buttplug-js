import { ButtplugLogLevel, ButtplugLogger } from "../src/core/Logging";
import { SetupTestSuite } from "./utils";

SetupTestSuite();

describe("Logging Tests", () => {
  class TestLogger extends ButtplugLogger {
    public static ResetLogger() {
      ButtplugLogger.sLogger = new ButtplugLogger();
    }
  }

  let logger = TestLogger.Logger;

  beforeEach(() => {
    TestLogger.ResetLogger();
    logger = TestLogger.Logger;
  });

  it("Should log nothing at start.", async () => {
    let res!: () => void;
    let rej!: () => void;
    const p = new Promise<void>((rs, rj) => { res = rs; rej = () => rj(new Error("unexpected log")); });
    logger.addListener("log", () => {
      rej();
    });
    logger.Debug("test");
    logger.Error("test");
    logger.Warn("test");
    logger.Info("test");
    logger.Trace("test");
    res();
    return p;
  });

  it("Should log everything on trace.", async () => {
    let count = 0;
    logger.MaximumEventLogLevel = ButtplugLogLevel.Trace;

    logger.addListener("log", () => {
      count++;
    });
    logger.Debug("test");
    logger.Error("test");
    logger.Warn("test");
    logger.Info("test");
    logger.Trace("test");

    if (count === 5) {
      return Promise.resolve();
    }
    return Promise.reject("Log event count incorrect!");
  });

  it("Should deal with different log levels for console and events", async () => {
    jest.spyOn(global.console, "log");
    let res!: () => void;
    let rej!: () => void;
    const p = new Promise<void>((rs, rj) => { res = rs; rej = () => rj(new Error("unexpected log")); });
    logger.addListener("log", () => {
      rej();
    });
    logger.MaximumEventLogLevel = ButtplugLogLevel.Debug;
    logger.MaximumConsoleLogLevel = ButtplugLogLevel.Trace;
    logger.Trace("test");
    res();
    return p;
  });
});

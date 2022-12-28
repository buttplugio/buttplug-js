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
    let res;
    let rej;
    const p = new Promise((rs, rj) => { res = rs; rej = rj; });
    logger.addListener("log", (msg) => {
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
    let res;
    let rej;
    let count = 0;
    const p = new Promise((rs, rj) => { res = rs; rej = rj; });
    logger.MaximumEventLogLevel = ButtplugLogLevel.Trace;

    logger.addListener("log", (msg) => {
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
    let res;
    let rej;
    const p = new Promise((rs, rj) => { res = rs; rej = rj; });
    logger.addListener("log", (msg) => {
      rej();
    });
    logger.MaximumEventLogLevel = ButtplugLogLevel.Debug;
    logger.MaximumConsoleLogLevel = ButtplugLogLevel.Trace;
    logger.Trace("test");
    expect(console.log).toBeCalled();
    res();
    return p;
  });
});

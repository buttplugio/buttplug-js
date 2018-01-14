import { LogLevel, ButtplugLogger } from "../src/core/Logging";

class TestLogger extends ButtplugLogger {
  public static ResetLogger() {
    ButtplugLogger.sLogger = new ButtplugLogger();
  }
}

describe("Logging Tests", async () => {
  let logger = TestLogger.Logger;

  beforeEach(() => {
    TestLogger.ResetLogger();
    logger = TestLogger.Logger;
  });

  it("Should log nothing at start.", () => {
    let res;
    let rej;
    const p = new Promise((rs, rj) => { res = rs; rej = rj; });
    logger.addListener("log", (msg) => {
      rej();
    });
    logger.Debug("test");
    logger.Fatal("test");
    logger.Error("test");
    logger.Warn("test");
    logger.Info("test");
    logger.Trace("test");
    res();
    return p;
  });

  it("Should log everything on trace.", () => {
    let res;
    let rej;
    let count = 0;
    const p = new Promise((rs, rj) => { res = rs; rej = rj; });
    logger.MaximumLogLevel = LogLevel.Trace;

    logger.addListener("log", (msg) => {
      count++;
    });
    logger.Debug("test");
    logger.Fatal("test");
    logger.Error("test");
    logger.Warn("test");
    logger.Info("test");
    logger.Trace("test");

    if (count === 6) {
      return Promise.resolve();
    }
    return Promise.reject("Log event count incorrect!");
  });

  it("Should deal with different log levels for console and events", (() => {
    logger.ConsoleLogging = true;
    jest.spyOn(global.console, "log");
    let res;
    let rej;
    const p = new Promise((rs, rj) => { res = rs; rej = rj; });
    logger.addListener("log", (msg) => {
      rej();
    });
    logger.MaximumLogLevel = LogLevel.Debug;
    logger.MaximumConsoleLogLevel = LogLevel.Trace;
    logger.Trace("test");
    expect(console.log).toBeCalled();
    res();
    return p;
  }));
});

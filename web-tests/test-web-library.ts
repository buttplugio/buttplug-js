import * as puppeteer from "puppeteer";
import * as fs from "fs";
import * as Buttplug from "buttplug";

describe("Web library tests", async () => {

  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    await page.goto(`file:///${__dirname}/web-test.html`);
    page.waitForSelector(".title");
    const html = await page.$eval(".title", e => e.innerHTML);
    expect(html).toBe("I'm a test page!");
  }, 10000);

  afterEach(() => {
    browser.close();
  }, 10000);

  it("should run basic smoke test", async () => {
    await page.evaluate(() => {
      const connector = new Buttplug.ButtplugEmbeddedClientConnector();
      const client = new Buttplug.ButtplugClient("Test");
      return client.Connect(connector);
    });
  }, 10000);
  it("should fail on incorrect connector address", async () => {
    await expect(page.evaluate(() => {
      const connector = new Buttplug.ButtplugBrowserWebsocketClientConnector("notanaddress");
      const client = new Buttplug.ButtplugClient("Test");
      return client.Connect(connector);
    })).rejects.toThrowError();
  }, 10000);
});

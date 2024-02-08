import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

//
/*
Without --remote-debugging-port=53249 etc flag, pupeeter will try to launch a 
browser with in the container.

But to test using host browser or visualize the test on host browser. 

we either need to init a chrome which is listening at --remote-debugging-port or
use puppeteer.connect to connect to a existing browser on the host.
ref https://www.jianshu.com/p/8c4713bdc626 for detail

sample code:     // browser = await puppeteer.connect({
    //   browserWSEndpoint:
    //     "ws://host.docker.internal:53249/devtools/browser/e7078bee-a204-4e98-9cc0-b3b63ba8404c",
    // });
*/
describe("HomePage E2E test", () => {
  let browser: Browser;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        // only add these follow up lines if you want to test uisng host browser,
        // see read.me for instructions on how to test on host
        // "--remote-debugging-port=53249",
        // "--remote-debugging-address=0.0.0.0",
      ],
      headless: "new",
    });
  });

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('should display "Welcome to React" text on page', async () => {
    const page = await browser.newPage();

    // Navigate to your application's home page
    // Replace 'http://localhost:3000' with the URL of your application
    await page.goto("http://localhost:3000");

    // Check if "Welcome to React" text is present on the page
    const textContent = await page.evaluate(() => document.body.textContent);

    expect(textContent).toContain("Welcome to React");
  });
});

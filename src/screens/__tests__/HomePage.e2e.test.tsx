import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

// https://www.jianshu.com/p/8c4713bdc626
describe("HomePage E2E test", () => {
  let browser: Browser;

  beforeEach(async () => {
    // browser = await puppeteer.launch({
    //   ignoreHTTPSErrors: true,
    //   args: [
    //     "--no-sandbox",
    //     "--disable-setuid-sandbox",
    //     "--remote-debugging-port=18523",
    //     "--remote-debugging-address=0.0.0.0",
    //   ],
    //   // executablePath: Config.browser.path,
    //   headless: "new",
    // });
    // tmr test 1, run on local browser and see open a remote local browser.
    // do in docker
    // do reverse
    browser = await puppeteer.connect({
      browserWSEndpoint:
        "ws://host.docker.internal:18523/devtools/page/409FCCEA23E319A5DD2BB37BA6E579B9",
    });
  });

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test('should display "Welcome to React" text on page', async () => {
    // Navigate to your application's home page
    // Replace 'http://localhost:3000' with the URL of your application
    const page = await browser.newPage();

    await page.goto("https://lol.com/", { waitUntil: "networkidle0" });
  }, 50000);
});

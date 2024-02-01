import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

// https://www.jianshu.com/p/8c4713bdc626
describe("HomePage E2E test", () => {
  let browser: Browser;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      ignoreHTTPSErrors: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--remote-debugging-port=18523",
        "--remote-debugging-address=0.0.0.0",
      ],
      // executablePath: Config.browser.path,
      headless: "new",
    });

    // browser = await puppeteer.connect({
    //   browserWSEndpoint:
    //     "ws://host.docker.internal:18523/devtools/page/409FCCEA23E319A5DD2BB37BA6E579B9",
    // });
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

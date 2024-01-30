import puppeteer from "puppeteer";
import { Browser } from "puppeteer";

describe("HomePage E2E test", () => {
  let browser: Browser;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
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

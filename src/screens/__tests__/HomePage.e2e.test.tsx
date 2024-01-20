import puppeteer from "puppeteer";

describe("HomePage E2E test", () => {
  test('should display "Welcome to React" text on page', async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Navigate to your application's home page
    // Replace 'http://localhost:3000' with the URL of your application
    await page.goto("http://localhost:3000");

    // Check if "Welcome to React" text is present on the page
    const textContent = await page.evaluate(() => document.body.textContent);
    expect(textContent).toContain("Welcome to React");

    await browser.close();
  });
});

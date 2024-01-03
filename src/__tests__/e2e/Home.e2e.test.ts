import puppeteer, { Browser, Page } from "puppeteer";

describe("HomePage E2E Test", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    // Launch a new browser
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--enable-javascript"],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    // Close the browser
    await browser.close();
  });

  test("Check if homepage has content", async () => {
    // Navigate to the homepage
    await page.goto("http://localhost:3000/"); // Replace with the actual URL of your homepage

    // Find and extract text content
    const textContent = await page.evaluate(() => document.body.textContent);

    // js is still not enabled??
    // Check if the page has any text content
    expect(textContent).toBeTruthy();
  });
});

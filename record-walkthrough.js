const path = require("path");
const { chromium } = require("playwright");

const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const appUrl = `file:///${path.resolve("index.html").replace(/\\/g, "/")}`;
const outputPath = path.resolve("yohanas-kitchenette-app-walkthrough.webm");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function setCaption(page, text) {
  await page.evaluate((message) => {
    let caption = document.querySelector("#walkthroughCaption");
    if (!caption) {
      const style = document.createElement("style");
      style.textContent = `
        #walkthroughCaption {
          position: fixed;
          left: 16px;
          right: 16px;
          bottom: 82px;
          z-index: 9999;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 8px;
          padding: 12px 14px;
          background: rgba(36, 33, 29, 0.92);
          color: #fff;
          box-shadow: 0 18px 48px rgba(64, 43, 24, 0.24);
          font: 800 15px/1.35 Arial, Helvetica, sans-serif;
          letter-spacing: 0;
          transform: translateY(0);
        }
      `;
      document.head.appendChild(style);
      caption = document.createElement("div");
      caption.id = "walkthroughCaption";
      document.body.appendChild(caption);
    }
    caption.textContent = message;
  }, text);
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: edgePath,
  });

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    recordVideo: {
      dir: path.resolve("."),
      size: { width: 390, height: 844 },
    },
  });

  const page = await context.newPage();
  await page.goto(appUrl, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".menu-card");

  await setCaption(page, "Yohana's Kitchenette mobile food app");
  await wait(1700);

  await page.mouse.wheel(0, 520);
  await setCaption(page, "Browse the full menu from the booklet with sample food photos");
  await wait(1800);

  await page.locator("#searchInput").fill("halo");
  await setCaption(page, "Search quickly for favorites like Halo-Halo");
  await wait(1600);

  await page.locator(".add-button").first().click();
  await setCaption(page, "Add items to the cart with one tap");
  await wait(1500);

  await page.locator("#searchInput").fill("");
  await page.locator('[data-category="Rice Meals"]').click();
  await page.mouse.wheel(0, 380);
  await setCaption(page, "Filter by category for faster ordering");
  await wait(1600);

  await page.locator(".add-button").nth(2).click();
  await setCaption(page, "Build the order before checkout");
  await wait(1200);

  await page.locator("#openCart").click();
  await setCaption(page, "Review cart items and adjust quantities");
  await wait(1200);
  await page.locator("[data-inc]").first().click();
  await wait(1000);

  await page.locator("#checkoutButton").click();
  await setCaption(page, "Checkout is GCash only with reference number capture");
  await wait(1000);

  await page.locator('input[name="name"]').fill("Sample Customer");
  await page.locator('input[name="phone"]').fill("0917 000 0000");
  await page.locator('textarea[name="address"]').fill("Pickup at 12:30 PM");
  await page.locator('input[name="gcash"]').fill("GCASH-REF-123456");
  await wait(2200);

  await setCaption(page, "Ready for pickup or delivery orders");
  await wait(1500);

  const video = page.video();
  if (!video) {
    throw new Error("Playwright did not create a video.");
  }
  await page.close();
  await video.saveAs(outputPath);
  await context.close();
  await browser.close();
  console.log(outputPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

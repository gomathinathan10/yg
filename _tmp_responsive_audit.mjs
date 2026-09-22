import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:8080";
const SCREENSHOT_DIR = "C:/Users/lenovo/AppData/Local/Temp/claude/d--yg/584cf53c-9032-421f-ac62-1378ee9e78d3/scratchpad/screenshots";
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "360x800", width: 360, height: 800 },
  { name: "375x812", width: 375, height: 812 },
  { name: "390x844", width: 390, height: 844 },
  { name: "414x896", width: 414, height: 896 },
  { name: "430x932", width: 430, height: 932 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "820x1180", width: 820, height: 1180 },
  { name: "1024x1366", width: 1024, height: 1366 },
  { name: "1280x720", width: 1280, height: 720 },
  { name: "1366x768", width: 1366, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
  { name: "1920x1080", width: 1920, height: 1080 },
];

const PAGES = [
  { name: "home", path: "/" },
  { name: "story", path: "/story" },
  { name: "shop", path: "/shop" },
  { name: "product", path: "/product/gold-asafoetida-powder" },
  { name: "wishlist", path: "/wishlist" },
  { name: "checkout", path: "/checkout" },
  { name: "contact", path: "/contact" },
  { name: "track", path: "/track" },
  { name: "admin", path: "/admin" },
];

async function main() {
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const results = [];

  for (const vp of VIEWPORTS) {
    for (const pg of PAGES) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();
      const consoleErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 200));
      });
      page.on("pageerror", (err) => consoleErrors.push("PAGEERROR: " + err.message.slice(0, 200)));

      let overflow = null;
      let httpStatus = null;
      try {
        const resp = await page.goto(BASE + pg.path, { waitUntil: "networkidle", timeout: 20000 });
        httpStatus = resp ? resp.status() : null;
        await page.waitForTimeout(300);
        overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const scrollW = Math.max(doc.scrollWidth, body.scrollWidth);
          const clientW = doc.clientWidth;
          return { scrollW, clientW, overflowing: scrollW > clientW + 2 };
        });
      } catch (e) {
        consoleErrors.push("NAV_ERROR: " + String(e).slice(0, 200));
      }

      results.push({
        viewport: vp.name,
        page: pg.name,
        httpStatus,
        overflow: overflow ? overflow.overflowing : null,
        scrollW: overflow ? overflow.scrollW : null,
        clientW: overflow ? overflow.clientW : null,
        consoleErrors,
      });

      await context.close();
    }
  }

  await browser.close();

  fs.writeFileSync(
    "C:/Users/lenovo/AppData/Local/Temp/claude/d--yg/584cf53c-9032-421f-ac62-1378ee9e78d3/scratchpad/audit_results.json",
    JSON.stringify(results, null, 2)
  );

  // Print a compact summary
  const problems = results.filter((r) => r.overflow || r.consoleErrors.length > 0 || (r.httpStatus && r.httpStatus >= 400));
  console.log(`Total checks: ${results.length}`);
  console.log(`Problems found: ${problems.length}`);
  for (const p of problems) {
    console.log(`[${p.viewport}] ${p.page}: status=${p.httpStatus} overflow=${p.overflow} (${p.scrollW}>${p.clientW}) errors=${JSON.stringify(p.consoleErrors)}`);
  }
}

main();

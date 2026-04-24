const { chromium } = require('playwright');

const BASE = 'http://127.0.0.1:7777';
const MOBILE = { width: 390, height: 844 }; // iPhone 14
const DESKTOP = { width: 1280, height: 800 };

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  const check = (name, pass, detail = '') => {
    results.push({ name, pass, detail });
    console.log(`${pass ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
  };

  // ── MOBILE TESTS ──────────────────────────────
  const mctx = await browser.newContext({ viewport: MOBILE });
  const mp = await mctx.newPage();
  await mp.goto(BASE, { waitUntil: 'networkidle' });

  // 1. Bottom nav visible
  const bottomNav = await mp.locator('.mobile-bottom-nav').first();
  const bnVisible = await bottomNav.isVisible();
  check('Mobile: bottom nav visible', bnVisible);

  // 2. Desktop sidebar hidden
  const sidebar = await mp.locator('.desktop-sidebar').first();
  const sidebarHidden = !(await sidebar.isVisible());
  check('Mobile: desktop sidebar hidden', sidebarHidden);

  // 3. Mobile header visible
  const mobileHeader = await mp.locator('.mobile-header').first();
  const headerVisible = await mobileHeader.isVisible();
  check('Mobile: sticky header visible', headerVisible);

  // 4. No horizontal scroll
  const bodyWidth = await mp.evaluate(() => document.body.scrollWidth);
  check('Mobile: no horizontal overflow', bodyWidth <= MOBILE.width, `scrollWidth=${bodyWidth}px`);

  // 5. Bottom nav has 5 tabs
  const tabCount = await mp.locator('.mobile-bottom-nav button').count();
  check('Mobile: 5 nav tabs', tabCount === 5, `found ${tabCount}`);

  // 6. Navigate to Course via bottom nav
  await mp.locator('.mobile-bottom-nav button').nth(1).click();
  await mp.waitForTimeout(300);
  const courseH1 = await mp.locator('h1').first().textContent().catch(() => '');
  check('Mobile: Course tab navigation works', courseH1.includes('Course'), `h1="${courseH1}"`);

  // 7. Navigate to Subnet Lab
  await mp.locator('.mobile-bottom-nav button').nth(3).click();
  await mp.waitForTimeout(400);
  const subnetH1 = await mp.locator('h1').first().textContent().catch(() => '');
  check('Mobile: Subnet tab navigation works', subnetH1.includes('Subnet'), `h1="${subnetH1}"`);

  // 8. Subnet inputs don't overflow
  const ipInput = await mp.locator('input').first();
  const ipBox = await ipInput.boundingBox().catch(() => null);
  if (ipBox) {
    check('Mobile: IP input within viewport', ipBox.x + ipBox.width <= MOBILE.width + 1, `right edge at ${Math.round(ipBox.x + ipBox.width)}px`);
  }

  // 9. Navigate to Flashcards
  await mp.locator('.mobile-bottom-nav button').nth(2).click();
  await mp.waitForTimeout(300);
  const flashTitle = await mp.locator('text=Flashcard Drills').first().isVisible().catch(() => false);
  check('Mobile: Flashcards tab navigation works', flashTitle);

  // 10. Navigate to Medals
  await mp.locator('.mobile-bottom-nav button').nth(4).click();
  await mp.waitForTimeout(300);
  const medalsH1 = await mp.locator('h1').first().textContent().catch(() => '');
  check('Mobile: Medals tab navigation works', medalsH1.includes('Medal'), `h1="${medalsH1}"`);

  // 11. Medals no horizontal overflow
  const medalsWidth = await mp.evaluate(() => document.body.scrollWidth);
  check('Mobile: Medals page no overflow', medalsWidth <= MOBILE.width, `scrollWidth=${medalsWidth}px`);

  // Screenshots
  await mp.locator('.mobile-bottom-nav button').nth(0).click();
  await mp.waitForTimeout(300);
  await mp.screenshot({ path: '/tmp/mobile-dashboard.png', fullPage: false });
  console.log('\n📸 Screenshot saved: /tmp/mobile-dashboard.png');

  await mctx.close();

  // ── DESKTOP TESTS ─────────────────────────────
  const dctx = await browser.newContext({ viewport: DESKTOP });
  const dp = await dctx.newPage();
  await dp.goto(BASE, { waitUntil: 'networkidle' });

  const dSidebar = await dp.locator('.desktop-sidebar').first();
  check('Desktop: sidebar visible', await dSidebar.isVisible());

  const dBottomNav = await dp.locator('.mobile-bottom-nav').first();
  check('Desktop: bottom nav hidden', !(await dBottomNav.isVisible()));

  const dHeader = await dp.locator('.mobile-header').first();
  check('Desktop: mobile header hidden', !(await dHeader.isVisible()));

  await dp.screenshot({ path: '/tmp/desktop-dashboard.png', fullPage: false });
  console.log('📸 Screenshot saved: /tmp/desktop-dashboard.png');

  await dctx.close();
  await browser.close();

  // Summary
  const passed = results.filter(r => r.pass).length;
  const failed = results.filter(r => !r.pass).length;
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

run().catch(e => { console.error(e); process.exit(1); });

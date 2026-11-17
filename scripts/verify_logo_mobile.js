import puppeteer from 'puppeteer';
import path from 'path';

async function verifyLogoAndMobile() {
  const artifactDir = 'C:/Users/arulb/.gemini/antigravity/brain/fa9c2da0-62a8-4482-8e3c-f82947a80822';
  
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // ==========================================
  // 1. DESKTOP TEST (1440 x 900)
  // ==========================================
  console.log('1. Testing Desktop Viewport (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait a bit for animations
  await new Promise(r => setTimeout(r, 800));

  // Desktop Header Top (Transparent / Gold Logo)
  console.log('Capturing Desktop Top Header...');
  await page.screenshot({
    path: path.join(artifactDir, 'desktop_header_top.png'),
    clip: { x: 0, y: 0, width: 1440, height: 160 }
  });

  // Desktop Hero Viewport
  console.log('Capturing Desktop Hero Viewport...');
  await page.screenshot({
    path: path.join(artifactDir, 'website_hero_preview.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 }
  });

  // Scroll down to test sticky ivory header with burgundy logo
  console.log('Scrolling down to test sticky ivory header...');
  await page.evaluate(() => window.scrollTo(0, 300));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_header_scrolled.png'),
    clip: { x: 0, y: 0, width: 1440, height: 140 }
  });

  // Scroll to footer to check footer logo
  console.log('Scrolling to footer...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(artifactDir, 'desktop_footer_logo.png'),
    clip: { x: 0, y: 700, width: 1440, height: 200 }
  });

  // ==========================================
  // 2. MOBILE TEST (390 x 844 - iPhone / Modern Mobile)
  // ==========================================
  console.log('2. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800));

  // Mobile Top Header & Hero
  console.log('Capturing Mobile Top Header...');
  await page.screenshot({
    path: path.join(artifactDir, 'mobile_hero_preview.png'),
    clip: { x: 0, y: 0, width: 390, height: 650 }
  });

  await page.screenshot({
    path: path.join(artifactDir, 'mobile_header_top.png'),
    clip: { x: 0, y: 0, width: 390, height: 120 }
  });

  // Mobile Scrolled (Ivory Header with Burgundy Logo)
  console.log('Testing Mobile Scrolled Header...');
  await page.evaluate(() => window.scrollTo(0, 250));
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(artifactDir, 'mobile_header_scrolled.png'),
    clip: { x: 0, y: 0, width: 390, height: 120 }
  });

  // Mobile Menu Drawer
  console.log('Testing Mobile Menu Drawer...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const menuBtn = btns.find(b => b.getAttribute('aria-label') === 'Open Navigation Menu');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(artifactDir, 'mobile_drawer_preview.png')
  });

  await browser.close();
  console.log('All desktop and mobile verification screenshots captured successfully!');
}

verifyLogoAndMobile().catch(err => {
  console.error('Error in verification:', err);
  process.exit(1);
});

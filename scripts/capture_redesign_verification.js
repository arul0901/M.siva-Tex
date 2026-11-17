import puppeteer from 'puppeteer';
import path from 'path';

async function captureRedesign() {
  const artifactDir = 'C:/Users/arulb/.gemini/antigravity/brain/fa9c2da0-62a8-4482-8e3c-f82947a80822';
  
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // ==========================================
  // 1. DESKTOP CAPTURES (1440 x 900)
  // ==========================================
  console.log('1. Testing Desktop Viewport (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  // Full page desktop
  console.log('Capturing full page desktop...');
  await page.screenshot({
    path: path.join(artifactDir, 'website_full_preview.png'),
    fullPage: true
  });

  // Temporarily make header relative during section captures so sticky header does not block content
  await page.evaluate(() => {
    const hdr = document.querySelector('header');
    if (hdr) hdr.style.position = 'static';
  });

  // Section 2: Shop By Occasion
  console.log('Capturing Section 1: Shop By Occasion...');
  const sec1 = await page.$('section:nth-of-type(2)');
  if (sec1) {
    await sec1.screenshot({ path: path.join(artifactDir, 'redesign_sec1_occasion.png') });
  }

  // Section 3: Two-Panel Editorial
  console.log('Capturing Section 2: Two-Panel Editorial...');
  const sec2 = await page.$('section:nth-of-type(3)');
  if (sec2) {
    await sec2.screenshot({ path: path.join(artifactDir, 'redesign_sec2_editorial_twopanel.png') });
  }

  // Section 4: Saree Craft & Zari Banner
  console.log('Capturing Section 3: Saree Craft Banner...');
  const sec3 = await page.$('section:nth-of-type(4)');
  if (sec3) {
    await sec3.screenshot({ path: path.join(artifactDir, 'redesign_sec3_accessories.png') });
  }

  // Section 5: Styling Suggestions
  console.log('Capturing Section 4: Styling Suggestions...');
  const sec4 = await page.$('section:nth-of-type(5)');
  if (sec4) {
    await sec4.screenshot({ path: path.join(artifactDir, 'redesign_sec4_styling.png') });
  }

  // Section 6: Curated Collections & Bestsellers
  console.log('Capturing Section 5: Curated & Bestsellers...');
  const sec5 = await page.$('section:nth-of-type(6)');
  if (sec5) {
    await sec5.screenshot({ path: path.join(artifactDir, 'redesign_sec5_curated_bestsellers.png') });
  }

  // Section 7: Testimonials
  console.log('Capturing Section 6: Testimonials...');
  const sec6 = await page.$('section:nth-of-type(7)');
  if (sec6) {
    await sec6.screenshot({ path: path.join(artifactDir, 'redesign_sec6_testimonials.png') });
  }

  // ==========================================
  // 2. MOBILE CAPTURES (390 x 844)
  // ==========================================
  console.log('2. Testing Mobile Viewport (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1200));

  console.log('Capturing mobile full page...');
  await page.screenshot({
    path: path.join(artifactDir, 'redesign_mobile_full.png'),
    fullPage: true
  });

  // Mobile view of Occasion section
  console.log('Capturing mobile occasion section...');
  const mobileSec1 = await page.$('section:nth-of-type(2)');
  if (mobileSec1) {
    await mobileSec1.screenshot({ path: path.join(artifactDir, 'redesign_mobile_occasion.png') });
  }

  // Mobile view of Curated Bestsellers section
  console.log('Capturing mobile curated bestsellers section...');
  const mobileSec5 = await page.$('section:nth-of-type(6)');
  if (mobileSec5) {
    await mobileSec5.screenshot({ path: path.join(artifactDir, 'redesign_mobile_bestsellers.png') });
  }

  await browser.close();
  console.log('All redesign verification screenshots captured successfully!');
}

captureRedesign().catch(err => {
  console.error('Error during redesign verification:', err);
  process.exit(1);
});

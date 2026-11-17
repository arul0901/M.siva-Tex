import puppeteer from 'puppeteer';
import path from 'path';

async function capture() {
  const artifactDir = 'C:/Users/arulb/.gemini/antigravity/brain/fa9c2da0-62a8-4482-8e3c-f82947a80822';
  
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  console.log('Navigating to http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });

  // 1. Full page screenshot
  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: path.join(artifactDir, 'website_full_preview.png'),
    fullPage: true
  });

  // 2. Hero viewport
  console.log('Taking hero screenshot...');
  await page.screenshot({
    path: path.join(artifactDir, 'website_hero_preview.png'),
    clip: { x: 0, y: 0, width: 1400, height: 850 }
  });

  // 3. Test interacting with Add to Cart to open Cart Drawer
  console.log('Testing Add to Cart...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const addBtn = btns.find(b => b.textContent && b.textContent.includes('Add to Cart'));
    if (addBtn) addBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(artifactDir, 'cart_drawer_preview.png')
  });

  await browser.close();
  console.log('Verification screenshots captured successfully!');
}

capture().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});

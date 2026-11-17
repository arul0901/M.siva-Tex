import puppeteer from 'puppeteer';
import path from 'path';

async function captureHero() {
  const artifactDir = 'C:/Users/arulb/.gemini/antigravity/brain/fa9c2da0-62a8-4482-8e3c-f82947a80822';
  
  console.log('Launching browser for Hero Banner capture...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. DESKTOP CAPTURES (1440 x 900)
  console.log('1. Capturing Desktop Hero (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Capture Slide 1
  const heroSection = await page.$('.hero-cinematic-banner');
  if (heroSection) {
    await heroSection.screenshot({
      path: path.join(artifactDir, 'cinematic_hero_desktop_slide1.png')
    });
    console.log('Captured cinematic_hero_desktop_slide1.png');
  }

  // Click Next Slide to capture Slide 2 (The Bridal Edit)
  const nextBtn = await page.$('button[aria-label="Next slide"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 1500));
    if (heroSection) {
      await heroSection.screenshot({
        path: path.join(artifactDir, 'cinematic_hero_desktop_slide2.png')
      });
      console.log('Captured cinematic_hero_desktop_slide2.png');
    }
  }

  // Click 3rd slide indicator (Our Collections)
  const indicators = await page.$$('.hero-indicator-btn');
  if (indicators.length >= 3) {
    await indicators[2].click();
    await new Promise(r => setTimeout(r, 1500));
    if (heroSection) {
      await heroSection.screenshot({
        path: path.join(artifactDir, 'cinematic_hero_desktop_slide3.png')
      });
      console.log('Captured cinematic_hero_desktop_slide3.png');
    }
  }

  // Click 5th slide indicator (M. Siva-Tex Imperial Maroon)
  if (indicators.length >= 5) {
    await indicators[4].click();
    await new Promise(r => setTimeout(r, 1500));
    if (heroSection) {
      await heroSection.screenshot({
        path: path.join(artifactDir, 'cinematic_hero_desktop_slide5.png')
      });
      console.log('Captured cinematic_hero_desktop_slide5.png');
    }
  }

  // 2. MOBILE VIEWPORT (390 x 844)
  console.log('2. Capturing Mobile Hero (390x844)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  const mobileHero = await page.$('.hero-cinematic-banner');
  if (mobileHero) {
    await mobileHero.screenshot({
      path: path.join(artifactDir, 'cinematic_hero_mobile_slide1.png')
    });
    console.log('Captured cinematic_hero_mobile_slide1.png');
  }

  await browser.close();
  console.log('All hero banner verification captures complete!');
}

captureHero().catch(err => {
  console.error('Error during hero capture:', err);
  process.exit(1);
});

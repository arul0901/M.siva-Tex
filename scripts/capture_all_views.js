import puppeteer from 'puppeteer';
import path from 'path';

async function runFullVerification() {
  const artifactDir = 'C:/Users/arulb/.gemini/antigravity/brain/fa9c2da0-62a8-4482-8e3c-f82947a80822';
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  // 1. Home
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  // 2. Click on 'Shop' in navigation to view Product Listing Page
  console.log('Navigating to Shop view...');
  await page.evaluate(() => {
    const shopBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.trim() === 'Shop');
    if (shopBtn) shopBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'shop_view_preview.png'), fullPage: true });

  // 3. Click on the first product card to view Product Detail Page
  console.log('Opening Product Detail Page...');
  await page.evaluate(() => {
    const card = document.querySelector('h4');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'product_detail_preview.png'), fullPage: true });

  // 4. Click 'Buy Now' to go to Checkout
  console.log('Proceeding to Checkout...');
  await page.evaluate(() => {
    const buyBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Buy Now'));
    if (buyBtn) buyBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'checkout_step1_preview.png'), fullPage: true });

  // Complete checkout to step 4
  console.log('Completing checkout flow...');
  // Click continue to shipping
  await page.evaluate(() => {
    const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Continue to Shipping'));
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  
  // Click continue to payment
  await page.evaluate(() => {
    const nextBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Continue to Payment'));
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Authorize & Place Sacred Order
  await page.evaluate(() => {
    const placeBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && b.textContent.includes('Authorize & Place Sacred Order'));
    if (placeBtn) placeBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'order_confirmed_preview.png'), fullPage: true });

  await browser.close();
  console.log('All comprehensive views captured successfully!');
}

runFullVerification().catch(e => {
  console.error(e);
  process.exit(1);
});


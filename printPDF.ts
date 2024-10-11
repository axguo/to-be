const puppeteer = require('puppeteer');
const QRCode = require('qrcode');

(async () => {
  const browser = await puppeteer.launch();
  for (let i = 1; i < 50; i++) {
    const page = await browser.newPage();
    const url = `http://localhost:8080/?${i}`;
    const realurl = `https://www.aliciaguo.com/to-be/?${i}`;
    await page.goto(url, {waitUntil: 'networkidle2'});
    
    // Generate QR Code for the URL
    await QRCode.toFile(`qr_codes/qr_${i}.png`, realurl);

    // Customize PDF options if necessary
    await page.pdf({
      path: `prints/iteration_${i}.pdf`, 
      format: 'A4',
      scale: 0.8, // Set scale to 80%
      margin: {
        bottom: '2in',
        left: '1in'
      },
      pageRanges: '1'
    });
    await page.close();
    console.log(`Printed iteration ${i + 1} and generated QR code.`);
  }
  await browser.close();
})();


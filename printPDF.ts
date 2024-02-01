const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  for (let i = 0; i < 50; i++) {
    const page = await browser.newPage();
    await page.goto('http://localhost:8000/', {waitUntil: 'networkidle2'});
    
    // Customize PDF options if necessary
    await page.pdf({
      path: `iteration_${i + 1}.pdf`, 
      format: 'A4',
      scale: 0.8, // Set scale to 80%
      margin: {
        bottom: '1in',
        left: '1in'
      },
      pageRanges: '1'
    });
    await page.close();
    console.log(`Printed iteration ${i + 1}`);
  }
  await browser.close();
})();
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.generatePDF = async (html) => {
  const executablePath = await chromium.executablePath();

  const browser = await puppeteer.launch({
    executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
    ignoreHTTPSErrors: true
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true
  });

  await browser.close();
  return pdfBuffer;
};

const bwipjs = require('bwip-js');

exports.generatePNRBarcode = async (pnr) => {
  try {
    const png = await bwipjs.toBuffer({
      bcid: 'code128',
      text: pnr,
      scale: 3,
      height: 10,
      includetext: false
    });

    return `data:image/png;base64,${png.toString('base64')}`;
  } catch (err) {
    throw new Error('PNR barcode generation failed');
  }
};

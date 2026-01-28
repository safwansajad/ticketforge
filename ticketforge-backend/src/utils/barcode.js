const bwipjs = require('bwip-js');

/**
 * Generate airline-standard PDF417 barcode with BCBP format
 * Format: M/F + SERIAL + LASTNAME/FIRSTNAME + PNR + FROM + TO + FLIGHT + DAY
 */
exports.generatePNRBarcode = async (ticketData) => {
  try {
    // Extract first passenger and first sector for barcode
    const passenger = ticketData.passengers[0];
    const sector = ticketData.sectors[0];
    
    // Determine gender prefix: M for Mr, F for Ms/Mrs/Miss
    const gender = passenger.title?.toUpperCase() === 'MR' ? 'M' : 'F';
    
    // Passenger serial number (1 for first passenger)
    const serial = '1';
    
    // Format passenger name (LASTNAME/FIRSTNAME) - max 20 chars each, uppercase
    const lastName = (passenger.lastName || '').toUpperCase().replace(/\s+/g, '').substring(0, 20);
    const firstName = (passenger.firstName || '').toUpperCase().replace(/\s+/g, '').substring(0, 20);
    const passengerName = `${lastName}/${firstName}`;
    
    // PNR (booking reference) - 6 characters
    const pnr = ticketData.pnr.toUpperCase().padEnd(6, ' ').substring(0, 6);
    
    // Airport codes (3 letters each)
    const fromAirport = (sector.from || '').toUpperCase().substring(0, 3).padEnd(3, ' ');
    const toAirport = (sector.to || '').toUpperCase().substring(0, 3).padEnd(3, ' ');
    
    // Flight number (4 digits, padded)
    const flightNum = (sector.flightNumber || '').replace(/\D/g, '').padStart(4, '0').substring(0, 4);
    
    // Calculate Julian date (day of year) from departure date
    const departureDate = new Date(sector.departureTime);
    const startOfYear = new Date(departureDate.getFullYear(), 0, 0);
    const diff = departureDate - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay).toString().padStart(3, '0');
    
    // Build BCBP format string
    const barcodeData = `${gender}${serial}${passengerName} ${pnr} ${fromAirport}${toAirport}${flightNum} ${dayOfYear}`;
    
    // Generate PDF417 barcode
    const png = await bwipjs.toBuffer({
      bcid: 'pdf417',        // PDF417 barcode for airline tickets
      text: barcodeData,
      scale: 2,              // Scale for PDF417
      height: 15,            // Height in modules
      columns: 6,            // Number of data columns (1-30)
      eclevel: 5,            // Error correction level (0-8, higher = more correction)
      includetext: false,    // Don't show text below barcode
      textxalign: 'center'
    });

    return `data:image/png;base64,${png.toString('base64')}`;
  } catch (err) {
    console.error('PDF417 barcode generation error:', err);
    throw new Error('PNR barcode generation failed');
  }
};

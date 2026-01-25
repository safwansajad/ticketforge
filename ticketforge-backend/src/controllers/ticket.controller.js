const Ticket = require('../models/ticket')

// register referenced models for populate
require('../models/agency')
require('../models/airline')

const { generatePDF } = require('../utils/pdf')
const { ticketTemplate } = require('../utils/ticketTemplate')
const { generatePNRBarcode } = require('../utils/barcode')

/**
 * Create Ticket
 */
exports.createTicket = async (req, res) => {
  try {
    console.log('CREATE TICKET BODY:', req.body)

    // Use authenticated agency ID from JWT token
    const agencyId = req.user.agencyId;
    
    if (!agencyId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Agency authentication required' 
      })
    }

    const payload = { 
      ...req.body, 
      agency: agencyId 
    }

    const ticket = await Ticket.create(payload)

    res.status(201).json({
      success: true,
      data: ticket
    })
  } catch (error) {
    console.error('CREATE TICKET ERROR:', error)

    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

/**
 * Get Ticket by PNR
 */
exports.getTicketByPNR = async (req, res) => {
  try {
    const { pnr } = req.params
    const agencyId = req.user.agencyId;

    const ticket = await Ticket.findOne({ pnr, agency: agencyId })
      .populate({
        path: 'agency',
        select: 'name email phone address logoUrl footerNote'
      })
      .populate({
        path: 'airline',
        select: 'name code logoUrl'
      })

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      })
    }

    res.json({
      success: true,
      data: ticket
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

/**
 * Download Ticket PDF
 */
exports.downloadTicketPDF = async (req, res) => {
  try {
    const { pnr } = req.params
    const agencyId = req.user.agencyId;

    const ticket = await Ticket.findOne({ pnr, agency: agencyId })
      .populate('agency')
      .populate('airline')

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      })
    }

    const barcodeImage = await generatePNRBarcode(ticket.pnr)

    const html = ticketTemplate({
      ...ticket.toObject(),
      barcodeImage
    })

    const pdf = await generatePDF(html)

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${pnr}.pdf`
    })

    res.send(pdf)
  } catch (error) {
    console.error('DOWNLOAD PDF ERROR:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

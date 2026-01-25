const Airline = require('../models/airline')

/**
 * Get All Airlines
 */
exports.getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.find().sort({ name: 1 })

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    
    res.json({
      success: true,
      data: airlines
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

/**
 * Get Airline by ID
 */
exports.getAirlineById = async (req, res) => {
  try {
    const { id } = req.params

    const airline = await Airline.findById(id)

    if (!airline) {
      return res.status(404).json({
        success: false,
        message: 'Airline not found'
      })
    }

    res.json({
      success: true,
      data: airline
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

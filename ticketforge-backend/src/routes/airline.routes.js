const express = require('express')
const router = express.Router()

const {
  getAllAirlines,
  getAirlineById
} = require('../controllers/airline.controller')

router.get('/', getAllAirlines)
router.get('/:id', getAirlineById)

module.exports = router

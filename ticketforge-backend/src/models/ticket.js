const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  pnr: { type: String, required: true, index: true },

  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agency',
    required: true
  },

airline: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Airline',
  required: true
},

  sectors: [{
    from: String,
    to: String,
    flightNumber: String,
    departureTime: Date,
    arrivalTime: Date
  }],

  passengers: [{
    title: String,
    firstName: String,
    lastName: String,
    type: { type: String, enum: ['ADT', 'CHD', 'INF'] }
  }],

  fare: {
    base: Number,
    tax: Number,
    otherCharges: Number,
    total: Number,
    currency: { type: String, default: 'INR' }
  },

  baggage: {
    cabin: String,
    checkin: String
  },

  contact: {
    email: String,
    phone: String
  },

  ticketType: {
    type: String,
    enum: ['SERIES_FARE', 'NORMAL'],
    default: 'SERIES_FARE'
  },

  status: {
    type: String,
    enum: ['CONFIRMED', 'PENDING', 'CANCELLED'],
    default: 'CONFIRMED'
  },

  remarks: String,
  issuedAt: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);

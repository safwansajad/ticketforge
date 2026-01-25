const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }, // 6E, AI, UK
  logoUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Airline', airlineSchema);

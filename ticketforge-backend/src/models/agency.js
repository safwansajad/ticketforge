const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const agencySchema = new mongoose.Schema({
  // Business Details
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  
  // Authentication
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  
  // Branding
  logoUrl: String,
  footerNote: String,
  
  // Metadata
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Hash password before saving
agencySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
agencySchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exclude password from JSON responses
agencySchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('Agency', agencySchema);

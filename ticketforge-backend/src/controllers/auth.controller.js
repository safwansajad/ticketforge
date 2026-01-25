const jwt = require('jsonwebtoken');
const Agency = require('../models/agency');

const JWT_SECRET = process.env.JWT_SECRET || 'ticketforge-secret-key-change-in-production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Register Agency
 */
exports.registerAgency = async (req, res) => {
  try {
    const { name, email, phone, address, username, password, logoUrl } = req.body;

    // Validation
    if (!name || !email || !phone || !address || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if agency already exists (email or username)
    const existingAgency = await Agency.findOne({
      $or: [{ email }, { username }]
    });

    if (existingAgency) {
      return res.status(409).json({
        success: false,
        message: 'Email or username already registered'
      });
    }

    // Create new agency
    const agency = await Agency.create({
      name,
      email,
      phone,
      address,
      username,
      password,
      logoUrl
    });

    res.status(201).json({
      success: true,
      message: 'Agency registered successfully',
      data: agency.toJSON()
    });
  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Login Agency
 */
exports.loginAgency = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    // Find agency
    const agency = await Agency.findOne({ username });

    if (!agency) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if agency is active
    if (!agency.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Agency account is inactive'
      });
    }

    // Compare password
    const isPasswordValid = await agency.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        agencyId: agency._id.toString(),
        agencyName: agency.name,
        email: agency.email,
        logoUrl: agency.logoUrl
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      agency: agency.toJSON()
    });
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get Current Agency (verify token)
 */
exports.getCurrentAgency = async (req, res) => {
  try {
    const agency = await Agency.findById(req.user.agencyId);

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: 'Agency not found'
      });
    }

    res.json({
      success: true,
      data: agency.toJSON()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

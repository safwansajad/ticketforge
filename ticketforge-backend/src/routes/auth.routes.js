const express = require('express');
const router = express.Router();

const {
  registerAgency,
  loginAgency,
  getCurrentAgency
} = require('../controllers/auth.controller');

const { verifyToken } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', registerAgency);
router.post('/login', loginAgency);

// Protected routes
router.get('/me', verifyToken, getCurrentAgency);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  createTicket,
  getTicketByPNR,
  downloadTicketPDF
} = require('../controllers/ticket.controller');

const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/test', (req, res) => {
  res.json({ message: 'Ticket routes working' });
});

// Protected routes - require authentication
router.post('/create', verifyToken, createTicket);
router.get('/:pnr/pdf', verifyToken, downloadTicketPDF);
router.get('/:pnr', verifyToken, getTicketByPNR);

module.exports = router;

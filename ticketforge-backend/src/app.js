const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes ONLY
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/tickets', require('./routes/ticket.routes'));
app.use('/api/airlines', require('./routes/airline.routes'));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'TicketForge API' });
});

module.exports = app;

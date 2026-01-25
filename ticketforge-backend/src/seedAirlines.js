require('dotenv').config();
const connectDB = require('./config/db');
const Airline = require('./models/airline');

const seedSpiceJet = async () => {
  try {
    await connectDB();

    const exists = await Airline.findOne({ code: 'SG' });

    if (exists) {
      console.log('SpiceJet already exists. Skipping seed.');
      process.exit();
    }

    await Airline.create({
      name: 'SpiceJet',
      code: 'SG',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/SpiceJet_logo.svg'
    });

    console.log('SpiceJet seeded successfully');
    process.exit();
  } catch (error) {
    console.error('SpiceJet seeding failed:', error.message);
    process.exit(1);
  }
};

seedSpiceJet();

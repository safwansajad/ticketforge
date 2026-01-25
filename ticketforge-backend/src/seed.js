require('dotenv').config();
const connectDB = require('./config/db');

const Agency = require('./models/agency');
const Airline = require('./models/airline');
const Ticket = require('./models/ticket');

const seedTicket = async () => {
  try {
    await connectDB();

    console.log('Clearing old tickets...');
    await Ticket.deleteMany();

    const agency = await Agency.findOne();
    if (!agency) {
      throw new Error('No agency found. Seed agency first.');
    }

    const airline = await Airline.findOne({ code: '6E' });
    if (!airline) {
      throw new Error('No airline found. Seed airlines first.');
    }

    const ticket = await Ticket.create({
      pnr: 'LOGOTEST01',
      agency: agency._id,
      airline: airline._id,

      sectors: [
        {
          from: 'DEL',
          to: 'SXR',
          flightNumber: '6E213',
          departureTime: new Date('2026-01-20T06:00:00Z'),
          arrivalTime: new Date('2026-01-20T07:30:00Z')
        }
      ],

      passengers: [
        {
          title: 'Mr',
          firstName: 'Safwan',
          lastName: 'Thukar',
          type: 'ADT'
        }
      ],

      fare: {
        base: 4500,
        tax: 500,
        otherCharges: 0,
        total: 5000,
        currency: 'INR'
      },

      baggage: {
        cabin: '7 Kg',
        checkin: '15 Kg'
      },

      status: 'CONFIRMED'
    });

    console.log('Ticket seeded successfully');
    console.log('PNR:', ticket.pnr);

    process.exit();
  } catch (error) {
    console.error('Ticket seeding failed:', error.message);
    process.exit(1);
  }
};

seedTicket();

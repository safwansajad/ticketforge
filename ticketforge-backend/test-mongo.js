require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  try {
    console.log('Connecting...');
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log('CONNECTED SUCCESSFULLY');
    process.exit(0);
  } catch (err) {
    console.error('FAILED:', err);
    process.exit(1);
  }
})();

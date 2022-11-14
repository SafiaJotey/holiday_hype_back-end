const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(cors());
app.use(express.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const packageRoutes = require('./Routes/v1/package.route');
const bookingRoutes = require('./Routes/v1/booking.route');
const { connectToServer } = require('./utils/dbConnection');

const port = process.env.PORT || 8000;

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log('Running Server on port', port);
    });

    app.use('/api/v1/packages', packageRoutes);
    app.use('/api/v1/bookings', bookingRoutes);
  } else {
    console.log(err);
  }
});

// app.get('/', (req, res) => {
//   res.send('Running Holiday Hype');
// });

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // You can use any port you prefer

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/countdownDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to Data base');
});

// Define MongoDB model/schema for countdown data
const countdownSchema = new mongoose.Schema({
  days: Number,
  hours: Number,
  minutes: Number,
  seconds: Number,
});

const Countdown = mongoose.model('Countdown', countdownSchema);

// Endpoint to receive countdown data from the client
app.use(express.json());
app.post('/startTimer', (req, res) => {
  const { days, hours, minutes, seconds } = req.body;

  const newCountdown = new Countdown({
    days,
    hours,
    minutes,
    seconds,
  });

  newCountdown.save((err, countdown) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving countdown data');
    } else {
      res.status(200).send('Countdown data saved successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

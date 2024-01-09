const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const mongoURI = 'your_mongodb_uri'; // Replace 'your_mongodb_uri' with your MongoDB connection URI

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Ensure your HTML file is in a 'public' directory

app.post('/submit_registration', (req, res) => {
  // MongoDB connection and insertion code
  MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);
      res.status(500).send('Error connecting to the database');
      return;
    }

    const db = client.db('your_database_name'); // Replace 'your_database_name' with your database name
    const collection = db.collection('users');

    // Assuming form fields are sent through request body
    const { fullname, email, username, password, dob, gender } = req.body;

    collection.insertOne({ fullname, email, username, password, dob, gender }, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error inserting data');
        return;
      }
      res.sendFile(__dirname + '/public/success.html'); // Send a success HTML file as response
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

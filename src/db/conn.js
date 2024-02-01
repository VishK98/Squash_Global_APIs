const mongoose = require('mongoose');
// const uri = 'mongodb+srv://Abhi1518:Abhi1518@cluster0.25dua6v.mongodb.net/register'; // MongoDB connection URI
const uri = "mongodb+srv://visheshkumar41:BwnxVrz3tkBnI90T@cluster0.fozhk6m.mongodb.net/SquashGlobal";


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose.connection;

   
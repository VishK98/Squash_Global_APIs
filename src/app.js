const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const multer = require("multer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(express.json());


//db connection
const uri = "mongodb+srv://visheshkumar41:BwnxVrz3tkBnI90T@cluster0.fozhk6m.mongodb.net/SquashGlobal";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Successfully Connected'))
    .catch(err => console.log(err));



app.get('/', (req, res) => {
  res.send('Squash Global Backend API');
});


//routes
const routes = require('./routes/route');
app.use('/api/', routes);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const multer = require("multer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

// `Node Server Running In ${process.env.DEV_MODE} Mode on port no ${PORT}`
//db connection
const uri = `${process.env.mongodb_url}`;
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

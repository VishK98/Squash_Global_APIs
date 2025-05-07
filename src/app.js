const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes/route');

app.use(cors());
app.use(express.json());

//db connection
const uri = process.env.mongodb_url;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Successfully Connected'))
    .catch(err => console.log(err));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define routes
app.get('/', (req, res) => {
    res.send('Squash Global Backend API');
});


app.use('/api/', routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

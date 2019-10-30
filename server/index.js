require('dotenv').config();
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

const routes = require('./routes');

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const Category = require('./models/category');

// app.use('/api', foodRouter);
app.use('/api/foods', routes.foodRouter);
app.use('/api/tags', routes.tagRouter);

app.get('/api/categories', async (req, res) => {
  await Category.find({}, (err, categories) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!categories.length) {
      return res.status(404).json({ success: false, error: `Tag not found` });
    }
    return res.status(200).json({ success: true, data: categories });
  }).catch(err => console.log(err));
});

app.use(express.static(path.join(__dirname, '..', 'build')));

// Handle React routing by returning all requests to client
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

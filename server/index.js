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

// app.use('/api', foodRouter);
app.use('/api/foods', routes.foodRouter);
app.use('/api/tags', routes.tagRouter);
app.use('/api/categories', routes.categoryRouter);
app.use('/api/queries', routes.queryRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));

// Handle React routing by returning all requests to client
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

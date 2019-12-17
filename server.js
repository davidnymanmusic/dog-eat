require('dotenv').config();
const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./server/db');

const routes = require('./server/routes');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
// increase the limit
myEmitter.setMaxListeners(11);

myEmitter.emit('event');

const app = express();
const PORT = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());

app.get('/api/test', (req, res) => {
  res.json({ test: 'test' });
});
// app.use('/api', foodRouter);
app.use('/api/foods', routes.foodRouter);
app.use('/api/tags', routes.tagRouter);
app.use('/api/categories', routes.categoryRouter);
app.use('/api/queries', routes.queryRouter);

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
// Handle React routing by returning all requests to client
app.get('/ping', function(req, res) {
  return res.send('pong');
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

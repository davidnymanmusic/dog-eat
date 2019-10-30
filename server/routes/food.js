const foods = require('express').Router();

const Food = require('../models/food');

const seed = require('../seed');

foods.post('/', (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a food',
    });
  }

  const food = new Food(body);

  if (!food) {
    return res.status(400).json({ success: false, error: 'error' });
  }

  food
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: food._id,
        message: 'Food created!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Food not created!',
      });
    });
});

foods.get('/', async (req, res) => {
  await Food.find({}, (err, foods) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!foods.length) {
      return res.status(404).json({ success: false, error: `Food not found` });
    }
    return res.status(200).json({ success: true, data: foods });
  }).catch(err => console.log(err));
});

// foods.get('/seed', (req, res) => {
//   Food.collection.insertMany(seed);
// });

module.exports = foods;

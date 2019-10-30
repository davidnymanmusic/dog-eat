const Food = require('../models/food');

const createFood = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a food',
    });
  }

  const food = new Food(body);

  if (!food) {
    return res.status(400).json({ success: false, error: err });
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
};

const updateFood = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Food.findOne({ _id: req.params.id }, (err, food) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Food not found!',
      });
    }
    food.name = body.name;
    food.time = body.time;
    food.rating = body.rating;
    food
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: food._id,
          message: 'Food updated!',
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Food not updated!',
        });
      });
  });
};

const deleteFood = async (req, res) => {
  await Food.findOneAndDelete({ _id: req.params.id }, (err, food) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!food) {
      return res.status(404).json({ success: false, error: `Food not found` });
    }

    return res.status(200).json({ success: true, data: food });
  }).catch(err => console.log(err));
};

const getFoodById = async (req, res) => {
  await Food.findOne({ _id: req.params.id }, (err, food) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    return res.status(200).json({ success: true, data: food });
  }).catch(err => console.log(err));
};

const getFoods = async (req, res) => {
  await Food.find({}, (err, foods) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!foods.length) {
      return res.status(404).json({ success: false, error: `Food not found` });
    }
    return res.status(200).json({ success: true, data: foods });
  }).catch(err => console.log(err));
};

module.exports = {
  createFood,
  updateFood,
  deleteFood,
  getFoods,
  getFoodById,
};

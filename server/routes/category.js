const categories = require('express').Router();

const Category = require('../models/category');

categories.post('/', (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a food',
    });
  }

  const category = new Category(body);

  if (!category) {
    return res.status(400).json({ success: false, error: 'error' });
  }

  category
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: category._id,
        message: 'category created!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'category not created!',
      });
    });
});

categories.get('/', async (req, res) => {
  await Category.find({}, (err, categories) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!categories.length) {
      return res
        .status(404)
        .json({ success: false, error: `Category not found` });
    }
    return res.status(200).json({ success: true, data: categories });
  }).catch(err => console.log(err));
});

categories.put('/:id', async (request, response) => {
  try {
    var category = await Category.findById(request.params.id).exec();
    category.set(request.body);
    category.save();
  } catch (error) {
    response.status(500).send(error);
  }
});

categories.delete('/:id', async (req, res) => {
  await Category.findOneAndDelete({ _id: req.params.id }, (err, category) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!category) {
      return res.status(404).json({ success: false, error: `Food not found` });
    }

    return res.status(200).json({ success: true, data: category });
  }).catch(err => console.log(err));
});
module.exports = categories;

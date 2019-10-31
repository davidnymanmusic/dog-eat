const query = require('express').Router();

const Food = require('../models/food');
query.get('/', async function(req, res) {
  const prop = req.query.prop;
  await Food.find(
    {
      [prop]: req.query.value,
      edible: req.query.edible,
    },
    (err, foods) => {
      return res.status(200).json({ foods });
    },
  );
});
query.get('/tags', async function(req, res) {
  const tag = req.query.tag;
  await Food.find(
    { tags: tag },

    (err, foods) => {
      return res.status(200).json({ foods });
    },
  );
});

module.exports = query;

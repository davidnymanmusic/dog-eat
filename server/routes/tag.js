const tags = require('express').Router();

const Tag = require('../models/tag');

tags.post('/', (req, res) => {
  const body = req.body;
  console.log(body);

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a food',
    });
  }

  const tag = new Tag(body);

  if (!tag) {
    return res.status(400).json({ success: false, error: 'error' });
  }

  tag
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: tag._id,
        message: 'tag created!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'tag not created!',
      });
    });
});

tags.get('/', async (req, res) => {
  await Tag.find({}, (err, tags) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!tags.length) {
      return res.status(404).json({ success: false, error: `Tag not found` });
    }
    return res.status(200).json({ success: true, data: tags });
  }).catch(err => console.log(err));
});

tags.put('/:id', async (request, response) => {
  try {
    var tag = await Tag.findById(request.params.id).exec();
    tag.set(request.body);
    tag.save();
  } catch (error) {
    response.status(500).send(error);
  }
});
module.exports = tags;

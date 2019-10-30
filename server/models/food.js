const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Food = new Schema(
  {
    name: { type: String, required: false },
    description: { type: String, required: false },
    edible: { type: Boolean, required: false },
    dog_food: { type: Boolean, required: false },
    category: { type: String, required: false },
    tags: { type: [String], required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('food', Food);

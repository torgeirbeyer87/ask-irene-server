const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectorSchema = new Schema({
  disctrict: Array,
  situation: Array,
  price: Array,
  categories: Array,
  tags: Array
});

const Selector = mongoose.model('Selector', selectorSchema);

module.exports = {
  Selector
};

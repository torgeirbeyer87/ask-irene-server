const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  id: String,
  name: String,
  district: Array,
  categories: Array,
  situation: Array,
  price: Array,
  vibe: Array,
  tags: Array,
  images: Array,
  description: String,
  links: Object, // 1. web, 2. facebook, 3. google maps, 4. instagram
  location: Object // object containing lat, long like mongoose likes it? or just array of lat, lng?
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = {
  Spot
};

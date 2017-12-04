const express = require('express');
const router = express.Router();

const Spot = require('../models/spot').Spot;

// get all the spots
router.get('/', function (req, res, next) {
  Spot.find({}, (err, spots) => {
    if (err) {
      return next(err); // to not show the error in the frontend
    }
    return res.json(spots);
  });
});

// creates and saves the new spot
router.post('/', (req, res, next) => {
  const user = req.user._id; // to make sure that is is the admin
  const spotName = req.body.name;
  const district = req.body.district;
  const category = req.body.category;
  const situation = req.body.situation;
  const price = req.body.price;
  const vibe = req.body.vibe;
  const tags = req.body.tags;
  const images = req.body.images;
  const description = req.body.description;
  const links = req.body.links;
  const location = req.body.location;

  const newSpot = new Spot({
    // owner: user,
    name: spotName,
    district: district,
    category: category,
    situation: situation,
    price: price,
    vibe: vibe,
    tags: tags,
    images: images,
    description: description,
    links: links,
    location: location
  });

  newSpot.save((err) => {
    if (err) {
      next(err);
    }
    res.json({message: 'Saved'});
  });
});

module.exports = router;

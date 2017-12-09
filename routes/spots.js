const express = require('express');
const router = express.Router();

const Spot = require('../models/spot').Spot;
const enums = require('../models/enums/enums');

// get all the spots
router.get('/', function (req, res, next) {
  Spot.find({}, (err, spots) => {
    if (err) {
      return next(err); // to not show the error in the frontend
    }
    return res.json(spots);
  });
});

// get one spot
// router.get('/:spotId', (req, res, next) => {
//   Spot.findById(req.params.spotId, (err, spot) => {
//     if (err) {
//       return next(err);
//     }
//     console.log(spot);
//     return res.json(spot);
//   });
// });

// get random spot

// CODE FROM STACKOVERFLOW
// https://stackoverflow.com/questions/39277670/how-to-find-random-record-in-mongoose
// Get the count of all users
// router.get('/');
// Spot.count().exec(function (err, count) {
//   // Get a random entry
//   var random = Math.floor(Math.random() * count);

//   // Again query all users but only fetch one offset by our random #
//   Spot.findOne().skip(random).exec(
//     function (err, result) {
//       // Tada! random user
//       console.log(result);
//     });
// });

// function to filter the spots
router.post('/filter', (req, res, next) => {
  console.log('hello from the filter-backend: ' + req.body);

  const filter = req.body;
  let query = {$and: []};

  for (let key in filter) {
    let condition = {$or: []};
    filter[key].forEach((value) => {
      condition.$or.push({[key]: value});
    });
    if (condition.$or.length !== 0) {
      query.$and.push(condition);
    }
  }

  Spot.find(query, (err, spots) => {
    if (err) {
      return next(err);
    }
    console.log('hello - here is the filtered spots: ' + spots);
    return res.json(spots);
  });
});

// delete one spot
router.post('/:spotId', (req, res, next) => {
  Spot.findByIdAndRemove(req.params.spotId, (err, spot) => {
    if (err) {
      return next(err);
    }
    return res.json({message: 'spot deleted'});
  });
});

// creates and saves the new spot
router.post('/', (req, res, next) => {
  console.log('hello from the backend!');
  // const user = req.user._id; // to make sure that is is the admin
  const spotName = req.body.name;
  const district = req.body.district;
  const categories = req.body.categories;
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
    categories: categories,
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

// gets the selector-object
router.get('/selectors', function (req, res, next) {
  res.json(enums);
});

module.exports = router;

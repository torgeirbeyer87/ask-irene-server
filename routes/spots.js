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
  const filter = req.body;
  let query = {$and: []};

  // validate filter-request (can not be empty --> mongoose error)
  let filterEmpty = true;
  const values = Object.values(filter);
  for (let ix = 0; ix < values.length; ix++) {
    if (values[ix].length !== 0) {
      filterEmpty = false; // can not use an early return --> stops the whole process
      break;
    } else {
      filterEmpty = true;
    }
  }

  if (filterEmpty === false) {
    for (let key in filter) {
      let andCondition = {$and: []};
      let orCondition = {$or: []};
      // iterate over the keys of filter, and push key: value pairs into the corresponding array of subQuerys
      filter[key].forEach((value) => {
        if (key.toString() === 'district' || key.toString() === 'price') {
          orCondition.$or.push({[key]: value});
        } else {
          andCondition.$and.push({[key]: value});
        }
        // checks if conditionarrays are NOT empty and pushes them to query
        if (andCondition.$and.length !== 0) {
          query.$and.push(andCondition);
        } else if (orCondition.$or.length !== 0) {
          query.$and.push(orCondition);
        } else {
          query.$and.push(orCondition, andCondition);
        }
      });
    };

    Spot.find(query, (err, spots) => {
      if (err) {
        return next(err);
      }
      return res.json(spots);
    });
  } else {
    Spot.find({}, (err, spots) => {
      if (err) {
        return next(err); // to not show the error in the frontend
      }
      return res.json(spots);
    });
  }
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

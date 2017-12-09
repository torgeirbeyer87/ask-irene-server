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

router.post('/filter', (req, res, next) => {
  console.log('hello from the filter-backend: ' + req.body);

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
  } else {
    Spot.find({}, (err, spots) => {
      if (err) {
        return next(err); // to not show the error in the frontend
      }
      return res.json(spots);
    });
  }
});

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

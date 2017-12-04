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
// router.post('/new', (req, res, next) => {
//   const hacker = req.user._id;
//   const posttext = req.body.text;
//   const newPost = new Post({
//     text: posttext,
//     owner: hacker,
//     score: 0
//   });

//   newPost.save((err) => {
//     if (err) {
//       next(err);
//     }
//     res.redirect('/feed');
//   });
// });

module.exports = router;

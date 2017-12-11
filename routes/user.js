var express = require('express');
var router = express.Router();

const User = require('../models/user').User;

// store a spotId in the database for favorites
router.post('/me/favourites', (req, res, next) => {
  const spotId = req.body.spotId;
  const userId = req.body.user.id;
  const query = {'_id': userId};
  const update = {
    $push: {
      favorites: spotId
    }
  };

  User.findOne({_id: userId}, (err, user) => {
    console.log(user);
    if (err) {
      next(err);
    }
    if (user.favorites.indexOf(spotId) !== -1) {
      return res.json({message: 'already in the list'});
    } else {
      User.findOneAndUpdate(query, update, (err, user) => {
        if (err) {
          return next(err);
        }
        return res.json({message: true});
      });
    }
  });
});

// store a spotId in the database for wishlist
router.post('/me/wishlist', (req, res, next) => {
  const spotId = req.body.spotId;
  const userId = req.body.user.id;
  const query = {'_id': userId};
  const update = {
    $push: {
      wishList: spotId
    }
  };

  User.findOne({_id: userId}, (err, user) => {
    console.log(user);
    if (err) {
      next(err);
    }
    if (user.wishList.indexOf(spotId) !== -1) {
      return res.json({message: 'already in the list'});
    } else {
      User.findOneAndUpdate(query, update, (err, user) => {
        if (err) {
          return next(err);
        }
        return res.json({message: true});
      });
    }
  });
});

module.exports = router;

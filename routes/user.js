var express = require('express');
var router = express.Router();

const response = require('../helpers/response');
const User = require('../models/user').User;

// get list of wishList
router.get('/me/get/spots', (req, res, next) => {
  if (!req.user) {
    return response.forbidden(req, res);
  }
  const user = req.user;
  User.findById(user.id).populate('favorites').populate('wishList').exec((err, user) => {
    if (err) {
      return next(err);
    }
    return res.json(user);
  });
});

// store a spotId in the database for favorites
router.post('/me/edit/favorites', (req, res, next) => {
  if (!req.user) {
    return response.forbidden(req, res);
  }
  const user = req.user;
  const spotId = req.body.spotId;
  const query = {'_id': user.id};
  let update;

  User.findOne({_id: user.id}, (err, user) => {
    if (err) {
      next(err);
    }
    if (user.favorites.indexOf(spotId) === -1) {
      update = {
        $push: {
          favorites: spotId
        }
      };
    } else {
      update = {
        $pull: {
          favorites: spotId
        }
      };
    }

    User.findOneAndUpdate(query, update, {new: true}, (err, user) => {
      if (err) {
        return next(err);
      }
      req.login(user, (err) => {
        console.log(err);
        let data = user.asData();
        // return res.json({message: 'deleted'});
        return response.data(req, res, data);
      });
    });
  });
});

// store a spotId in the database for wishlist
router.post('/me/edit/wishList', (req, res, next) => {
  if (!req.user) {
    return response.forbidden(req, res);
  }
  const user = req.user;
  const spotId = req.body.spotId;
  const query = {'_id': user.id};
  let update;

  User.findOne({_id: user.id}, (err, user) => {
    if (err) {
      next(err);
    }
    if (user.wishList.indexOf(spotId) === -1) {
      update = {
        $push: {
          wishList: spotId
        }
      };
    } else {
      update = {
        $pull: {
          wishList: spotId
        }
      };
    }

    User.findOneAndUpdate(query, update, {new: true}, (err, user) => {
      if (err) {
        return next(err);
      }
      req.login(user, (err) => {
        console.log(err);
        let data = user.asData();
        // return res.json({message: 'deleted'});
        return response.data(req, res, data);
      });
    });
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

const response = require('../helpers/response');
const User = require('../models/user').User;

// get list of favorites
router.post('/me/get/spots', (req, res, next) => {
  const user = req.body.user;
  User.findById(user.id).populate('favorites').populate('wishList').exec((err, user) => {
    if (err) {
      return next(err);
    }
    return res.json(user);
  });
});

// store a spotId in the database for favorites
router.post('/me/edit/favorites', (req, res, next) => {
  const spotId = req.body.spotId;
  const userId = req.body.user.id;
  const query = {'_id': userId};
  const add = {
    $push: {
      favorites: spotId
    }
  };
  const remove = {
    $pull: {
      favorites: spotId
    }
  };

  User.findOne({_id: userId}, (err, user) => {
    if (err) {
      next(err);
    }
    if (user.favorites.indexOf(spotId) !== -1) {
      User.findOneAndUpdate(query, remove, {new: true}, (err, user) => {
        if (err) {
          return next(err);
        }
        req.login(user, () => {
          let data = user.asData();
          // return res.json({message: 'deleted'});
          return response.data(req, res, data);
        });
      });
    } else {
      User.findOneAndUpdate(query, add, {new: true}, (err, user) => {
        if (err) {
          return next(err);
        }
        req.login(user, () => {
          let data = user.asData();
          // return res.json({message: 'deleted'});
          return response.data(req, res, data);
        });
      });
    }
  });
});

// User.findOneAndUpdate({ _id: req.user._id }, { $set: newInfo }, {new: true}, (err, user) => {
//   if (err) {
//     return next(err);
//   }
//   if (!user) {
//     return response.notFound(req, res);
//   }
//   req.login(user, (err) => {
//     let data = user.asData();
//     return response.data(req, res, data);
//   });
// });
// });

// store a spotId in the database for wishlist
router.post('/me/edit/wishlist', (req, res, next) => {
  const spotId = req.body.spotId;
  const userId = req.body.user.id;
  const query = {'_id': userId};
  const add = {
    $push: {
      wishList: spotId
    }
  };
  const remove = {
    $pull: {
      wishList: spotId
    }
  };

  User.findOne({_id: userId}, (err, user) => {
    console.log(user);
    if (err) {
      next(err);
    }
    if (user.wishList.indexOf(spotId) !== -1) {
      User.findOneAndUpdate(query, remove, {new: true}, (err, user) => {
        if (err) {
          return next(err);
        }
        req.login(user, () => {
          let data = user.asData();
          // return res.json({message: 'deleted'});
          return response.data(req, res, data);
        });
      });
    } else {
      User.findOneAndUpdate(query, add, {new: true}, (err, user) => {
        if (err) {
          return next(err);
        }
        req.login(user, () => {
          let data = user.asData();
          // return res.json({message: 'deleted'});
          return response.data(req, res, data);
        });
      });
    }
  });
});

module.exports = router;

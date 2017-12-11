const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  favorites: Array,
  wishList: Array,
  role: Array
});

UserSchema.methods.asData = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    role: this.role,
    favorites: this.favorites,
    wishList: this.wishList
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};

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
  }
});

UserSchema.methods.asData = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};

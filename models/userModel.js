const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'a user must have a name'],
  },
  email: {
    type: String,
    require: [true, 'a user must have a email'],
    unique: true,
  },
  role: {
    type: String,
    require,
  },
});

const User = mongoose.model('User', usersSchema);

module.exports = User;

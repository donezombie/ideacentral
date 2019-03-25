//Schema
const mongoose = require('mongoose');
var Users = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  socialMedia: {
    type: String,
  },
  ideaOwner: {
    type: Array,
    default: []
  }
});

const UsersModel = mongoose.model('Users', Users);

module.exports = UsersModel;
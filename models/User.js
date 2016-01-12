var Mongoose = require('mongoose');

exports.UserSchema = new Mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true}
})
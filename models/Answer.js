var Mongoose = require('mongoose');

exports.AnswerSchema = new Mongoose.Schema({
  content: {type: String, required: true},
  pickers: [{type: Mongoose.Schema.ObjectId, ref: "User"}]
})
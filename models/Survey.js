var Mongoose = require('mongoose');

exports.SurveySchema = new Mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  created_at: {type: Date, default: Date.now},
  creator: {type: Mongoose.Schema.ObjectId, ref: "User"},
  Questions: [{type: Mongoose.Schema.ObjectId, ref: "Questions"}]
})
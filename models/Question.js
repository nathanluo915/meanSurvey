var Mongoose = require('mongoose');

exports.QuestionSchema = new Mongoose.Schema({
  content: {type: String, required: true},
  answers: [{type: Mongoose.Schema.ObjectId, ref: "Answer"}]
})
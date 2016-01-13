// var db = require('../db/MongoSetup');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
  var survey = {
    name: req.body.name || "survey 1",
    description: req.body.description,
    questions: []
  };

  for (var qIndex in req.body.questions) {
    var question = {
      content: req.body.questions[qIndex].content,
      answers: []
    };
    for (var ansIndex in req.body.questions[qIndex].answers) {
      var answer ={
        content: req.body.questions[qIndex].answers[ansIndex]
      }
      question.answers.push(answer);
    }
    survey.questions.push(question);
  }

  var collection = req.db.get('surveys');
  collection.insert(survey, function(err, result){
    res.json({survey: result});
  })
});

router.get('/', function(req, res, next) {
  var collection = req.db.get('surveys');
  console.log(req.body);
  collection.find({}, 'name', function(err, surveys){
    res.json({surveys: surveys});
  })
  // collection.find()
});

module.exports = router;

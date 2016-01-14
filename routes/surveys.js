var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
  var survey = req.body

  for (var qIndex in survey.questions) {
    for (var ansIndex in req.body.questions[qIndex].answers) {
      survey.questions[qIndex].answers[ansIndex].count = 0;
    }
  }
  console.log(survey);
  var collection = req.db.get('surveys');
  collection.insert(survey, function(err, result){
    res.json({survey: result});
  })
});

router.get('/', function(req, res, next) {
  var collection = req.db.get('surveys');
  collection.find({}, 'name', function(err, surveys){
    res.json({surveys: surveys});
  })
});

router.get('/:id', function(req, res, next) {
  var collection = req.db.get('surveys');
  collection.findOne({_id: req.params.id}, function(err, survey) {
    res.json({survey: survey});
  })
});

router.put('/:id', function(req, res, next) {
  var collection = req.db.get('surveys');
  collection.findOne({_id: req.body.id}, function(err, survey) {
    for (var qIndex in req.body.responses){
    // survey.questions[req.body.

    }
  })
  console.log(req.body);

});

module.exports = router;

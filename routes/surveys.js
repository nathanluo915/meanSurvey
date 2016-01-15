var express = require('express');
var router = express.Router();

function insertAnswers(ansCol, answers){
  var deferred = Promise.defer();
  var answer_arr = [];
  for (var ansIndex in answers) {
    var answer = {
      content: answers[ansIndex].content,
      count: 0
    };
    answer_arr.push(answer);
  }
  ansCol.insertMany(answer_arr, function(err, result) {
    deferred.resolve(result.insertedIds);
  })
  return deferred.promise;
}


function insertQuestions(qCol, ansCol, questions) {
  var deferred = Promise.defer();
  var qIds = [];
  (function loopArray() {
    insertQuestion(qCol, ansCol, questions[0]).then(function(qId){
      qIds.push(qId);
      questions.shift();
      if (questions.length > 0){
        loopArray();
      } else {
        deferred.resolve(qIds);
      }
    })
  })();
  return deferred.promise;
}

function insertQuestion(qCol, ansCol, question) {
  var deferred = Promise.defer();
  insertAnswers(ansCol, question.answers).then(function(ansIds){
    var q = {
      content: question.content,
      answers: ansIds
    }
    qCol.insert(q, function(err, result){
      deferred.resolve(result.ops[0]._id);
    })
  })
  return deferred.promise;
}

router.post('/', function(req, res, next){
  var survey = {
    title: req.body.title,
    description: req.body.description,
    created_at: new Date()
  };

  var surveys = req.db.collection('surveys'),
      questions = req.db.collection('questions'),
      answers = req.db.collection('answers');

  insertQuestions(questions, answers, req.body.questions).then(function(qIds){
    survey.questions = qIds;
    surveys.insert(survey, function(err, result){
      res.json({survey: result.ops[0]});
    })
  });

});

router.get('/', function(req, res, next) {
  var collection = req.db.get('surveys');
  collection.find({}, 'name', function(err, surveys){
    res.json({surveys: surveys});
  })
});

router.get('/:id', function(req, res, next) {
  var collection = req.db.get('surveys');
  collection.findOne({_id: req.params.id}, {count: 0}, function(err, survey) {
    res.json({survey: survey});
  })
});

router.put('/:id', function(req, res, next) {
  var collection = req.db.get('surveys');
  collection.findOne({_id: req.body.id}, function(err, survey) {
    for (var qIndex in req.body.response){
      var ansIndex = parseInt(req.body.response[qIndex].id);
      survey.questions[qIndex].answers[ansIndex].count += 1;
    }

    collection.update({_id: req.body.id}, survey, function(err, result) {
      if (err) {
        res.json({err: err});
      } else {
        res.json({result: result});
      }
    });
  });

});

module.exports = router;

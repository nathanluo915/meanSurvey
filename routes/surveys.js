exports.query = function(Survey){
  return function(req, res) {
    Survey.find({}, function(error, surveys){
      res.json({surveys: surveys});
    });
  };
};

exports.show = function(Survey){
  return function(req, res) {
    Survey.findOne({_id: req.params.id}, function(error, survey) {
      if (error || !survey) {
        res.json({error: error});
      } else {
        res.json({survey: survey});
      }
    });
  };
};

exports.create = function(Survey, Question, Answer) {
  return function(req, res) {
    var survey = new Survey({name: req.body.name, description: req.body.description});

    for (var q in req.body.questions) {
      var question = new Question({content: req.body.questions[q].content});

      for (var a in req.body.questions[q].answers){
        var answer = new Answer({content: req.body.questions[q].answers[a]});
        answer.save(function(error, answer){
          question.answers.push(answer._id);
        });
      }

      question.save(function(error, question){
        survey.questions.push(question._id);
      });
    }

    survey.save(function(error, survey){
      res.json({survey: survey});
    });

  };
};


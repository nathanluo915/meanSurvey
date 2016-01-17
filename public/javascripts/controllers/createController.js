app.controller('createController', ['$scope', '$compile', 'SurveyService', '$location', function($scope, $compile, SurveyService, $location){
  $scope.counter = 0;
  $scope.survey = {questions: {length: 0}}
  $scope.disable = true;
  $scope.createSurvey = function(survey, newSurveyForm){
    if (newSurveyForm.$valid){
      SurveyService.addSurvey(survey).then(function(data){
        $location.path('/surveys/' + data.surveyId + '/result');
      });
    }
  };

  $scope.dummyFunction = function(){
    $scope.counter += 0;
  };

  $scope.newQuestion = function(counter){
    if ($scope.survey.questions.length < 10) {
      var ele = $compile("<question counter='"+counter+"' />")($scope);
      angular.element('#new-survey-form').append(ele);
      $scope.survey.questions.length += 1;
      $scope.counter += 1;
    } else {
      alert("Reached max amount of questions");
    }
  }

  $scope.newAnswer = function(counter){
    var targetEle = angular.element('#question-'+counter+'>.answer-block');
    var nextIndex = angular.element('#question-'+counter+'>.answer-block').children().length + 1;
    if (nextIndex <= 10) {
      var addEle = $compile("<answer q-index='"+counter+"' ans-index='"+nextIndex+"' />")($scope);
      targetEle.append(addEle);
    } else {
      alert("Reached max amount of answers");
    }
  }

  $scope.removeQuestion = function(qCounter) {
    var ele = angular.element('#question-'+qCounter);
    if (ele) {
      ele.remove();
    }
    if ($scope.survey && $scope.survey.questions[qCounter] ) {
      delete $scope.survey.questions[qCounter];
    }
    $scope.survey.questions.length -= 1;
  }

  $scope.removeAnswer = function(qCounter) {
    var index = angular.element('#question-'+qCounter+'>.answer-block').children().length;
    var element = angular.element('#question-'+qCounter+'>.answer-block').children()[index-1];
    if (element && index > 1){
      element.remove();
    }
    if($scope.survey && $scope.survey.questions[qCounter] && $scope.survey.questions[qCounter].answers[index]) {
      delete $scope.survey.questions[qCounter].answers[index];
    }
  }

}]);
app.controller('createController', ['$scope', '$http', '$compile', function($scope, $http, $compile){
  $scope.counter = 0;

  $scope.createSurvey = function(){
    $http.post('/surveys', $scope.survey).then(function(data){
      $scope.surveyDisplay = data.data.survey;
      console.log($scope.survey);
    });
  };

  $scope.dummyFunction = function(){
    $scope.counter += 0;
  };

  $scope.newQuestion = function(counter){
    var ele = $compile("<question counter='"+counter+"' />")($scope);
    angular.element('#new-survey-form').append(ele);
    $scope.counter += 1;
  }

  $scope.newAnswer = function(counter){
    var targetEle = angular.element('#question-'+counter+'>.answer-block');
    var nextIndex = angular.element('#question-'+counter+'>.answer-block').children().length + 1;
    var addEle = $compile("<answer q-index='"+counter+"' ans-index='"+nextIndex+"' />")($scope);
    targetEle.append(addEle);
  }

  $scope.removeQuestion = function(qCounter) {
    var ele = angular.element('#question-'+qCounter);
    if (ele) {
      ele.remove();
    }
    if ($scope.survey && $scope.survey.questions[qCounter] ) {
      delete $scope.survey.questions[qCounter];
    }
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
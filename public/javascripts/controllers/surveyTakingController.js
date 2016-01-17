app.controller('surveyTakingController', ['$scope', 'SurveyService', '$routeParams', '$location', '$cookies', function($scope, SurveyService, $routeParams, $location, $cookies){
  $scope.id = $routeParams.id;
  $scope.formData = {};
  SurveyService.getSurvey($scope.id).then(function(survey){
    var votedSurveys = $cookies.get('voted').split('&');
    var voted = false;
    for (var i = 0; i < votedSurveys.length; i++) {
      if (survey._id === votedSurveys[i]) {
        voted = true;
      }
    }
    if (voted) {
      $location.path('/surveys/' + survey._id + '/result');
    } else {
      $scope.survey = survey;
    }
  });

  $scope.dummy = function(){
    $scope.dummyContainer = 0;
  }

  $scope.submitSurvey = function(formData){
    var reqBody = {id: $scope.survey._id, response: formData};
    SurveyService.submitResponse(reqBody).then(function(surveyResult){
      $scope.result = surveyResult;
      $location.path('/surveys/'+$scope.id+'/result');
    }, function(err) {
      $scope.error = err;
    });
  }
}]);
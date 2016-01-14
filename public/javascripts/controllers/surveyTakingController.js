app.controller('surveyTakingController', ['$scope', 'SurveyService', '$routeParams', '$location', function($scope, SurveyService, $routeParams, $location){
  $scope.id = $routeParams.id;
  $scope.formData = {};
  SurveyService.getSurvey($scope.id).then(function(survey){
    $scope.survey = survey;
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
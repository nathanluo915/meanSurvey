app.controller('surveyDetailController', ['$scope', 'SurveyService', '$routeParams', function($scope, SurveyService, $routeParams){
  $scope.id = $routeParams.id;
  SurveyService.getSurvey($scope.id).then(function(survey){
    $scope.survey = survey;
  });
  $scope.dummy = function(){
    $scope.dummy = 0;
  }
}]);
app.controller('queryController', ['$scope', 'SurveyService', function($scope, SurveyService, $watch){
  SurveyService.querySurvey({}).then(function(surveys){
    $scope.surveys = surveys;
  });

}]);
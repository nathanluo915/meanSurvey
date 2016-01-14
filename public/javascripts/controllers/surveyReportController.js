app.controller('surveyReportController', ['$scope', '$routeParams','SurveyService', function($scope, $routeParams, SurveyService){
  SurveyService.getSurvey($routeParams.id).then(function(survey){
    $scope.survey = survey;
  });
}]);
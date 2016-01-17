app.controller('queryController', ['$scope', 'SurveyService', '$cookies', '$location', function($scope, SurveyService, $cookies, $location){
  SurveyService.querySurvey({}).then(function(surveys){
    $scope.surveys = surveys;
  });
  $scope.visit = function(survey) {
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
      $location.path('/surveys/' + survey._id);
    }
  }
}]);
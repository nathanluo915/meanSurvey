app.factory('SurveyService', ['$http', '$q', function($http, $q) {
  return {
    addSurvey: function(survey) {
      var deferred = $q.defer();
      $http.post('/surveys', survey).then(function(data){
        deferred.resolve(data.data.survey);
      })
      return deferred.promise;
    },

    querySurvey: function(query){
      var deferred = $q.defer();
      $http.get('/surveys', query).then(function(data){
        deferred.resolve(data.data.surveys);
      });
      return deferred.promise;
    }
  }
}]);
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
    },

    getSurvey: function(id){
      var deferred = $q.defer();
      $http.get('/surveys/' + id).then(function(data) {
        deferred.resolve(data.data.survey);
      })
      return deferred.promise;
    },

    submitResponse: function(formData){
      var deferred = $q.defer();
      $http.put('/surveys/'+ formData.id, formData).then(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }
  }
}]);
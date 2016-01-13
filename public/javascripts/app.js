var app = angular.module('surveyApp', ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/',
  {
    templateUrl: '/templates/index-template.html',
      controller: 'createController'
  })
})

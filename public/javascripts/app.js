var app = angular.module('surveyApp', ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/surveys/new/',
  {
    templateUrl: '/templates/new-template.html',
    controller: 'createController'
  })
  .when('/',
  {
    templateUrl: '/templates/index-template.html',
    controller: 'queryController'
  })
  .when('/surveys/',
  {
    templateUrl: '/templates/index-template.html',
    controller: 'queryController'
  })
  .when('/surveys/:id',
  {
    templateUrl: '/templates/survey-detail.html',
    controller: 'surveyDetailController'
  });
});

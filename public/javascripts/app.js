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
    controller: 'surveyTakingController'
  })
  .when('/surveys/:id/result',
  {
    templateUrl: '/templates/survey-report.html',
    controller: 'surveyReportController'
  });
});

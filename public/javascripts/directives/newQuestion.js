app.directive("question", function($compile, $templateRequest){
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      $templateRequest('/templates/question-template.html').then(function(html){
        html = html.replace(/counter/g, attrs.counter);
        var template = angular.element(html);
        element.html(template);
        $compile(template)(scope);
      })
    }
  };
});

app.directive("answer", function($compile, $templateRequest) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      $templateRequest('/templates/answer-template.html').then(function(html){
        html = html.replace(/q-index/g, attrs.qIndex);
        html = html.replace(/ans-index/g, attrs.ansIndex);
        html = html.replace(/ansCounter/g, attrs.ansIndex);
        var template = angular.element(html);
        element.html(template);
        $compile(template)(scope);
      })
    }
  }
});
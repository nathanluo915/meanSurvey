app.directive("question", function($compile, $templateRequest){
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      $templateRequest('/templates/question-template.html').then(function(html){
        html = html.replace(/counter/g, attrs.counter);
        var template = angular.element(html);
        element.html(template);
        $compile(template)(scope);
        element.find('input')[0].focus();
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
        if (attrs.ansIndex > 2) {
          element.find('input')[0].focus();
        }
      })
    }
  }
});

app.directive("score", function($compile) {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      var markup = "<div class='score-bar' style='width: sizeem'></div>"
      markup = markup.replace(/size/, parseInt(attrs.score)/2);
      var template = angular.element(markup);
      element.replaceWith(template);
      // $compile(element)(scope);
    }

  }
});
angular.module('HY')
  .controller('QuizController', function($scope, $stateParams, $location, Answers) {
    var answers = Answers.get('answers') || {};

    $scope.mobileUsage = {key: 'mobileUsage', value: answers.mobileUsage || 50};

    $scope.updateModel = function(model) {
      var data = {};
      data[model.key] = model.value;
      Answers.set(data);
    };

  });

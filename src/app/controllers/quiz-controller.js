angular.module('HY')
  .controller('QuizController', function($scope, $stateParams, $location, $timeout, Answers, CorrectAnswers) {
    $scope.addClasses = 'quiz';

    var answers = Answers.get('answers') || {},
        correctAnswers = CorrectAnswers.list();

    $scope.getModel = function(key, value) {
      return answers[key] ? { key: key, value: answers[key] } : $scope.updateModel({key: key, value: value || 0});
    };

    $scope.updateModel = function(model) {
      var data = {};
      data[model.key] = model.value;
      Answers.set(data);

      return model;
    };

    $scope.checkAnswer = function(model) {
      return model.value === $scope.correct[model.key];
    };

    $scope.setCorrectAnswers = function(models) {
      angular.forEach(models, function(model) {
        model.value = $scope.correct[model.key];
      });
    };

    $scope.isCorrect = function(model) {
      return $scope.checkAnswer(model) ? 'correct' : 'incorrect';
    };

    // Part 1
    $scope.hyMobileUsage = $scope.getModel('hyMobileUsage', 50);
    $scope.overallMobileUsage = $scope.getModel('overallMobileUsage', false);
    $scope.mobileGoogleSearch = $scope.getModel('mobileGoogleSearch', false);

    // Part 2
    $scope.tech = $scope.getModel('tech', '');
    $scope.openSource = $scope.getModel('openSource', '');
    $scope.openSource2 = $scope.getModel('openSource2', '');

    // Part 4
    $scope.mobileUrl = $scope.getModel('mobileUrl', '');
    $scope.useCamera = $scope.getModel('useCamera', '');
    $scope.useLocation = $scope.getModel('useLocation', '');

    // Part 5
    $scope.mobileOs = $scope.getModel('mobileOs', '');
    $scope.appType = $scope.getModel('appType', '');
    $scope.appsInstalled = $scope.getModel('appsInstalled', ' ');

    // Part 6
    $scope.costs = $scope.getModel('costs', '');

    $scope.correct = correctAnswers;

    // Set correct answers
    if ($stateParams.pageId === 'summary') {
      $timeout(function() {
        switch ($stateParams.partId) {
          case 'part1':
            $scope.setCorrectAnswers([$scope.hyMobileUsage, $scope.overallMobileUsage, $scope.mobileGoogleSearch]);
            break;
          case 'part2':
            $scope.setCorrectAnswers([$scope.tech, $scope.openSource, $scope.openSource2]);
            break;
          case 'part4':
            $scope.setCorrectAnswers([$scope.mobileUrl, $scope.useCamera, $scope.useLocation]);
            break;
          case 'part5':
            $scope.setCorrectAnswers([$scope.mobileOs, $scope.appType, $scope.appsInstalled]);
            break;
          case 'part6':
            $scope.setCorrectAnswers([$scope.costs]);
            break;
        }
      }, 2000);
    }

  });

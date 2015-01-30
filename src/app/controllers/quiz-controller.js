angular.module('HY')
  .controller('QuizController', function($scope, $stateParams, $location, Answers, CorrectAnswers) {
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

    $scope.updateRangeModel = function(argument) {
      console.log('updateRangeModel', argument);
    };

    $scope.checkAnswer = function(model) {
      return model.value === $scope.correct[model.key];
    };

    $scope.isCorrect = function(model) {
      return $scope.checkAnswer(model) ? 'correct' : 'incorrect';
    };

    $scope.mobileUsage = $scope.getModel('mobileUsage', 50);
    $scope.tender =  $scope.getModel('tender', false);
    $scope.needNative =  $scope.getModel('needNative', false);
    $scope.securityRisk =  $scope.getModel('securityRisk', false);
    $scope.hyMobileUsage = $scope.getModel('hyMobileUsage', 50);
    $scope.overallMobileUsage = $scope.getModel('overallMobileUsage', false);
    $scope.mobileGoogleSearch = $scope.getModel('mobileGoogleSearch', false);
    $scope.textInputMobile = $scope.getModel('textInputMobile', false);
    $scope.tech = $scope.getModel('tech', '');
    $scope.openSource = $scope.getModel('openSource', '');
    $scope.openSource2 = $scope.getModel('openSource2', '');
    $scope.mobileUrl = $scope.getModel('mobileUrl', '');
    $scope.useCamera = $scope.getModel('useCamera', '');
    $scope.useLocation = $scope.getModel('useLocation', '');
    $scope.mobileOs = $scope.getModel('mobileOs', '');
    $scope.appType = $scope.getModel('appType', '');
    $scope.appsInstalled = $scope.getModel('appsInstalled', ' ');
    $scope.costs = $scope.getModel('costs', '');

    $scope.correct = correctAnswers;

  });

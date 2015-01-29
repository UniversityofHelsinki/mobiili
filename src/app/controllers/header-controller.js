angular.module('HY')
  .controller('HeaderController', function($state, $stateParams, $scope, $translate, $location, progress, Routes, Search, SessionData, Experience) {

    $scope.lang = $stateParams.lang;
    $scope.progress = progress;
    $scope.search = Search;
    $scope.subNav = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6'];
    $scope.experience = Experience;

    if ($state.current.name === 'app.bookmarks' || $state.current.name === 'app.search') {
      $scope.addClasses = 'hide-controls';
    } else if (!$stateParams.pageId) {
      $scope.addClasses = 'part-divider-active';
    }

    $scope.changeLanguage = function(langKey) {
      $state.go($state.current.name, angular.extend($state.params, {lang: langKey}), {reload: true});
    };

    $scope.showLang = function(langKey) {
      return $scope.lang !== langKey;
    };

    $scope.$watch('search', function(newVal, oldVal) {
      if (newVal && newVal.value === oldVal.value) {
        return;
      }
      if (newVal && newVal.value.length > 0) {
        $state.go('app.search', {lang: $scope.lang});
      } else if (newVal && typeof newVal.value === 'string') {
        $location.path(SessionData.get().lastUrl);
      }
    }, true);

    $scope.romanize = function(num) {
      if (!+num) {
        return '';
      }
      var digits = String(+num).split(''),
          key = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM',
                 '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC',
                 '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
          roman = '',
          i = 3;
      while (i--) {
        roman = (key[+digits.pop() + (i * 10)] || '') + roman;
      }

      return Array(+digits.join('') + 1).join('M') + roman;
    };

  });

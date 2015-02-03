angular.module('HY')
  .controller('HeaderController', function($state, $stateParams, $scope, $translate, $location, progress, Routes, Search, SessionData, Experience, Utils) {

    $scope.lang = $stateParams.lang;
    $scope.progress = progress;
    $scope.search = Search;
    $scope.subNav = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6'];
    $scope.experience = Experience;
    $scope.romanize = Utils.romanize;

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
    }, true);

    $scope.searchKeyUp = function($event) {
      if ($event.keyCode === 13) {
        // Enter pressed
        $scope.submitSearch();
      } else if ($event.keyCode === 27) {
        // Esc pressed
        $scope.search.value = '';
      }
    };

    $scope.submitSearch = function() {
      $state.go('app.search', {lang: $scope.lang});

    };

  });

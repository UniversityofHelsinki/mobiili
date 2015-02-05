angular.module('HY')
  .controller('InfoController', function($rootScope, $scope, $location, $stateParams, $translate, $http, $q, $window, Utils, SessionData) {

    // Set last url information to localStorage data
    SessionData.set({lastUrl: $location.path()});

    $scope.addToHomescreen = function() {
      $window.addToHomescreen({
        lifespan: 0,
        maxDisplayCount: 0,
        icon: true,
        autostart: false,
        displayPace: 0,
        startDelay: 0
      }).show();
    };

    $rootScope.$on('$translateChangeSuccess', function() {
      $scope.address = $translate.instant('defaults.TRY');
    });

    $scope.subNav = ['part1', 'part2', 'part3', 'part4', 'part5', 'part6'];

    $scope.addressPromise = $q.defer();
    $scope.addressPromise.promise.then(function(result) {
      console.log('geo success', result);
      if (result.fullAddress) {
        $scope.address = result.fullAddress;
      } else {
        $scope.address = Utils.translate('defaults.GENERAL_ERROR');
      }
    }, function(result) {
      console.log('geo fail', result);
      $scope.address = Utils.translate('defaults.GENERAL_ERROR');
    });

    $scope.getLocation = function() {
      $scope.address = Utils.translate('defaults.SEARCHING') + '...';

      var deferred;
      deferred = $q.defer();
      if ($window.navigator && $window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function(position) {
          return deferred.resolve(position.coords);
        }, function(error) {
          return deferred.reject('Unable to get your location');
        });
      } else {
        deferred.reject('Your browser cannot access to your position');
      }
      return deferred.promise;
    };

    $scope.getAddress = function() {
      var deferred = $scope.addressPromise,
          url = '//maps.googleapis.com/maps/api/geocode/json',
          _this = this;

      this.getLocation().then(function(coords) {
        var latlng;
        latlng = [coords.latitude, coords.longitude].join(',');

        return $http.get(url + '?latlng=' + latlng)
          .success(function(data) {
            deferred.resolve(_this.extractAddress(data.results));
          })
          .error(function(status) {
            return deferred.reject('cannot geocode status: ' + status);
          });
      });
      return deferred.promise;
    };

    $scope.extractAddress = function(addresses) {
      var address, component, result, _i, _j, _len, _len1, _ref;
      result = {};
      for (_i = 0, _len = addresses.length; _i < _len; _i++) {
        address = addresses[_i];
        result.fullAddress || (result.fullAddress = address.formatted_address);
        result.coord || (result.coord = [address.geometry.location.ob, address.geometry.location.pb]);
        _ref = address.address_components;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          component = _ref[_j];
          if (component.types[0] === 'route') {
            result.street || (result.street = component.long_name);
          }
          if (component.types[0] === 'locality') {
            result.city || (result.city = component.long_name);
          }
          if (component.types[0] === 'postal_code') {
            result.zip || (result.zip = component.long_name);
          }
          if (component.types[0] === 'country') {
            result.country || (result.country = component.long_name);
          }
        }
      }
      return result;
    };
  });

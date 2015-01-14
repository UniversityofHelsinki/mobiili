angular.module('HY.services', [])
  .factory('Utils', function($filter) {
    var $translate = $filter('translate');
    return {
      translate: function(translationString) {
        return $translate(translationString);
      },
      pairArrays: function(arrays) {
        var len = arrays[0].length,
            arrs = [].concat.apply([], arrays),
            retVal = [];

        for (var i = 0; i < len; i++) {
          retVal.push(_.compact(_.map(arrs, function(val, key) {
            if ((key + len - i) % len === 0) {
              return val;
            }
          })));
        }
        return retVal;
      }
    };
  })
  .factory('SessionData', function() {
    return {
      get: function() {
        return angular.fromJson(localStorage.getItem('hy_mobile') || {});
      },
      set: function(data) {
        var oldData = angular.fromJson(localStorage.getItem('hy_mobile') || {});
        data = angular.extend(oldData, data);
        localStorage.setItem('hy_mobile', angular.toJson(data));
      }
    };
  })

  .factory('Answers', function() {
    return {
      get: function() {
        return angular.fromJson(localStorage.getItem('answers') || {});
      },
      set: function(data) {
        var oldData = angular.fromJson(localStorage.getItem('answers') || {});
        data = angular.extend(oldData, data);
        localStorage.setItem('answers', angular.toJson(data));
      }
    };
  })

  .factory('BrowserUsage', function($http) {
    return {
      get: function() {
        return $http.get('/assets/data/browser_usage.json');
      },
      parse: function(data) {
        var parsed = {};
        parsed.series = [];
        parsed.data = [];

        for (var i = 0; i < data.length; i++) {
          var obj = {x: '', y: []},
              total = 0;
          parsed.data.push(obj);

          angular.forEach(data[i], function(value, key) {
            if (key === 'Date') {
              this.x = value;
            } else {
              this.y.push(value);
              total += value;

              if (i === 0) {
                parsed.series.push(key);
              }
            }
          }, obj);
          obj.y.push(100 - total);
        }
        parsed.series.push('Other');

        return parsed;
      }
    };
  })
  .factory('PlatformComparison', function($http, Utils) {
    return {
      get: function() {
        return $http.get('/assets/data/platform_comparison.json');
      },
      parse: function(data) {
        var parsed = {};
        parsed.labels = [];
        parsed.series = [];
        parsed.data = [];

        for (var i = 0; i < data.length; i++) {
          var values = [];
          parsed.data.push(values);
          angular.forEach(data[i], function(value, key) {
            if (key === 'Date') {
              parsed.labels.push(value);
            } else if (key !== 'Console') {
              values.push(value);

              if (i === 0) {
                parsed.series.push(Utils.translate('defaults.' + key.toUpperCase()));
              }
            }
          });
        }

        parsed.data = Utils.pairArrays(parsed.data);
        return parsed;
      }
    };
  })
  .factory('MobileVsDT', function($filter, Utils) {
    return {
      get: function() {
        return {
          labels: [
            Utils.translate('date.MAY', {value: 2013}),
            Utils.translate('date.MAY', {value: 2014})
          ],
          series: [
            Utils.translate('defaults.MOBILE'),
            Utils.translate('defaults.DESKTOP')
          ],
          data: [
            [50, 50],
            [60, 40]
          ],
          options: {}
        };
      }
    };
  });

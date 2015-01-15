angular.module('HY.services', [])
  .factory('Utils', function($filter) {
    var $translate = $filter('translate');
    return {
      translate: function(translationString, params) {
        return $translate(translationString, params);
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

  .factory('CorrectAnswers', function() {
    var answers = {
      mobileUsage: 0,
      tender: 0,
      needNative: 0,
      securityRisk: 0,
      hyMobileUsage: 20,
      overallMobileUsage: 60,
      mobileGoogleSearch: 60,
      textInputMobile: 0,
      tech: 'HTML5',
      openSource: 'GitHub'
    };

    return {
      list: function() {
        return answers;
      },
      get: function(key) {
        return answers[key];
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
  })
  .factory('MobileUsers', function($filter, Utils) {
    return {
      get: function() {
        return {
          labels: ['%'],
          series: [
            Utils.translate('stats3.DATA1'),
            Utils.translate('stats3.DATA2'),
            Utils.translate('stats3.DATA3'),
            Utils.translate('stats3.DATA4'),
            Utils.translate('stats3.DATA5'),
            Utils.translate('stats3.DATA6'),
            Utils.translate('stats3.DATA7'),
            Utils.translate('stats3.DATA8')
          ],
          data: [
            // [93, 82, 76, 52, 44, 7, 21, 7]
            [93], [82], [76], [52], [44], [7], [21], [7]
          ],
          options: {}
        };
      }
    };
  });

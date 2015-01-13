angular.module('HY.services', [])
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
  .factory('MobileVsDT', function() {
    return {
      get: function() {
        return {
          data: {
            series: ['Mobile', 'Desktop'],
              data: [
                {
                  x: 'May 2013',
                  y: [
                    50,
                    50
                ]},
                {
                  x: 'May 2014',
                  y: [
                    60,
                    40
                  ]
                }
              ]
          },
          chartType: 'bar',
          config: {
            labels: false,
            title: 'Mobile Vs Desktop',
            legend: {
              display: true,
              position: 'left'
            },
            innerRadius: 0
          }
        };
      }
    };
  });

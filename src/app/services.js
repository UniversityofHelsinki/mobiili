angular.module('HY.services', [])
  .factory('Search', function() {
    return {
      value: ''
    };
  })
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

  .factory('Bookmarks', function() {
    return {
      list: function() {
        return angular.fromJson(localStorage.getItem('bookmarks') || []);
      },
      get: function(url) {
        return _.find(angular.fromJson(localStorage.getItem('bookmarks')) || [], {url: url});
      },
      set: function(data) {
        var oldData = angular.fromJson(localStorage.getItem('bookmarks') || []),
            existing = _.find(oldData, {url: data.url});

        if (typeof existing !== 'undefined') {
          // Remove bookmark
          oldData = _.reject(oldData, { url: data.url });
        } else {
          // Add bookmark
          oldData.push(data);
        }

        localStorage.setItem('bookmarks', angular.toJson(oldData));
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
      openSource: 'GitHub',
      mobileUrl:  false,
      useCamera:  true,
      useLocation: true
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
        // parsed.series = [];
        parsed.datasets = [];
        console.log('DATAAAA', data);

        for (var i = 0; i < data.length; i++) {
          console.log('1');
          var values = {data: []};
          parsed.datasets.push(values);
          angular.forEach(data[i], function(value, key) {
            console.log('2');
            if (key === 'Date') {
              parsed.labels.push(value);
            } else if (key !== 'Console') {
              values.data.push(value);

              if (i === 0) {
                // parsed.series.push(Utils.translate('defaults.' + key.toUpperCase()));
                values.label = Utils.translate('defaults.' + key.toUpperCase());
              }
            }
          });
        }

        // TODO Now this is broken with the new chart plugin...
        // parsed.data = Utils.pairArrays(parsed.datasets.data);
        parsed.data = parsed.datasets.data;
        console.log('PARSED', parsed);
        return parsed;
      }
    };
  })
  .factory('MobileVsDT', function(Utils) {
    return {
      get: function() {
        return {
          labels: [
            Utils.translate('date.MAY', {value: 2013}),
            Utils.translate('date.MAY', {value: 2014})
          ],
          datasets: [
            {
              label: Utils.translate('defaults.MOBILE'),
              fillColor: 'rgba(220,220,220,0.2)',
              strokeColor: 'rgba(220,220,220,1)',
              pointColor: 'rgba(220,220,220,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(220,220,220,1)',
              data: [50, 50]
            },
            {
              label: Utils.translate('defaults.DESKTOP'),
              fillColor: 'rgba(151,187,205,0.2)',
              strokeColor: 'rgba(151,187,205,1)',
              pointColor: 'rgba(151,187,205,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)',
              data: [60, 40]
            }
          ]
        };
      }
    };
  })
  .factory('MobileUsers', function(Utils) {
    return {
      get: function() {
        return {
          labels: ['%'],
          datasets: [
            {
              label: Utils.translate('stats3.DATA1'),
              data:[93]
            },
            {
              label: Utils.translate('stats3.DATA2'),
              data:[82]
            },
            {
              label: Utils.translate('stats3.DATA3'),
              data:[76]
            },
            {
              label: Utils.translate('stats3.DATA4'),
              data:[52]
            },
            {
              label: Utils.translate('stats3.DATA5'),
              data:[44]
            },
            {
              label: Utils.translate('stats3.DATA6'),
              data:[7]
            },
            {
              label: Utils.translate('stats3.DATA7'),
              data:[21]
            },
            {
              label: Utils.translate('stats3.DATA8'),
              data:[7]
            }
          ]
        };
      }
    };
  })
  .factory('MobilePlatforms', function() {
    return {
      get: function() {
        return {
          labels: [
            'Android',
            'iOS',
            'Windows Phone'
          ],
          datasets: [
            {
              data: [55.4, 32.9, 11.7]
            }
          ]
        };
      }
    };
  })
  .factory('AppDownloads', function(Utils) {
    return {
      get: function() {
        return {
          labels: [
            Utils.translate('appDownloads.DOWNLOADS', {value: 0}),
            Utils.translate('appDownloads.DOWNLOADS', {value: 1}),
            Utils.translate('appDownloads.DOWNLOADS', {value: 2}),
            Utils.translate('appDownloads.DOWNLOADS', {value: 3}),
            Utils.translate('appDownloads.DOWNLOADS', {value: 4}),
            Utils.translate('appDownloads.DOWNLOADS', {value: '5-7'}),
            Utils.translate('appDownloads.DOWNLOADS', {value: '8+'})
          ],
          datasets: [
            {
              data: [65.5, 8.4, 8.9, 6.2, 3.7, 4.8, 2.4]
            }
          ]
        };
      }
    };
  })
  .factory('Routes', function(translations) {
    return {
      getIndexedData: function(lang) {
        console.log('translations', lang, translations)
        var routes = this.get();
        // Index content (translations) with routes for search filter
        return _.flatten(_.map(routes, function(part) {
          // Reject init views = part dividers
          return _.map(_.reject(part.routes, {id: 'init'}), function(route) {
            return {
              id: '/' + part.id + '/' + route.type + '/' + route.id,
              content: translations[lang][route.translationNamespace],
              url: '/' + part.id + '/' + route.type + '/' + route.id
            };
          });
        }));
      },
      get: function() {
        return [
          {
            id: 'prelude',
            routes: [
              {id: 'init', addClasses: 'part-divider-view'},
              {id: 'index', type: 'info', translationNamespace: 'index'},
              {id: 'warmup', type: 'quiz', translationNamespace: 'warmup'}
            ]
          },
          {
            id: 'part1',
            routes: [
              {id: 'init', addClasses: 'part-divider-view'},
              {id: 'questions', type: 'quiz', translationNamespace: 'questions1'},
              {id: 'stats1', type: 'chart', translationNamespace: 'stats1'},
              {id: 'stats2', type: 'chart', translationNamespace: 'stats2'},
              {id: 'stats3', type: 'chart', translationNamespace: 'stats3'},
              {id: 'stats4', type: 'chart', translationNamespace: 'stats4'},
              {id: 'opportunities', type: 'info', translationNamespace: 'opportunities'},
              {id: 'problem', type: 'info', translationNamespace: 'problem'},
              {id: 'summary', type: 'quiz', translationNamespace: 'summary1'}
            ]
          },
          {
            id: 'part2',
            routes: [
              {id: 'init', type: '', addClasses: 'part-divider-view'},
              {id: 'questions', type: 'quiz', translationNamespace: 'questions2'},
              {id: 'device-independency', type: 'info', translationNamespace: 'deviceIndependency'},
              {id: 'future-predict', type: 'chart', translationNamespace: 'futurePredict'},
              {id: 'standards', type: 'chart', translationNamespace: 'standards'},
              {id: 'open-principals', type: 'info', translationNamespace: 'openPrincipals'},
              {id: 'open-data', type: 'info', translationNamespace: 'openData'},
              {id: 'open-source', type: 'info', translationNamespace: 'openSource'},
              {id: 'open-source2', type: 'info', translationNamespace: 'openSource2'}
            ]
          },
          {
            id: 'part3',
            routes: [
              {id: 'init', addClasses: 'part-divider-view'},
              {id: 'mobile-friendly', type: 'info', translationNamespace: 'mobileFriendly'}
            ]
          },
          {
            id: 'part4',
            routes: [
              {id: 'init', addClasses: 'part-divider-view'},
              {id: 'questions', type: 'quiz', translationNamespace: 'questions3'},
              {id: 'mobile-web', type: 'info', translationNamespace: 'mobileWeb1'},
              {id: 'mobile-web2', type: 'info', translationNamespace: 'mobileWeb2'},
              {id: 'features', type: 'info', translationNamespace: 'features'}
            ]
          },
          {
            id: 'part5',
            routes: [
              {id: 'init', addClasses: 'part-divider-view'},
              {id: 'questions', type: 'quiz', transNS: 'questions1', translationNamespace: 'questions4'},
              {id: 'native-hybrid', type: 'info', translationNamespace: 'nativeHybrid'},
              {id: 'comparison', type: 'info', translationNamespace: 'comparison'},
              {id: 'stats', type: 'chart', translationNamespace: 'stats5'},
              {id: 'app-strength', type: 'info', translationNamespace: 'appStrength'},
              {id: 'apps', type: 'info', translationNamespace: ''},
              {id: 'app-downloads', type: 'chart', translationNamespace: 'appDownloads'}
            ]
          }
        ];
      }
    };
  });

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
      },
      applyChartColors: function(data) {
        var colors = [
          '17,90,140',
          '2,180,158',
          '242,233,129',
          '45,193,212',
          '251,211,128',
          '246,201,205',
          '250,231,211',
          '243,117,96',
          '225,66,152',
          '189,54,46'
        ];

        angular.forEach(data.data || data.datasets, function(elem, index) {
          angular.extend(elem, {
            // Bar
            fillColor: 'rgba(' + colors[index] + ',0.2)',
            strokeColor: 'rgba(' + colors[index] + ',1)',
            highlightFill: 'rgba(' + colors[index] + ',0.75)',
            highlightStroke: 'rgba(' + colors[index] + ',1)',

            // Line
            pointColor: 'rgba(' + colors[index] + ',1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(' + colors[index] + ',1)',

            // Pie and Doughnut
            color: 'rgba(' + colors[index] + ',1)',
            highlight: 'rgba(' + colors[index] + ',1)'
          });
        });

        return data;
      },
      parseJsonData: function(data) {
        var parsed = {};
        parsed.labels = [];
        parsed.datasets = [];

        for (var i = 0; i < data.length; i++) {
          angular.forEach(data[i], function(value, key) {
            if (key === 'Date') {
              parsed.labels.push(value);
            } else if (key !== 'Console') {
              var obj = _.find(parsed.datasets, {label: key});
              if (obj) {
                obj.data.push(value);
              } else {
                parsed.datasets.push({
                  label: key,
                  data: [value]
                });
              }
            }
          });
        }

        parsed.data = parsed.datasets.data;
        return this.applyChartColors(parsed);
      }
    };
  })
  .factory('SessionData', function() {
    return {
      get: function() {
        return angular.fromJson(localStorage.getItem('hy_mobile') || {});
      },
      set: function(data) {
        var oldData = this.get();
        data = angular.extend(oldData, data);
        localStorage.setItem('hy_mobile', angular.toJson(data));
      }
    };
  })
  .factory('Experience', function(Routes) {
    return {
      value: function() {
        return this.getCount();
      },
      total: function() {
        return this.getTotal();
      },
      level: function() {
        var p = this.value() / this.total();
        if (p >= 0.9) {
          return 'GURU';
        } else if (p >= 0.6) {
          return 'EXPERT';
        } else if (p >= 0.4) {
          return 'ADVANCED';
        } else if (p >= 0.2) {
          return 'INTERMEDIATE';
        } else {
          return 'BEGINNER';
        }
      },
      get: function() {
        return angular.fromJson(localStorage.getItem('visited_urls') || []);
      },
      set: function(url) {
        var oldData = this.get();
        if (oldData.indexOf(url) === -1) {
          oldData.push(url);
          localStorage.setItem('visited_urls', angular.toJson(oldData));
        }
      },
      getCount: function() {
        return this.get().length;
      },
      getTotal: function() {
        return _.flatten(Routes.get(), 'routes').length;
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
        var oldData = this.list(),
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
        var oldData = this.get();
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
      }
    };
  })
  .factory('PlatformComparison', function($http) {
    return {
      get: function() {
        return $http.get('/assets/data/platform_comparison.json');
      }
    };
  })
  .factory('MobileVsDT', function(Utils) {
    return {
      get: function() {
        return Utils.applyChartColors({
          labels: [
            Utils.translate('date.MAY', {value: 2013}),
            Utils.translate('date.MAY', {value: 2014})
          ],
          datasets: [
            {
              label: Utils.translate('defaults.MOBILE'),
              data: [50, 50]
            },
            {
              label: Utils.translate('defaults.DESKTOP'),
              data: [60, 40]
            }
          ]
        });
      }
    };
  })
  .factory('MobileUsers', function(Utils) {
    return {
      get: function() {
        return Utils.applyChartColors({
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
        });
      }
    };
  })
  .factory('MobilePlatforms', function(Utils) {
    return {
      getBars: function() {
        return Utils.applyChartColors({
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
        });
      },
      getPie: function() {
        return Utils.applyChartColors({
          data: [
            {
              value: 55.4,
              label: 'Android'
            },
            {
              value: 32.9,
              label: 'iOS'
            },
            {
              value: 11.7,
              label: 'Windows Phone'
            }
          ]
        });
      }
    };
  })
  .factory('AppDownloads', function(Utils) {
    return {
      get: function() {
        return Utils.applyChartColors({
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
        });
      }
    };
  })
  .factory('Routes', function($http) {
    return {
      translations: {},
      loadTranslations: function(lang) {
        var _this = this;
        return $http.get('/assets/translations/locale-' + lang + '.json').success(function(data) {
          _this.translations = data;
        });
      },
      getIndexedData: function() {
        var routes = this.get(),
            translations = this.translations;

        // Index content (translations) with routes for search filter
        return _.flatten(_.map(routes, function(part) {
          // Reject init views = part dividers
          return _.map(_.reject(part.routes, {id: 'init'}), function(route) {
            return {
              id: '/' + part.id + '/' + route.type + '/' + route.id,
              content: translations[route.translationNamespace],
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

angular.module('HY', [
    'ngResource',
    'ngRoute',
    'ui.router',
    'templates',
    'mm.foundation',
    'HY.services',
    // 'angularCharts',
    'pascalprecht.translate',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

    var sessionData = angular.fromJson(localStorage.getItem('hy_mobile') || {}),
        lastUrl = sessionData.lastUrl || '/fi/index',
        pageCounts = [3, 3];

    function getNavView(obj) {
      return {
        templateUrl: 'assets/views/navi.html',
        controller: 'NavigationController',
        resolve: {
          data: function() {
            return obj;
          }
        }
      };
    }

    $urlRouterProvider.otherwise(lastUrl);

    $stateProvider
      .state('app', {
        template: '<ui-view />',
        controller: 'MainController',
        abstract: true
      })
      .state('app.index', {
        url: '/:lang/index',
        views: {
          'content@': {
            templateUrl: 'assets/views/index.html',
            controller: 'QuizController'
          },
          'nav@': getNavView({
            page: 1,
            pageCount: pageCounts[0],
            navigation: {
              forward: {
                text: 'defaults.START',
                url: 'warmup'
              }
            }
          })
        }
      })
      .state('app.warmup', {
        url: '/:lang/warmup',
        views: {
          'content@': {
            templateUrl: 'assets/views/warmup.html',
            controller: 'QuizController'
          },
          'nav@': getNavView({
            page: 2,
            pageCount: pageCounts[0],
            navigation: {
              forward: {
                text: 'defaults.NEXT',
                url: 'browser_usage'
              },
              back: {
                text: 'defaults.PREVIOUS',
                url: 'index'
              }
            }
          })
        }
      })
      .state('app.browser_usage', {
        url: '/:lang/browser_usage',
        views: {
          'content@': {
            templateUrl: 'assets/views/browser-usage.html',
            controller: 'BrowserUsageController'
          },
          'nav@': getNavView({
            page: 3,
            pageCount: pageCounts[0],
            navigation: {
              forward: {
                text: 'defaults.NEXT',
                url: 'part1'
              },
              back: {
                text: 'defaults.PREVIOUS',
                url: 'warmup'
              }
            }
          })
        }
      })
      .state('app.part1', {
        url: '/:lang/part1',
        views: {
          'content@': {
            templateUrl: 'assets/views/part-divider.html',
            controller: 'PartDividerController',
            resolve: {
              data: function() {
                return {
                  text: 'parts.1'
                };
              }
            }
          },
          'nav@': getNavView({
            addClasses: 'bottom',
            navigation: {
              forward: {
                text: 'defaults.NEXT',
                url: 'questions1'
              },
              back: {
                text: 'defaults.PREVIOUS',
                url: 'browser_usage'
              }
            }
          })
        }
      })
      .state('app.questions1', {
        url: '/:lang/questions1',
        views: {
          'content@': {
            templateUrl: 'assets/views/questions1.html',
            controller: 'QuizController'
          },
          'nav@': getNavView({
            page: 1,
            pageCount: pageCounts[1],
            navigation: {
              forward: {
                text: 'defaults.NEXT',
                url: 'stats1'
              },
              back: {
                text: 'defaults.PREVIOUS',
                url: 'part1'
              }
            }
          })
        }
      })
      .state('app.stats1', {
        url: '/:lang/stats1',
        views: {
          'content@': {
            templateUrl: 'assets/views/stats1.html',
            controller: 'ChartController'
          },
          'nav@': getNavView({
            page: 2,
            pageCount: pageCounts[1],
            navigation: {
              forward: {
                text: 'defaults.NEXT',
                url: 'stats2'
              },
              back: {
                text: 'defaults.PREVIOUS',
                url: 'questions1'
              }
            }
          })
        }
      })
      .state('app.stats2', {
        url: '/:lang/stats2',
        views: {
          'content@': {
            templateUrl: 'assets/views/stats2.html',
            controller: 'DefaultController'
          },
          'nav@': getNavView({
            page: 3,
            pageCount: pageCounts[1],
            navigation: {
              forward: {
                text: 'defaults.NEXT',
                url: 'stats3'
              },
              back: {
                text: 'defaults.PREVIOUS',
                url: 'stats1'
              }
            }
          })
        }
      });

    $locationProvider.html5Mode(false);

    $translateProvider
      .translations('fi', {
        defaults: {
          START: 'Aloita',
          NEXT: 'Seuraava',
          PREVIOUS: 'Edellinen',
          YES: 'Kyllä',
          NO: 'Ei',
          MOBILE: 'Mobiili',
          DESKTOP: 'Työasema'
        },

        parts: {
          1: 'I. Näin verkkopalveluja ja Internettiä käytetään vuonna 2015'
        },

        date: {
          MAY: 'Maaliskuu {{value}}'
        },

        charts: {
          MOBILE_VS_DT: 'Mobile Vs Desktop'
        },

        index: {
          HEADER: 'Tulevaisuuden kestäviä verkkopalveluja',
          1: 'Tässä verkkosovelluksessa kerromme mitä modernilta verkkopalvelulta vaaditaan ja mitä hankintoja suunnitellessa pitää tietää.',
          2: 'Keskitymme kahteen periaatteeseen: päätelaiteriippumattomuuteen ja avoimuuteen. ',
          3: 'Aloitamme siitä, miksi nämä periaatteet ovat ajankohtaisia juuri nyt.',
          4: 'Kun suunnittelet verkkopalveluhankintaa, muista ottaa huomioon myös luotettavuus, suorituskyky, tietoturva ja käytettävyys.'
        },

        warmup: {
          HEADER: 'Tulevaisuuden kestäviä verkkopalveluja',
          1: 'Mitä modernilta verkkopalvelulta vaaditaan? Mitä hankintoja suunnitellessa pitää tietää?',
          2: 'Mitä mieltä sinä olet?',
          Q1: 'Pyydän ensimmäiseksi tarjouspyynnön tutulta konsultilta',
          Q2: 'Tarvitsen natiiviapplikaation, jotta voin hyödyntää paikkatietoja',
          Q3: 'Palveluni tietojen jakaminen ulkopuolisille on aina tietoturvariski'
        },

        questions1: {
          HEADER: 'Arvioi',
          1: 'Kuinka suuri osa HY ulkoisen verkkosivuston lukijoista käyttää mobiilia?',
          2: 'Kuinka suuri osa vierailijoista käytti mobiililaitetta suosituissa suomalaisissa verkkopalveluissa vuonna 2014?',
          3: 'Kuinka suuri osa opiskelijoiden ikäluokasta (18-25v) teki päivittäin mobiilista Google-hakuja vuonna 2013?'
        },

        stats1: {
          HEADER: 'Internet muuttui mobiiliksi 2014',
          1: 'Vuodesta 2014 lähtien pohjois-amerikkalaiset käyttivät enemmän aikaa netissä mobiililaitteilla kuin desktop laitteilla (läppärit ja työasemat).',
          2: 'Erityisesti mobiilisovellusten parissa vietettiin aikaa, mutta selain oli tärkeä verkko-ostamisen kannalta.'
        },

        stats2: {
          HEADER: 'Mobiilikäyttö tulee ohittamaan desktopin myös Suomessa',
          1: 'Jo nyt merkittävillä kotimaisilla sivustoilla 60% käyttäjistä selaa mobiililaitteella.',
          2: 'Mobiililaitteita käytetään yhä enemmän myös silloin kun desktop on saatavilla'
        }
      })

      .translations('en', {

      });
    $translateProvider.preferredLanguage('fi');

  });

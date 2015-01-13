angular.module('HY', [
    'ngResource',
    'ngRoute',
    'ui.router',
    'templates',
    'mm.foundation',
    'HY.services',
    'angularCharts',
    'pascalprecht.translate',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

    var sessionData = angular.fromJson(localStorage.getItem('hy_mobile') || {}),
        lastUrl = sessionData.lastUrl || '/fi/index',
        pageCounts = [3, 3];

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
                text: 'START',
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
                text: 'NEXT',
                url: 'browser_usage'
              },
              back: {
                text: 'PREVIOUS',
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
                text: 'Seuraava',
                url: 'part1'
              },
              back: {
                text: 'Takaisin',
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
                  text: 'PART_1'
                };
              }
            }
          },
          'nav@': getNavView({
            addClasses: 'bottom',
            navigation: {
              forward: {
                text: 'Seuraava',
                url: 'questions1'
              },
              back: {
                text: 'Takaisin',
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
                text: 'Seuraava',
                url: 'stats1'
              },
              back: {
                text: 'Takaisin',
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
                text: 'Seuraava',
                url: 'stats2'
              },
              back: {
                text: 'Takaisin',
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
                text: 'Seuraava',
                url: 'stats3'
              },
              back: {
                text: 'Takaisin',
                url: 'stats1'
              }
            }
          })
        }
      });

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

    $locationProvider.html5Mode(false);

    $translateProvider
      .translations('fi', {
        // Defaults
        START: 'Aloita',
        NEXT: 'Seuraava',
        PREVIOUS: 'Edellinen',
        YES: 'Kyllä',
        NO: 'Ei',

        // Index
        INDEX_HEADER: 'Tulevaisuuden kestäviä verkkopalveluja',
        INDEX_1: 'Tässä verkkosovelluksessa kerromme mitä modernilta verkkopalvelulta vaaditaan ja mitä hankintoja suunnitellessa pitää tietää.',
        INDEX_2: 'Keskitymme kahteen periaatteeseen: päätelaiteriippumattomuuteen ja avoimuuteen. ',
        INDEX_3: 'Aloitamme siitä, miksi nämä periaatteet ovat ajankohtaisia juuri nyt.',
        INDEX_4: 'Kun suunnittelet verkkopalveluhankintaa, muista ottaa huomioon myös luotettavuus, suorituskyky, tietoturva ja käytettävyys.',

        // Warmup
        WARMUP_HEADER: 'Tulevaisuuden kestäviä verkkopalveluja',
        WARMUP_1: 'Mitä modernilta verkkopalvelulta vaaditaan? Mitä hankintoja suunnitellessa pitää tietää?',
        WARMUP_2: 'Mitä mieltä sinä olet?',
        WARMUP_Q1: 'Pyydän ensimmäiseksi tarjouspyynnön tutulta konsultilta',
        WARMUP_Q2: 'Tarvitsen natiiviapplikaation, jotta voin hyödyntää paikkatietoja',
        WARMUP_Q3: 'Palveluni tietojen jakaminen ulkopuolisille on aina tietoturvariski',

        QUESTIONS1: 'Arvioi',
        QUESTIONS1_1: 'Kuinka suuri osa HY ulkoisen verkkosivuston lukijoista käyttää mobiilia?',
        QUESTIONS1_2: 'Kuinka suuri osa vierailijoista käytti mobiililaitetta suosituissa suomalaisissa verkkopalveluissa vuonna 2014?',
        QUESTIONS1_3: 'Kuinka suuri osa opiskelijoiden ikäluokasta (18-25v) teki päivittäin mobiilista Google-hakuja vuonna 2013?',

        STATS1_HEADER: 'Internet muuttui mobiiliksi 2014',
        STATS1_1: 'Vuodesta 2014 lähtien pohjois-amerikkalaiset käyttivät enemmän aikaa netissä mobiililaitteilla kuin desktop laitteilla (läppärit ja työasemat).',
        STATS1_2: 'Erityisesti mobiilisovellusten parissa vietettiin aikaa, mutta selain oli tärkeä verkko-ostamisen kannalta.',

        STATS2_HEADER: 'Mobiilikäyttö tulee ohittamaan desktopin myös Suomessa',
        STATS2_1: 'Jo nyt merkittävillä kotimaisilla sivustoilla 60% käyttäjistä selaa mobiililaitteella.',
        STATS2_2: 'Mobiililaitteita käytetään yhä enemmän myös silloin kun desktop on saatavilla.',

        // Part headers
        PART_1: 'I. Näin verkkopalveluja ja Internettiä käytetään vuonna 2015'
      })

      .translations('en', {
        WELCOME_TEXT: 'Welcome to Helsinki University mobile strategy.'
      });
    $translateProvider.preferredLanguage('fi');

  });

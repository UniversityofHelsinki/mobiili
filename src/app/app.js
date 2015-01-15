angular.module('HY', [
    'ngResource',
    'ui.router',
    'templates',
    'mm.foundation',
    'HY.services',
    'chart.js',
    'pascalprecht.translate',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

    var sessionData = angular.fromJson(localStorage.getItem('hy_mobile') || {}),
        lastUrl = sessionData.lastUrl || '/fi/index';

    $urlRouterProvider.otherwise('notFound');

    $stateProvider
      .state('app', {
        template: '<ui-view />',
        controller: 'MainController',
        abstract: true
      })
      .state('app.info', {
        url: '/:lang/:partId/info/:pageId',
        views: {
          'content@': {
            templateUrl: function($stateParams) {
              return 'assets/views/' + $stateParams.pageId + '.html';
            },
            controller: 'InfoController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      })
      .state('app.chart', {
        url: '/:lang/:partId/chart/:pageId',
        views: {
          'content@': {
            templateUrl: function($stateParams) {
              return 'assets/views/' + $stateParams.pageId + '.html';
            },
            controller: 'ChartController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      })
      .state('app.quiz', {
        url: '/:lang/:partId/quiz/:pageId',
        views: {
          'content@': {
            templateUrl: function($stateParams) {
              return 'assets/views/' + $stateParams.pageId + '.html';
            },
            controller: 'QuizController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      })
      .state('app.Part', {
        url: '/:lang/:partId',
        views: {
          'content@': {
            templateUrl: 'assets/views/part-divider.html',
            controller: 'PartDividerController'
          },
          'nav@': {
            templateUrl: 'assets/views/navi.html',
            controller: 'NavigationController'
          }
        }
      })
      .state('app.notFound', {
        url: 'notFound',
        views: {
          'content@': {
            templateUrl: 'assets/views/not-found.html',
            controller: 'MainController'
          }
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
          DESKTOP: 'Työasema',
          TABLET: 'Tabletti',
          ANSWER: 'Vastaus',
          CORRECT: 'Oikein',
          INCORRECT: 'Väärin'
        },

        parts: {
          PART1: 'I. Näin verkkopalveluja ja Internettiä käytetään vuonna 2015'
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
        },

        stats3: {
          HEADER: 'Suomalaisista opiskelijoista vähintään 76% on jo mobiilissa'
        },

        stats4: {
          HEADER: 'HY verkkopalvelujen mobiilikäyttö jäi joulukuussa 2014 alle 20%:n',
          1: 'Julkinen verkkosivusto 21% mobiili (puhelin ja tablet)',
          2: 'Flamma 7% mobiili, näistä valtaosa tablet-käyttäjiä'
        },

        opportunities: {
          HEADER: 'Mobiili on mahdollisuus koska',
          1: 'Mobiililaite on aina mukana',
          2: 'Mobiililaitteissa on enemmän ominaisuuksia kuin desktop-laitteissa (GPS, kamera, kiihtyvyysanturit)',
          3: 'HY:n uusien ja uudistuvien palveluiden käyttöä voidaan parhaiten lisätä huomioimalla myös mobiilikäyttäjät'
        },

        problem: {
          HEADER: 'Ongelma on selvä. Monet sivustot eivät toimi mobiilissa koska ne on suunniteltu desktopille',
          1: 'Mobiililaitteissa on pienempi ja usein pystysuuntainen näyttö',
          2: 'Mobiililaitteilla tekstinsyöttö on kömpelömpää',
          3: 'Mobiililaitteilla skrollailu voi olla helpompaa ja tutumpaa'
        },

        summary1: {
          HEADER: 'Yhteenveto'
        }

      })

      .translations('en', {

      });
    $translateProvider.preferredLanguage('fi');

  });

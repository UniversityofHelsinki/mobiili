angular.module('HY')
  .controller('ChartController', function($scope, $controller, $translate, $stateParams, MobileVsDT, PlatformComparison, MobileUsers, MobileUsersHy, MobilePlatforms, AppDownloads, Search, Utils) {

    // Get search state for view visibility
    $scope.search = Search;

    // Use promise to get correct languges to charts because of asynchronous translation load
    $translate.use($stateParams.lang).then(function() {
      $scope.mobileUsers = MobileUsers.get();
      $scope.MobileUsersHy = MobileUsersHy.get();
      $scope.mobilePlatforms = MobilePlatforms.getPie();
      $scope.appDownloads = AppDownloads.get();

      PlatformComparison.get().then(function(xhr) {
        $scope.platformComparison = Utils.parseJsonData(xhr.data);
      });
      MobileVsDT.get().then(function(xhr) {
        $scope.mobileVsDt = Utils.parseJsonData(xhr.data);
      });
    });

    // Chart.js Options
    $scope.options =  {

      // Sets the chart to be responsive
      responsive: true,
      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,
      //String - Colour of the grid lines
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      //Number - Width of the grid lines
      scaleGridLineWidth: 1,
      //Boolean - Whether the line is curved between points
      bezierCurve: true,
      //Number - Tension of the bezier curve between points
      bezierCurveTension: 0.4,
      //Boolean - Whether to show a dot for each point
      pointDot: true,
      //Number - Radius of each point dot in pixels
      pointDotRadius: 4,
      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,
      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,
      //Boolean - Whether to show a stroke for datasets
      datasetStroke: true,
      //Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,
      //Boolean - Whether to fill the dataset with a colour
      datasetFill: true,
      // Function - on animation progress
      // onAnimationProgress: function(){},
      // Function - on animation complete
      // onAnimationComplete: function(){},
      //String - A legend template
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };

    $scope.pieOptions = angular.extend(_.clone($scope.options), {
      legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    });

  });

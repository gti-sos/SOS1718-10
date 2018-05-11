/*global angular*/
/*global Highcharts*/
/*global google*/

angular.module("MotogpStatsApp").controller("Graph2Ctrl", ["$scope", "$http", function($scope, $http) {
  console.log("graph2 Ctrl initialized!");

  $http.get("/api/v1/motogp-stats").then(function(response) {

    var com;
    var pilot;
    var googleChartData = [
      ["Region", "Pilots"]
    ];
    for (var i = 0; i < response.data.length; i++) {
      com = response.data[i].country;
      pilot = response.data[i].pilot;
      googleChartData.push([com, pilot]);
    }
    console.log(googleChartData);
    google.charts.load('current', {
      'packages': ['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable(googleChartData);

      var options = {};

      var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

      chart.draw(data, options);
    }
  });


}]);

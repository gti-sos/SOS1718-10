angular.module("Principal").

controller("ApiExterna2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
  console.log("Controller initialized (External Api 2)");

  $scope.data = {};
  var dataCache = {};
  $scope.id = [];
  $scope.year = [];
  $scope.datos = [];
  $scope.datos2 = [];



  $http.get("/api/v1/builders").then(function(response) {

    dataBuilders = response.data;
    $scope.dataBuilders = dataBuilders;


    for (var i = 0; i < response.data.length; i++) {
      $scope.year.push(Number($scope.dataBuilders[i].year));
    }
    var api_key = '5d196966459f4f5f8f0b362d8535a0da';
    var api_url = "https://api.opencagedata.com/geocode/v1/json?q=41.40139%2C2.12870&pretty=1&key=" + api_key;
    $http.get(api_url).then(function(response) {

      dataCache = response.data;
      $scope.data = dataCache;



      for (var i = 0; i < $scope.dataBuilders.length; i++) {
        var ar = [];
        console.log($scope.data);
        $scope.datos2.push({ "year": $scope.year[i], "name": $scope.data.documentation });


      }






      chart = AmCharts.makeChart("api-externa2", {
        "type": "serial",
        "theme": "light",
        "dataProvider": $scope.datos2,
        "valueAxes": [{
          "gridColor": "#FFFFFF",
          "gridAlpha": 0.2,
          "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
          "balloonText": "[[category]]: <b>[[value]]</b>",
          "fillAlphas": 0.8,
          "lineAlpha": 0.2,
          "type": "column",
          "valueField": "year"
        }],
        "chartCursor": {
          "categoryBalloonEnabled": false,
          "cursorAlpha": 0,
          "zoomable": false
        },
        "categoryField": "name",
        "categoryAxis": {
          "gridPosition": "start",
          "gridAlpha": 0,
          "tickPosition": "start",
          "tickLength": 20
        },
        "export": {
          "enabled": true
        }

      });
    });
  });


}]);

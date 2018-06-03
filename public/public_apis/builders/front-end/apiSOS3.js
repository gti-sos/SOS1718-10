angular.module("Principal").

controller("ApiSOS3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
  console.log("Controller initialized (Internal Api 3)");

  $http.get("/api/v1/builders").then(function(responseBuilders) {

    var builders = responseBuilders.data.map(function(d) { return d.builder })

    $http.get("https://sos1718-11.herokuapp.com/api/v2/basketball-stats").then(function(responseBasket) {

      var score = responseBasket.data.map(function(d) { return parseInt(d.first) })

      console.log("Score: " + score)

      var datos = []

      for (var z = 0; z < builders.length; z++) {
        var object = {};
        object["builder"] = builders[z];
        object["value"] = score[z];
        datos.push(object);
      }
      console.log("Datos: " + datos);

      var chart = AmCharts.makeChart("apiSOS3", {
        "type": "radar",
        "theme": "light",
        "dataProvider": datos,
        "valueAxes": [{
          "gridType": "circles",
          "minimum": 0,
          "fillColor": "#FFFFFF",
        }],
        "startDuration": 1,
        "graphs": [{
          "balloonText": "[[category]]: [[value]] points",
          "bullet": "round",
          "fillAlphas": 0.3,
          "valueField": "value"
        }],
        "categoryField": "builder",
        "export": {
          "enabled": true
        }
      });

    });
  });
}]);

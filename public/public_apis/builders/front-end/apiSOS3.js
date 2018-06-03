angular.module("Principal").

controller("ApiSOS3Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
  console.log("Controller initialized (Internal Api 3)");

  $http.get("/api/v1/builders").then(function(responseBuilders) {

    var builders = responseBuilders.data.map(function(d) { return d.builder })

    $http.get("https://sos1718-11.herokuapp.com/api/v2/basketball-stats").then(function(responseBasket) {

      var score = responseBasket.data.map(function(d) { return parseInt(d.first) })

      console.log("idPlayers: " + score)

      var datos = []

      for (var z = 0; z < builders.length; z++) {
        var ar = [];
        ar.push(builders[z]);
        ar.push(score[z]);
        datos.push(ar);
      }
      console.log("Datos: " + datos);

      var chart = AmCharts.makeChart("chartdiv", {
        "type": "radar",
        "theme": "light",
        "dataProvider": [{
          "direction": "N",
          "value": 8
        }, {
          "direction": "NE",
          "value": 9
        }, {
          "direction": "E",
          "value": 4.5
        }, {
          "direction": "SE",
          "value": 3.5
        }, {
          "direction": "S",
          "value": 9.2
        }, {
          "direction": "SW",
          "value": 8.4
        }, {
          "direction": "W",
          "value": 11.1
        }, {
          "direction": "NW",
          "value": 10
        }],
        "valueAxes": [{
          "gridType": "circles",
          "minimum": 0,
          "autoGridCount": false,
          "axisAlpha": 0.2,
          "fillAlpha": 0.05,
          "fillColor": "#FFFFFF",
          "gridAlpha": 0.08,
          "guides": [{
            "angle": 225,
            "fillAlpha": 0.3,
            "fillColor": "#0066CC",
            "tickLength": 0,
            "toAngle": 315,
            "toValue": 14,
            "value": 0,
            "lineAlpha": 0,

          }, {
            "angle": 45,
            "fillAlpha": 0.3,
            "fillColor": "#CC3333",
            "tickLength": 0,
            "toAngle": 135,
            "toValue": 14,
            "value": 0,
            "lineAlpha": 0,
          }],
          "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
          "balloonText": "[[category]]: [[value]] m/s",
          "bullet": "round",
          "fillAlphas": 0.3,
          "valueField": "value"
        }],
        "categoryField": "direction",
        "export": {
          "enabled": true
        }
      });

    });
  });
}]);

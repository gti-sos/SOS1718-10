angular.module("Principal").

controller("ApiExterna1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
                console.log("Controller initialized (External Api 1)");

                $http.get("/api/v1/builders").then(function(responseBuilders) {

                            var builders = responseBuilders.data.map(function(d) { return d.builder })
                            var poles = responseBuilders.data.map(function(d) { return d.pole })

                            $http.get("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Arsenal").then(function(response) {

                                        var idPlayerManager = response.data.map(function(d) { return d.idPlayerManager })
                                        var players = response.data.map(function(d) { return d.strPlayer })
                                        var datos = []



                                        for (var j = 0; j < builders.length; j++) {
                                            var ar = [];
                                            ar.push(builders[j]);
                                            ar.poles(poles[j]);
                                            datos.push(ar);
                                        }
                                        for (var z = 0; z < players.length; j++) {
                                            var ar = [];
                                            ar.push(players[j]);
                                            ar.poles(idPlayerManager[j]);
                                            datos.push(ar);
                                        }


      google.charts.load("current", {packages:["corechart"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable(datos);

        var options = {
          title: 'Lengths of dinosaurs, in meters',
          legend: { position: 'none' },
        };

        var chart = new google.visualization.Histogram(document.getElementById('api-externa4'));
        chart.draw(data, options);
      }
        });
    });
}]);

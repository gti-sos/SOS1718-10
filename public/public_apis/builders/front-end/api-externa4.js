angular.module("Principal").

controller("ApiExterna4Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
console.log("Controller initialized (External Api 1)");

$http.get("/api/v1/builders").then(function(responseBuilders) {

  var builders = responseBuilders.data.map(function(d) { return d.builder })

  $http.get("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Arsenal").then(function(responseArsenal) {

      var idPlayers = []
      for (var e = 0; e < responseArsenal.data['player'].length; e++) {
        idPlayers.push(responseArsenal.data['player'].idPlayerManager)
      }
      
      console.log("idPlayers: " + idPlayers[0])
      
      var datos = []

      for (var z = 0; z < builders.length; z++) {
        var ar = [];
        ar.push(builders[z]);
        ar.push(idPlayers[z]);
        datos.push(ar);
      }
      console.log("Datos: " + datos);

      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
      
      var dat = [['Builders', 'idPlayers']]
      dat = dat.concat(datos);
      console.log("dat: " + dat)

      function drawChart() {
        var data = google.visualization.arrayToDataTable([dat]);

    var options = {
      title: 'Lengths of dinosaurs, in meters',
      legend: { position: 'none' },
    };

    var chart = new google.visualization.Histogram(document.getElementById('api-externa4')); chart.draw(data, options);

  }
});
});
}]);

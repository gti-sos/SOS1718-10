angular.module("Principal").

controller("ApiExterna4Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
console.log("Controller initialized (External Api 1)");

$http.get("/api/v1/builders").then(function(responseBuilders) {

  var builders = responseBuilders.data.map(function(d) { return d.builder })

  $http.get("https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Arsenal").then(function(responseArsenal) {

      var idPlayers = []
      for (var e = 0; e < builders.length; e++) {
        idPlayers.push(parseInt(responseArsenal.data['player'][e].idPlayerManager))
      }
      
      console.log("idPlayers: " + parseInt(responseArsenal.data['player'][0].idPlayerManager))
      
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
      console.log("dat: " + dat)
      dat = dat.concat(datos);
      console.log("dat: " + dat)

      function drawChart() {
        var data = google.visualization.arrayToDataTable(dat);

    var options = {
      title: 'ID players of builders',
      legend: { position: 'none' },
    };

    var chart = new google.visualization.Histogram(document.getElementById('api-externa4')); chart.draw(data, options);

  }
});
});
}]);

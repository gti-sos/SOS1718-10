angular.module("Principal").

controller("ApiExterna4Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
console.log("Controller initialized (Internal Api 3)");

$http.get("/api/v1/builders").then(function(responseBuilders) {

  var builders = responseBuilders.data.map(function(d) { return d.builder })

  $http.get("https://sos1718-11.herokuapp.com/api/v2/basketball-stats").then(function(responseBasket) {

      var score = responseBasket.data.map(function(d) { return d.first })
      
      console.log("idPlayers: " + score)
      
      var datos = []

      for (var z = 0; z < builders.length; z++) {
        var ar = [];
        ar.push(builders[z]);
        ar.push(score[z]);
        datos.push(ar);
      }
      console.log("Datos: " + datos);

      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
      
      var dat = [['Builders', 'Score']]
      dat = dat.concat(datos);
      console.log("dat: " + dat)

      function drawChart() {
        var data = google.visualization.arrayToDataTable([dat]);

    var options = {
      title: 'Lengths of dinosaurs, in meters',
      legend: { position: 'none' },
    };

    var chart = new google.visualization.Histogram(document.getElementById('apiSOS3')); chart.draw(data, options);

  }
});
});
}]);

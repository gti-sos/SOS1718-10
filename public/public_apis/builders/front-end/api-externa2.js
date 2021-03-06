angular.module("Principal").

controller("ApiExterna2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
  console.log("Controller initialized (External Api 2)");

  $http.get("/api/v1/builders").then(function(responseBuilders) {

    var poles = responseBuilders.data.map(function(d) { return d.victory });
    var builders = responseBuilders.data.map(function(d) { return d.builder });
    console.log("Poles: " + poles);
    console.log("Builders: " + builders)
    var array = []
    for (var i = 0; i < builders.length; i++) {
      var arrayAux = [];
      arrayAux.push(builders[i]);
      arrayAux.push(poles[i]);
      array.push(arrayAux);
    }

    $http.get("https://sos1718-10.herokuapp.com/proxyIntegration").then(function(responseFootball) {

      var equipos = responseFootball.data.map(function(d) { return d.numberOfTeams })
      var ligas = responseFootball.data.map(function(d) { return d.caption })
      for (var i = 0; i < builders.length; i++) {
        var arrayAux = [];
        arrayAux.push(ligas[i]);
        arrayAux.push(equipos[i]);
        array.push(arrayAux);
      }





      Highcharts.chart('api-externa2', {
        chart: {
          type: 'pyramid'
        },
        title: {
          text: 'Sales pyramid',
          x: -50
        },
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b> ({point.y:,.0f})',
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
              softConnector: true
            },
            center: ['40%', '50%'],
            width: '80%'
          }
        },
        legend: {
          enabled: false
        },
        series: [{
          name: 'Integrations builders (poles) with football-data (numero equipos)',
          data: array
        }]
      });

    });
  });

}]);

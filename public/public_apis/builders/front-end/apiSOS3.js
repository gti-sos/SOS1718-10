angular.module("Principal").

controller("ApiExterna1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 1)");

    $http.get("/api/v1/builders").then(function(responseBuilders) {

            var vicotries = []

            for (var i = 0; i < responseBuilders.data.length; i++) {
                victories.push(responseBuilders.data[i].victory);
            }
            $http.get("https://sos1718-11.herokuapp.com/api/v2/basketball-stats").then(function(response) {

                    var puntos = response.data.map(function(d) { return d.first})
                    var datos = []



                    for (var j = 0; j < years.length; j++) {
                        var ar = [];
                        ar.push(years[j]);
                        ar.push(albums[j]);
                        datos.push(ar);
                    }
                
            });});
    }]);
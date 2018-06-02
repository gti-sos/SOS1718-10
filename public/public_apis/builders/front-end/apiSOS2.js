angular.module("Principal").

controller("ApiSOS2Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (Internal Api 2)");

    $http.get("/api/v1/builders").then(function(responseBuilders) {
        var builders = responseBuilders.data.map(function(d) { return d.builder })
        var victories = responseBuilders.data.map(function(d) { return d.victory })

        $http.get("https://sos1718-08.herokuapp.com/api/v1/divorces-an/").then(function(responseDivorces) {
            var breaks = responseDivorces.data.map(function(d) { return d.break });
            var array = []
            for (var i = 0; i < builders.length; i++) {
                var object = {}
                object["x"] = victories[i]
                object["y"] = breaks[i]
                //object["label"] = builders[i]
                array.push(object)
            }



            var chart = new CanvasJS.Chart("apiSOS2", {
                animationEnabled: true,
                title: {
                    text: "Integrations builders with divorces"
                },
                axisX: {
                    title: "Victories"

                },
                axisY: {
                    title: "Breaks",
                },
                data: [{
                    name: "views",
                    type: "area",
                    dataPoints: array
                }]
            });
            chart.render();





        });
    });

}]);

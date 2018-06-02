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
                object["label"] = builders[i]
                array.push(object)
            }



            var chart = new CanvasJS.Chart("apiSOS2", {
                animationEnabled: true,
                title: {
                    text: "Number of iPhones Sold in Different Quarters"
                },
                axisX: {
                    minimum: new Date(2015, 01, 25),
                    maximum: new Date(2017, 02, 15),
                    valueFormatString: "MMM YY"
                },
                axisY: {
                    title: "Number of Sales",
                    titleFontColor: "#4F81BC",
                    suffix: "mn"
                },
                data: [{
                    indexLabelFontColor: "darkSlateGray",
                    name: "views",
                    type: "area",
                    yValueFormatString: "#,##0.0mn",
                    dataPoints: array
                }]
            });
            chart.render();





        });
    });

}]);

angular.module("Principal").

controller("ApiSOS1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (Internal Api 4)");

    $http.get("/api/v1/builders").then(function(responseBuilders) {
        var builders = responseBuilders.data.map(function(d) { return d.builder })

        $http.get("https://sos1718-03.herokuapp.com/api/v1/pollution-cities").then(function(responsePolutions) {
                var cars = responsePolutions.data.map(function(d) { return d.car })
                var array = []
                for (var i =0; i<builders.length;i++){
                    var object = {}
                    object["y"] = cars[i]
                    object["label"] = builders[i]
                    array.push(object)
                } 




                var chart = new CanvasJS.Chart("apiSOS1", {
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    exportEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: "Desktop Browser Market Share in 2016"
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y} cars",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} - {y}%",
                        dataPoints: array
                    }]
                });
                chart.render();

            })
        })
}])

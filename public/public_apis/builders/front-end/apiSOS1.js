angular.module("Principal").

controller("ApiSOS1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (Internal Api 4)");

    $http.get("/api/v1/builders").then(function(responseBuilders) {
        var builders = responseBuilders.data.map(function(d) { return d.builder })

        $http.get("https://sos1718-03.herokuapp.com/api/v1/global-warmings").then(function(responseGlobalWarmings) {
            var peakPowers = responseGlobalWarmings.data.map(function(d) { return d.peakPower })
            var array = []
            for (var i = 0; i < builders.length; i++) {
                var object = {}
                object["tittle"] = peakPowers[i]
                object["value"] = builders[i]
                array.push(object)
            }

            var chart = AmCharts.makeChart("apiSOS1", {
                "type": "funnel",
                "theme": "light",
                "dataProvider": array,
                "balloon": {
                    "fixedPosition": true
                },
                "valueField": "value",
                "titleField": "title",
                "marginRight": 240,
                "marginLeft": 50,
                "startX": -500,
                "depth3D": 100,
                "angle": 40,
                "outlineAlpha": 1,
                "outlineColor": "#FFFFFF",
                "outlineThickness": 2,
                "labelPosition": "right",
                "balloonText": "[[title]]: [[value]]n[[description]]",
                "export": {
                    "enabled": true
                }
            });




            /*var chart = new CanvasJS.Chart("apiSOS1", {
                theme: "light2", // "light1", "light2", "dark1", "dark2"
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: "Integrations builders with global-warmings"
                },
                data: [{
                    type: "pie",
                    startAngle: 25,
                    toolTipContent: "<b>{label}</b>: {y} peak power",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    dataPoints: array
                }]
            });
            chart.render();*/

        })
    })
}])

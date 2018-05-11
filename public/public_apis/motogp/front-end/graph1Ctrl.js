/*global angular*/
/*global Highcharts*/

angular.module("MotogpStatsApp").controller("Graph1Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("graph1 Ctrl initialized!");


    Array.prototype.sortNumbers = function() {
        return this.sort(
            function(a, b) {
                return a - b
            }
        );
    }


    $http.get("/api/v1/motogp-stats").then(function(response) {

        Highcharts.chart('analytics', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Age of the Pilots'
            },
            subtitle: {
                text: 'MotoGP'
            },
            xAxis: {
                categories: response.data.map(function(d) { return parseInt(d.year) }).sortNumbers()
            },
            yAxis: {
                min: 0,
                tickInterval: 5,
                tickOptions: {
                    formatString: '%d'
                },
                title: {
                    text: 'Edad'
                }

            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Years',
                data: response.data.map(function(d) { return parseInt(d.age) }),
                marker: {
                    symbol: 'circle'
                },

            }]
        });

        ///////////////////////////////////////////// GOOGLE CHART //////////////////////////////////////////////////////////////
        
        var com;
        var pilot;
        var googleChartData = [
            ["Region", "Pilots"]
        ];
        for (var i = 0; i < response.data.length; i++) {
            com = response.data[i].country;
            pilot = response.data[i].pilot;
            googleChartData.push([com, pilot]);
        }
        console.log(googleChartData);
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(googleChartData);

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
        
        
        /////////////////////////////////////////// EL MIO ///////////////////////////////////////////////////////////////////
        
        $scope.data = {
        dataset0: [
            { x: 0, val_0: 0, val_1: 0, val_2: 0, val_3: 0 },
            { x: 1, val_0: 0.993, val_1: 3.894, val_2: 8.47, val_3: 14.347 },
            { x: 2, val_0: 1.947, val_1: 7.174, val_2: 13.981, val_3: 19.991 },
            { x: 3, val_0: 2.823, val_1: 9.32, val_2: 14.608, val_3: 13.509 },
            { x: 4, val_0: 3.587, val_1: 9.996, val_2: 10.132, val_3: -1.167 },
            { x: 5, val_0: 4.207, val_1: 9.093, val_2: 2.117, val_3: -15.136 },
            { x: 6, val_0: 4.66, val_1: 6.755, val_2: -6.638, val_3: -19.923 },
            { x: 7, val_0: 4.927, val_1: 3.35, val_2: -13.074, val_3: -12.625 }
        ]
    };
    $scope.options = {
        series: [{
            axis: "y",
            dataset: "dataset0",
            key: "val_0",
            label: "An area series",
            color: "#1f77b4",
            type: ['line', 'dot', 'area'],
            id: 'mySeries0'
        }],
        axes: { x: { key: "x" } }
    };

    });


}]);

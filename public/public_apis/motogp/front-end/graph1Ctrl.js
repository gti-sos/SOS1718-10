/*global angular*/
/*global Highcharts*/
/*global google*/
/*global d3*/

angular.module("Principal").controller("Graph1Ctrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("graph1 Ctrl initialized!");

    $http.get("/api/v1/motogp-stats").then(function(response) {
        var conjuntoDEPA = []
       
        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
        
        for (var i = 0; i < conjuntoOPA.length; i++) {
            
            for (var j = 0; j < response.data.length; j++) {
              
                if (conjuntoOPA[i] == response.data[j].year) {
                 
                    conjuntoDEPA[i] = response.data[j].age;
                }
            }
        }
       

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
                categories: response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
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
                data: conjuntoDEPA,
                marker: {
                    symbol: 'circle'
                },

            }]
        });
    });

    ///////////////////////////////////////////// GOOGLE CHART //////////////////////////////////////////////////////////////

    $http.get("/api/v1/motogp-stats").then(function(response) {

        var coun;
        var pilot = [];
        var googleChartData = [
            ["Region", "Pilots"]
        ];
        for (var i = 0; i < response.data.length; i++) {
            coun = response.data[i].country;
            pilot = response.data[i].pilot;
            googleChartData.push([coun, pilot]);
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

            var options = {
                colorAxis: {
                    minValue: 0,
                    maxValue: 10
                }
            };


            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    });


    /////////////////////////////////////////// D3 ///////////////////////////////////////////////////////////////////

    $http.get("/api/v1/motogp-stats").then(function(response) {

        var conjuntoDEPA = []
        
        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
        
        for (var i = 0; i < conjuntoOPA.length; i++) {
            
            for (var j = 0; j < response.data.length; j++) {
                
                if (conjuntoOPA[i] == response.data[j].year) {
                 
                    conjuntoDEPA[i] = response.data[j].score;
                }
            }
        }


        d3.select(".chart")
            .selectAll("div")
            .data(conjuntoDEPA)
            .enter()
            .append("div")
            .style("width", function(d) { return d + 'px' })
            .text(function(d) { return "Score:" + d; });


    });
}]);

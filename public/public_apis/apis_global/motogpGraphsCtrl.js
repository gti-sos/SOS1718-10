/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/

angular.module("App10").controller("motogpGraphsCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("graph1 Ctrl initialized!");

    $http.get("/api/v1/motogp-stats").then(function(response) {
        var conjuntoDEPA = []
        //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
        //1º Guardamos en una variable el conjunto de los años ordenados
        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
        //2ºRecorremos el conjunto ordenado
        for (var i = 0; i < conjuntoOPA.length; i++) {
            //3º Recorremos el response.data en busca de la edad que corresponden a cada año
            for (var j = 0; j < response.data.length; j++) {
                //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                //que se encuentra en esa posicion en el conjunto ordenado
                if (conjuntoOPA[i] == response.data[j].year) {
                    //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                    //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                    conjuntoDEPA[i] = response.data[j].age;
                }
            }
        }
        //console.log("MUestrame las vicorias ordenadas cronológicamente: " + conjuntoDeVictoriasOrdenadasPorAño);
        //console.log("Muestrame los años ordenados: " + conjuntoOrdenadoPorAño);

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

            var options = {};

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    });


    /////////////////////////////////////////// EL MIO ///////////////////////////////////////////////////////////////////

    $http.get("/api/v1/motogp-stats").then(function(response) {

        var chart = AmCharts.makeChart("chartdiv", {
            "theme": "light",
            "type": "serial",
            "dataProvider": [{
                "year": 2004,
                "killed": 201
            }, {
                "year": 2015,
                "killed": 89
            }, {
                "year": 2016,
                "killed": 0
            }, {
                "year": 2016,
                "killed": 84
            }, {
                "year": 2012,
                "killed": 78
            }],
            "valueAxes": [{
                "title": "Muertos por año"
            }],
            "graphs": [{
                "balloonText": "Income in [[category]]:[[value]]",
                "fillAlphas": 1,
                "lineAlpha": 0.2,
                "title": "Income",
                "type": "column",
                "valueField": "killed"
            }],
            "depth3D": 20,
            "angle": 30,
            "rotate": true,
            "categoryField": "year",
            "categoryAxis": {
                "gridPosition": "start",
                "fillAlpha": 0.05,
                "position": "left"
            },
            "export": {
                "enabled": true
            }
        });
    });

}]);

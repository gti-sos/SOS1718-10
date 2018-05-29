/*global angular*/
/*global Highcharts*/
/*global google*/
/*global d3*/

angular.module("Principal").controller("Graph1Ctrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
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

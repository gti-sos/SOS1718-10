/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/

angular.module("MotogpStatsApp").controller("pollutionCitiesMotogpGraphsCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("PollutionCitiesMotogp Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiPollution = 'https://sos1718-10.herokuapp.com/proxyFGG';


    $http.get(apiPollution).then(function(response) {
        var conjuntoDEPA1 = []
        //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
        //1º Guardamos en una variable el conjunto de los años ordenados
        var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
        //2ºRecorremos el conjunto ordenado
        for (var i = 0; i < conjuntoOPA1.length; i++) {
            //3º Recorremos el response.data en busca de la edad que corresponden a cada año
            for (var j = 0; j < response.data.length; j++) {
                //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                //que se encuentra en esa posicion en el conjunto ordenado
                if (conjuntoOPA1[i] == response.data[j].year) {
                    //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                    //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                    conjuntoDEPA1[i] = response.data[j].nitrous;
                }
            }
        }


        $http.get(apiMotogp).then(function(response) {
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



            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Pollution Cities & MotoGP Stats '
                },
                subtitle: {
                    text: 'Source: PollutionMotoGP.com'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
                },
                yAxis: {
                    title: {
                        text: 'Convinada'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'SCORE',
                    data: conjuntoDEPA

                }, {
                    name: 'NITOURS',
                    data: [0, 0, 0, 0, 0, 432, 0, 0, 0]

                }]
            });
        });
    });


}]);

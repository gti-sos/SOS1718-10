/* global angular */
/* global Highcharts */

angular.module("Principal").controller("integrationCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("integrationCtrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiBuses = "/api/v1/buses";
    var apiBuilders = "/api/v1/builders";


    //Función auxiliar para eliminar repetidos
    Array.prototype.unique = function(a) {
        return function() { return this.filter(a) }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });

    Array.prototype.sortNumbers = function() {
        return this.sort(
            function(a, b) {
                return a - b
            }
        );
    }

    $http.get(apiMotogp).then(function(response) {
        var conjuntoGlobal = []
        var conjuntoDEPA = []

        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)

        for (var i = 0; i < conjuntoOPA.length; i++) {

            for (var j = 0; j < response.data.length; j++) {

                if (conjuntoOPA[i] == response.data[j].year) {

                    conjuntoDEPA[i] = response.data[j].score;
                }
            }


        }
        console.log("tito:" + conjuntoDEPA);
        console.log("tito2:" + conjuntoOPA);

        $http.get(apiBuilders).then(function(response) {
            var conjuntoDEPA1 = []

            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)

            for (var i = 0; i < conjuntoOPA1.length; i++) {

                for (var j = 0; j < response.data.length; j++) {

                    if (conjuntoOPA1[i] == response.data[j].year) {

                        conjuntoDEPA1[i] = response.data[j].victory;
                    }
                }



            }
            console.log("tito1:" + conjuntoDEPA1);
            console.log("tito2:" + conjuntoOPA1);

            $http.get(apiBuses).then(function(response) {
                var busyear = []
                var bustrans = []
                for (var i = 0; i < response.data.length; i++) {
                    busyear.push(response.data[i].year)
                    bustrans.push(response.data[i].transportedTraveler);

                }

                console.log(busyear);
                console.log(bustrans)

                var nuevoarray = conjuntoOPA.concat(conjuntoOPA1);
                nuevoarray = nuevoarray.unique().sort((a, b) => a - b);
                console.log("churri 1:" + nuevoarray);
                var arraynuevo = nuevoarray.concat(parseInt(busyear));
                arraynuevo = arraynuevo.unique().sort((a, b) => a - b);
                console.log("churri2:" + arraynuevo);


                console.log("tito2:" + busyear);
                console.log("tito2:" + bustrans);






                var conjuntoObjetos = []
                for (var z = 0; z < conjuntoOPA.length; z++) {

                    var object = {};
                    object["x"] = conjuntoOPA[z];
                    object["y"] = conjuntoDEPA[z];
                    conjuntoObjetos.push(object);

                }
                console.log("titobolo:" + conjuntoObjetos);

                var conjuntoObjetos1 = []
                for (var z = 0; z < conjuntoOPA.length; z++) {

                    var object = {};
                    object["x"] = conjuntoOPA1[z];
                    object["y"] = conjuntoDEPA1[z];
                    conjuntoObjetos1.push(object);


                }
                console.log("titodavi:" + conjuntoObjetos1);

                var conjuntoObjetos2 = []
                for (var z = 0; z < conjuntoOPA.length; z++) {

                    var object = {};
                    object["x"] = busyear[z];
                    object["y"] = parseInt(bustrans[z]);
                    conjuntoObjetos2.push(object);


                }
                console.log("titotolo:" + conjuntoObjetos2);


                Highcharts.chart('container', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'MOTOGP , BUILDERS & BUSES'
                    },
                    subtitle: {
                        text: 'La integración Hulio'
                    },
                    xAxis: {
                        allowDecimals: false,


                    },
                    yAxis: {
                        title: {
                            text: 'Grupo 10'
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        pointFormat: '{series.name} number <b>{point.y:,.0f}</b><br/>in {point.x}'
                    },
                    plotOptions: {
                        area: {
                            pointStart: arraynuevo[0],
                            pointFinal: arraynuevo[arraynuevo.length - 1],
                            marker: {
                                enabled: true,
                                symbol: 'circle',
                                radius: 2,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'MotoGP',
                        data: conjuntoObjetos
                    }, {
                        name: 'Builders',
                        data: conjuntoObjetos1
                    }, {
                        name: 'Buses',
                        data: conjuntoObjetos2
                    }]
                });
            });
        });

    });
}]);

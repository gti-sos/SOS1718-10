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
            //conjuntoGlobal.push(conjuntoOPA);

        }
        console.log("tito:" + conjuntoDEPA);
        console.log("tito2:" + conjuntoOPA);

        $http.get(apiBuilders).then(function(response) {
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
                        conjuntoDEPA1[i] = response.data[j].victory;
                    }
                }

                //conjuntoGlobal.push(conjuntoOPA1);

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





                //Creamos un solo objeto y a ese mismo le vamos metiendo varias claves (y, label) y sus valores para cada caso
                //sustituyendo en cada caso el valor correspondiente de conjuntoOPA[z] y conjuntoDePuntos[z]
                //y en un conjunto de objetos vamos guardando cada objeto creado de la forma {label:2000, y:15}
                var conjuntoObjetos = []
                for (var z = 0; z < conjuntoOPA.length; z++) {
                    //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                    //que es la forma en la que recibe los datos la gráfica 
                    var object = {};
                    object["x"] = conjuntoOPA[z];
                    object["y"] = conjuntoDEPA[z];
                    conjuntoObjetos.push(object);

                    //Este conjuntoObjetos sería el conjunto final que devoleríamos
                }
                console.log("titobolo:" + conjuntoObjetos);

                var conjuntoObjetos1 = []
                for (var z = 0; z < conjuntoOPA.length; z++) {
                    //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                    //que es la forma en la que recibe los datos la gráfica 
                    var object = {};
                    object["x"] = conjuntoOPA1[z];
                    object["y"] = conjuntoDEPA1[z];
                    conjuntoObjetos1.push(object);

                    //Este conjuntoObjetos sería el conjunto final que devoleríamos
                }
                console.log("titodavi:" + conjuntoObjetos1);
                /*
                var conjuntoObjetos2 = []
                for (var z = 0; z < conjuntoOPA.length; z++) {
                    //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                    //que es la forma en la que recibe los datos la gráfica 
                    var object = {};
                    object["x"] = years[z];
                    object["y"] = aBuses[z];
                    conjuntoObjetos2.push(object);

                    //Este conjuntoObjetos sería el conjunto final que devoleríamos
                }
                console.log("titotolo:" + conjuntoObjetos2);
                */

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
                        pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
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
                        name: 'Buses'
                        /*,
                                                data: bustrans*/
                    }]
                });
            });
        });

    });
}]);

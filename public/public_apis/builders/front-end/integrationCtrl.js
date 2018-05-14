angular
    .module("Principal")
    .controller("IntegrationCtrl", ["$scope", "$http", function($scope, $http) {
                console.log("IntegrationCtrl initialized");
                var apiBuilders = "/api/v1/builders";
                var apiUnemployments = "https://sos1718-02.herokuapp.com/api/v1/unemployments";




                ///////////////////////////INTEGRACION SIN PROXY////////////////////////////////////
                $http.get(apiBuilders)
                    .then(function(response) {

                        var conjuntoDeVictoriasOrdenadasPorAño = []
                        //con este método sacamos las victorias ordenadas correctamente con su correspondiente año ordenado
                        //1º Guardamos en una variable el conjunto de los años ordenados
                        var conjuntoOrdenadoPorAño = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
                        //2ºRecorremos el conjunto ordenado
                        for (var i = 0; i < conjuntoOrdenadoPorAño.length; i++) {
                            //3º Recorremos el response.data en busca del numero de victorias que corresponden a cada año
                            for (var j = 0; j < response.data.length; j++) {
                                //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                                //que se encuentra en esa posicion en el conjunto ordenado
                                if (conjuntoOrdenadoPorAño[i] == response.data[j].year) {
                                    //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                                    //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                                    conjuntoDeVictoriasOrdenadasPorAño[i] = response.data[j].victory;
                                }
                            }
                        }
                        var years = response.data.map(function(d) { return parseInt(d.year) });

                        $http.get(apiUnemployments)
                            .then(function(response) {
                                var porcentajeDeJovenesOrdenadosPorAño = []
                                //con este método sacamos las victorias ordenadas correctamente con su correspondiente año ordenado
                                //1º Guardamos en una variable el conjunto de los años ordenados
                                var conjuntoOrdenadoPorAño = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
                                //2ºRecorremos el conjunto ordenado
                                for (var i = 0; i < conjuntoOrdenadoPorAño.length; i++) {
                                    //3º Recorremos el response.data en busca del numero de victorias que corresponden a cada año
                                    for (var j = 0; j < response.data.length; j++) {
                                        //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                                        //que se encuentra en esa posicion en el conjunto ordenado
                                        if (conjuntoOrdenadoPorAño[i] == response.data[j].year) {
                                            //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                                            //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                                            porcentajeDeJovenesOrdenadosPorAño[i] = response.data[j].young;
                                        }
                                    }
                                }
                                var year1 = response.data.map(function(d) { return parseInt(d.year) });
                                for (var j = 0; j < porcentajeDeJovenesOrdenadosPorAño.length; j++) {
                                    years.push(year1[j]);
                                }



                                Highcharts.chart('integrations', {
                                    chart: {
                                        type: 'line'
                                    },
                                    title: {
                                        text: 'Monthly Average Temperature'
                                    },
                                    subtitle: {
                                        text: 'Source: WorldClimate.com'
                                    },
                                    xAxis: {
                                        categories: years.sort((a, b) => a - b)
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'Victories/Youngs'
                                        }
                                    },
                                    plotOptions: {
                                        line: {
                                            dataLabels: {
                                                enabled: true
                                            },
                                            enableMouseTracking: false
                                        }
                                    },
                                    series: [{
                                        name: 'Victories',
                                        data: conjuntoDeVictoriasOrdenadasPorAño
                                    }, {
                                        name: 'Youngs',
                                        data: porcentajeDeJovenesOrdenadosPorAño
                                    }]
                                });
                            });
                    });



            }]);

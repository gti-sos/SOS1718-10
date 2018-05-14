angular
    .module("Principal")
    .controller("IntegrationCtrl2", ["$scope", "$http", function($scope, $http) {
            console.log("IntegrationCtrl initialized");
            var apiBuilders = "/api/v1/builders";
            var apiWorldStats = "https://sos1718-10.herokuapp.com/proxyBuilders";


            /////////////////////////INTEGRACIÓN CON PROXY//////////////////////////////////


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
                        var paises = response.data.map(function(d) { return d.country });
                        var years = response.data.map(function(d) { return parseInt(d.year) });

                        $http.get(apiWorldStats)
                            .then(function(response) {
                                    var estadisticasIntegracion = []
                                    //con este método sacamos las victorias ordenadas correctamente con su correspondiente año ordenado
                                    //1º Guardamos en una variable el conjunto de los años ordenados
                                    var conjuntoOrdenadoPorAño = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
                                    //2ºRecorremos el conjunto ordenado
                                    for (var i = 0; i < conjuntoOrdenadoPorAño.length; i++) {
                                        //3º Recorremos el response.data en busca del numero de victorias que corresponden a cada año
                                        var sales = response.data.map(function(d) { return parseInt(d.sale) });
                                        for (var j = 0; j < sales.length; j++) {
                                            //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                                            //que se encuentra en esa posicion en el conjunto ordenado
                                            if (conjuntoOrdenadoPorAño[i] == response.data[j].year) {
                                                //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                                                //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                                                estadisticasIntegracion[i] = response.data[j].sale;
                                            }
                                        }
                                    }

                                    console.log("estadisticasIntegracion" + estadisticasIntegracion)
                                    var year1 = response.data.map(function(d) { return parseInt(d.year) });
                                    console.log("año1: " + year1)
                                    for (var j = 0; j < estadisticasIntegracion.length; j++) {
                                        if (!(year1[j] in years)) {
                                            console.log("years: " + year1[j]);
                                            years.push(year1[j]);
                                        }
                                    }
                                    console.log("años " + years.sort((a, b) => a - b));

                                    var paises1 = response.data.map(function(d) { return d.country });
                                    for (var j = 0; j < estadisticasIntegracion.length; j++) {
                                        if (!(paises1[j] in paises))
                                            paises.push(paises1[j])
                                    }




                                    Highcharts.chart('integrationsProxy', {
                                            chart: {
                                                type: 'bar'
                                            },
                                            title: {
                                                text: 'Integration Builder with World-Stats'
                                            },

                                            xAxis: {
                                                categories: paises,
                                            },
                                            yAxis: {
                                                categories: years
                                                
                                                },
                                                
                                                plotOptions: {
                                                    bar: {
                                                        dataLabels: {
                                                            enabled: true
                                                        }
                                                    }
                                                },
                                                legend: {
                                                    layout: 'vertical',
                                                    align: 'right',
                                                    verticalAlign: 'top',
                                                    x: -40,
                                                    y: 80,
                                                    floating: true,
                                                    borderWidth: 1,
                                                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                                                    shadow: true
                                                },
                                                credits: {
                                                    enabled: false
                                                },
                                                series: [{
                                                    name: 'Victories',
                                                    data: conjuntoDeVictoriasOrdenadasPorAño
                                                }, {
                                                    name: 'Sales',
                                                    data: estadisticasIntegracion
                                                }]
                                            });
                                    });
                            });
                }]);

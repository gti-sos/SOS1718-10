angular
    .module("Principal")
    .controller("IntegrationSOSConProxy", ["$scope", "$http", function($scope, $http) {
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
                var yearsBuilders = conjuntoOrdenadoPorAño;
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

                        var yearsWorldStats = response.data.map(function(d) { return parseInt(d.year) });
                        for (var j = 0; j < estadisticasIntegracion.length; j++) {
                            if (!(yearsWorldStats[j] in years)) {
                                years.push(yearsWorldStats[j]);
                            }
                        }
                        console.log("Estadisticas de Integracion ordenadas por año (Sales for year): " + estadisticasIntegracion)
                        console.log("Conjunto de años de Api World-Stats: " + yearsWorldStats)
                        console.log("Conjunto de victorias ordenadas por año: " + conjuntoDeVictoriasOrdenadasPorAño);
                        console.log("Conjunto de años ordenados de Builders " + yearsBuilders)
                        console.log("Conjunto de años unificados ordenados " + years.sort((a, b) => a - b));

                        var conjuntoIntegracion = []
                        for (var w = 0; w < yearsBuilders.length; w++) {
                            var object = {};
                            object["x"] = conjuntoDeVictoriasOrdenadasPorAño[w];
                            object["y"] = estadisticasIntegracion[w];
                            conjuntoIntegracion.push(object);
                            //console.log("Conjunto de integracion[w][x]: " + conjuntoIntegracion[w].x);
                            //console.log("Conjunto de integracion[w][y]: " + conjuntoIntegracion[w].y);
                            //console.log("Object: " + object);
                        }

                        //console.log("Conjunto de integracion: " + conjuntoIntegracion);




                        var chart = new CanvasJS.Chart("integrationsProxy", {
                            animationEnabled: true,
                            zoomEnabled: true,
                            title: {
                                text: "Integration Builder with World-Stats"
                            },
                            axisX: {
                                title: "Victories",
                                minimum:0 ,
                                maximum: 20
                            },
                            axisY: {
                                title: "Sales",
                                minimum:0,
                                maximum:60
                            },
                            data: [{
                                type: "scatter",
                                toolTipContent: "<b>Victories: </b>{x}<br/><b>Sales: </b>{y}",
                                dataPoints: conjuntoIntegracion
                            }]
                        });
                        chart.render();




                    });
            });

    }]);

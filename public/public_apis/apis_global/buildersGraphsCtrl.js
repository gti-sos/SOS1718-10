/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Chartkick*/

angular
    .module("App10")
    .controller("buildersGraphsCtrl", ["$scope", "$http", function($scope, $http) {
                console.log("MainCtrl initialized");



                //////////////////////////////////////////////Highcharts///////////////////////////////
                $http
                    .get("/api/v1/builders")
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
                        //console.log("MUestrame las vicorias ordenadas cronológicamente: " + conjuntoDeVictoriasOrdenadasPorAño);
                        //console.log("Muestrame los años ordenados: " + conjuntoOrdenadoPorAño);




                        Highcharts.chart('analytics', {
                            chart: {
                                type: 'spline'
                            },
                            title: {
                                text: 'Champions builders'
                            },
                            xAxis: {
                                //Aqui le decimos lo que debe mostrar en los intervalos del eje x ordenados cronológicamente
                                categories: response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)

                            },
                            title: {
                                text: 'Years'
                            },
                            yAxis: {
                                //Esto sirve para que el eje muestre intervalos de 4 en 4 empezando en 0
                                min: 0,
                                tickInterval: 4,
                                tickOptions: {
                                    formatString: '%d'
                                },
                                title: {
                                    //Texto a mostrar en la leyenda del eje Y
                                    text: 'Victories'
                                }

                            },

                            tooltip: {
                                crosshairs: true,
                                shared: true
                            },
                            plotOptions: {
                                spline: {
                                    marker: {
                                        radius: 4,
                                        lineColor: '#666666',
                                        lineWidth: 1
                                    }
                                }
                            },
                            series: [{
                                //Esto le dice que muestre el letrero victories para cada dato en el gráfico
                                name: 'Victories',
                                data: conjuntoDeVictoriasOrdenadasPorAño
                            }]
                        });
                    });


                ///////////////////////////////////////////////GOOGLE CHARTS/////////////////////////////
                $http
                    .get("/api/v1/builders")
                    .then(function(response) {

                        var victoriasPorConstructor = []
                        var builders = response.data.map(function(d) { return d.builder })
                        //Sacamos el numero de vistorias de cada constructor y lo almacenamos en un conjunto en la misma posicion i que la del constructor
                        //De forma que ambos conjuntos quedan con los constructores y el numero de victorias en el mismo orden a pesar de estar en diferentes conjuntos
                        //Para asi facilitar la extraccion de la tupla [Constructor, victorias]
                        for (var i = 0; i < builders.length; i++) {
                            victoriasPorConstructor[i] = response.data[i].victory;
                        }


                        //console.log("Builder: " + builders);
                        //console.log("Victorias: " + victoriasPorConstrucor);
                        var ConjuntoDeTuplas = []
                        var tupla = []

                        //Con este método creamos la lista de tuplas ['Builder', victorias]
                        //Para ello recorremos las victoriasPorConstructor que es el conjunto de victorias por constructor
                        for (var m = 0; m < victoriasPorConstructor.length; m++) {
                            tupla = [builders[m], victoriasPorConstructor[m]]
                            ConjuntoDeTuplas[m] = tupla;

                        }
                        console.log("CONJUNTO DE TUPLAS: " + ConjuntoDeTuplas);



                        //////AQUI ESTAMOS INTENTANDO AGRUPAR TODAS LAS ESCUDERIAS CON SU SUMATORIO DE VICTORIAS

                        var conjunto2 = []
                        var pos = null
                        for (var d = 0; d < ConjuntoDeTuplas.length; d++) {
                            if (ConjuntoDeTuplas[d][0] in conjunto2) {
                                console.log("Entraaaa");
                                pos = conjunto2.indexOf(ConjuntoDeTuplas[d])
                                var suma = conjunto2[pos][1] + ConjuntoDeTuplas[d][1];
                                console.log("Suma: " + suma);
                                conjunto2[pos] = [conjunto2[pos][0], suma]
                            }
                            else {
                                conjunto2.push(ConjuntoDeTuplas[d]);
                            }
                        }
                        console.log("Conjunto compactado: " + conjunto2);



                        google.charts.load('current', { 'packages': ['corechart'] });
                        google.charts.setOnLoadCallback(drawChart);

                        function drawChart() {

                            var data = google.visualization.arrayToDataTable([
                                ['Builder', 'Victory'], ConjuntoDeTuplas[0], ConjuntoDeTuplas[1],
                                ConjuntoDeTuplas[2]
                            ]);


                            /*         ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]*/



                            var options = {
                                title: 'My Daily Activities',
                                'width': 500,
                                'height': 500
                            };
                            var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                            chart.draw(data, options);
                        }


                    });




                ////////////////////////////////////CHARTKICK/////////////////////
                $http
                    .get("/api/v1/builders")
                    .then(function(response) {
                        var polesPorConstructor = []
                        var builders = response.data.map(function(d) { return d.builder })
                        //Sacamos el numero de vistorias de cada constructor y lo almacenamos en un conjunto en la misma posicion i que la del constructor
                        //De forma que ambos conjuntos quedan con los constructores y el numero de victorias en el mismo orden a pesar de estar en diferentes conjuntos
                        //Para asi facilitar la extraccion de la tupla [Constructor, victorias]
                        for (var i = 0; i < builders.length; i++) {
                            polesPorConstructor[i] = response.data[i].pole;
                        }


                        //console.log("Builder: " + builders);
                        //console.log("Victorias: " + victoriasPorConstrucor);
                        var ConjuntoDeTuplas = []
                        var tupla = []

                        //Con este método creamos la lista de tuplas ['Builder', victorias]
                        //Para ello recorremos las victoriasPorConstructor que es el conjunto de victorias por constructor
                        for (var m = 0; m < polesPorConstructor.length; m++) {
                            tupla = [builders[m], polesPorConstructor[m]]
                            ConjuntoDeTuplas[m] = tupla;

                        }
                        
                        
                        console.log("conjuntoDePolesOrdenadasPorAño: " + ConjuntoDeTuplas);
                        var chart = Chartkick.ColumnChart("chart-1", [ConjuntoDeTuplas[0], ConjuntoDeTuplas[1], ConjuntoDeTuplas[2]]);
                        chart.redraw()
                    });


                    }]);

/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Chartkick*/

angular
    .module("Principal")
    .controller("GraphCtrl", ["$scope", "$http", function($scope, $http) {
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




                Highcharts.chart('graphs', {
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

                var datos = []
                var victories = response.data.map(function(d) { return d.victory })
                var countries = response.data.map(function(d) { return d.country })

                for (var z = 0; z < countries.length; z++) {
                    var ar = [];
                    ar.push(countries[z]);
                    ar.push(victories[z]);
                    datos.push(ar);
                }


                var dat = [['Country', 'victories']]
                console.log("dat: " + dat)
                dat = dat.concat(datos);
                console.log("dat: " + dat)

                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable(dat);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('geoChart'));

                    chart.draw(data, options);
                }


            });



        ///////////////////////////////////////////////////CANVAJS/////////////////////////////

        $http
            .get("/api/v1/builders")
            .then(function(response) {


                var conjuntoDePolesOrdenadasPorAño = []
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
                            conjuntoDePolesOrdenadasPorAño[i] = response.data[j].pole;
                        }
                    }
                }

                //Creamos un solo objeto y a ese mismo le vamos metiendo varias claves (y, label) y sus valores para cada caso
                //sustituyendo en cada caso el valor correspondiente de conjuntoOrdenadoPorAño[z] y conjuntoDePolesOrdenadasPorAño[z]
                //y en un conjunto de objetos vamos guardando cada objeto creado de la forma {label:2000, y:15}
                var conjuntoObjetos = []
                for (var z = 0; z < conjuntoDePolesOrdenadasPorAño.length; z++) {
                    //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                    //que es la forma en la que recibe los datos la gráfica 
                    var object = {};
                    object["label"] = conjuntoOrdenadoPorAño[z];
                    object["y"] = conjuntoDePolesOrdenadasPorAño[z];
                    conjuntoObjetos.push(object);
                    //Este conjuntoObjetos sería el conjunto final que devoleríamos
                }
                console.log("Conjunto de Objetos: " + conjuntoObjetos);
                console.log("Conjunto de conjuntoDePolesOrdenadasPorAño: " + conjuntoDePolesOrdenadasPorAño);
                console.log("Conjunto de conjuntoOrdenadoPorAño: " + conjuntoOrdenadoPorAño);


                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    theme: "light2", // "light1", "light2", "dark1", "dark2"
                    title: {
                        text: "Poles por año"
                    },
                    axisY: {
                        title: "Poles",
                        includeZero: false
                    },
                    axisX: {
                        title: "Years"
                    },
                    data: [{
                        type: "column",
                        dataPoints: conjuntoObjetos
                    }]
                });
                chart.render();
            });


    }]);

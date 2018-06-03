angular.module("Principal").controller("integration5Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration5 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiMigue = 'https://sos1718-10.herokuapp.com/proxyFGGM';


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
                    conjuntoDEPA[i] = response.data[j].age;
                }
            }
        }

        $http.get(apiMigue).then(function(response) {
            var conjuntoDEPA1 = []
            //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
            //1º Guardamos en una variable el conjunto de los años ordenados
            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.iyear) }).sort((a, b) => a - b)
            //2ºRecorremos el conjunto ordenado
            for (var i = 0; i < conjuntoOPA1.length; i++) {
                //3º Recorremos el response.data en busca de la edad que corresponden a cada año
                for (var j = 0; j < response.data.length; j++) {
                    //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                    //que se encuentra en esa posicion en el conjunto ordenado
                    if (conjuntoOPA1[i] == response.data[j].iyear) {
                        //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                        //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                        conjuntoDEPA1[i] = response.data[j].nkill;
                    }
                }
            }






            var conjuntoObjetos = [];
            for (var y = 0; y < conjuntoOPA.length; y++) { //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {};
                object["values"] = [conjuntoDEPA[y]];
                object["join"] = [conjuntoOPA[y]];
                conjuntoObjetos.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos}


            }
            for (var y = 0; y < conjuntoOPA1.length; y++) { //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {}
                object["values"] = [conjuntoDEPA1[y]];
                object["join"] = [conjuntoOPA1[y]];
                conjuntoObjetos.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos}


            }

            for (var o = 0; 0 < conjuntoObjetos.length; o++) {
                console.log(conjuntoObjetos.data);
            }


            console.log("BOOLO: " + conjuntoDEPA1)
            console.log("BOOLO: " + conjuntoOPA1)
            console.log("BOOLO: " + conjuntoObjetos)

            var valuesArray = [50, 65, 115, 25, 35, 75, 85, 95, 45, 35, 75, 105, 65];
            var globalMin = 55;
            var globalMax = 85;
            var globalMinColor = '#F44336';
            var globalMaxColor = '#2196F3';
            var myConfig = {
                type: 'bar',
                shapes: [{
                    type: 'rectangle',
                    height: 10,
                    width: 25,
                    x: 75,
                    y: 5,
                    backgroundColor: '#C0C0C0',
                    label: {
                        text: 'Values Below Min',
                        offsetX: 65
                    }
                }],
                plot: {
                    rules: getColorData()
                },
                tooltip: { visible: false },
                crosshairX: {
                    lineWidth: '100%',
                    alpha: .3,
                    plotLabel: {
                        fontSize: 18,
                        padding: 8,
                        borderRadius: 5,
                        backgroundColor: '#e0e0e0',
                        text: '<span style="color:%color">%v°</span>'
                    }
                },
                plotarea: {
                    margin: 'dynamic'
                },
                scaleX: {
                    label: { text: 'Insert Timestamp' }
                },
                scaleY: {
                    format: '%v°',
                    label: { text: 'Degrees In Celcius' }
                },
                refresh: {
                    type: "feed",
                    transport: "js",
                    url: "feed()",
                    interval: 400,
                    resetTimeout: 1000
                },
                series: [{
                    values: []
                }]
            }

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: '100%',
                width: '100%'
            });


            /*
             * Feed function to mimick live data coming in
             */
            window.feed = function(callback) {
                var tick = {};
                tick.plot0 = valuesArray[Math.floor(Math.random() * (valuesArray.length - 1))];
                callback(JSON.stringify(tick));
            };


            function getColorData(min, max, minColor, maxColor) {
                globalMin = typeof min !== 'undefined' ? min : globalMin;
                globalMax = typeof max !== 'undefined' ? max : globalMax;
                globalMinColor = typeof minColor !== 'undefined' ? minColor : globalMinColor;
                globalMaxColor = typeof maxColor !== 'undefined' ? maxColor : globalMaxColor;
                return [{
                    "rule": "%v < " + globalMin,
                    "background-color": '#C0C0C0'
                }, {
                    "rule": "%v >= " + globalMin + "  && %v <= " + globalMax,
                    "background-color": globalMinColor
                }, {
                    "rule": "%v > " + globalMax,
                    "background-color": globalMaxColor
                }]
            }

            /*
             * Global function at the window level due to example being used in
             * an iframe
             */
            window.updateRules = function(form) {
                try {
                    // grab form values
                    var minValue = form.querySelector('#min-threshold').value;
                    var maxValue = form.querySelector('#max-threshold').value;
                    var minColor = form.querySelector('#min-threshold-color').value;
                    var maxColor = form.querySelector('#max-threshold-color').value;

                    // minimally update the chart by updating the rules only
                    zingchart.exec('myChart', 'modify', {
                        data: {
                            plot: {
                                rules: getColorData(minValue, maxValue, minColor, maxColor)
                            }
                        }
                    });
                }
                catch (e) {
                    // make sure if error form doesn't submit
                }

                return false; // return false to prevent default behavior of form submission
            }


            /*
             * assign event listeners for buttons */

            document.getElementById('start').addEventListener('click', startGraph);
            document.getElementById('stop').addEventListener('click', stopGraph);

            function startGraph() {
                zingchart.exec('myChart', 'startfeed');
            }

            function stopGraph() {
                zingchart.exec('myChart', 'stopfeed');
            }
        });
    });


}]);

/* global angular*/
/* global zingchart */

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
          
            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.iyear) }).sort((a, b) => a - b)
            
            for (var i = 0; i < conjuntoOPA1.length; i++) {
                
                for (var j = 0; j < response.data.length; j++) {
           
                    if (conjuntoOPA1[i] == response.data[j].iyear) {
                
                        conjuntoDEPA1[i] = response.data[j].nkill;
                    }
                }
            }


            var nuevoarray = conjuntoOPA.concat(conjuntoOPA1);


            // value for feed
            var valuesArray = nuevoarray;
            var globalMin = 1980;
            var globalMax = 2009;
            var globalMinColor = '#F44336';
            var globalMaxColor = '#2196F3';
            var myConfig = {
                type: 'area',
                shapes: [{
                    type: 'rectangle',
                    height: 100,
                    width: 20,
                    x: conjuntoOPA,
                    y: conjuntoDEPA,
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
                    label: { text: 'DATA COMBINATION' }
                },
                scaleY: {
                    format: 'years',
                    label: { text: 'YEARS' }
                },
                refresh: {
                    type: "feed",
                    transport: "js",
                    url: "feed()",
                    interval: 100,
                    resetTimeout: 1000
                },
                series: [{
                    values: []
                }]
            }

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: '95%',
                width: '120%'
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

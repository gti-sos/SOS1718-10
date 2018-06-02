angular.module("Principal").controller("integration4Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration4 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiFran = 'https://sos1718-10.herokuapp.com/proxyFGGF';


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
                    conjuntoDEPA[i] = response.data[j].country;
                }
            }
        }

        $http.get(apiFran).then(function(response) {
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
                        conjuntoDEPA1[i] = response.data[j].state;
                    }
                }
            }






            var conjuntoObjetos = [];
            for (var y = 0; y < conjuntoOPA.length; y++) { //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {};
                object["country"] = conjuntoDEPA[y];
                object["visits"] = conjuntoOPA[y];
                conjuntoObjetos.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos}


            }
            for (var y = 0; y < conjuntoOPA1.length; y++) { //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {}
                object["country"] = conjuntoDEPA1[y];
                object["visits"] = conjuntoOPA1[y];
                conjuntoObjetos.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos}


            }


            console.log("BOOLO: " + conjuntoDEPA1)
            console.log("BOOLO: " + conjuntoOPA1)
            console.log("BOOLO: " + conjuntoObjetos)


            var chart = AmCharts.makeChart("chartdiv", {
                "type": "serial",
                "theme": "light",
                "dataProvider": conjuntoObjetos,
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "visits"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "country",
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                    "enabled": true
                }

            });
        });
    });

}]);

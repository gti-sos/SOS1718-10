/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/

angular.module("Principal").controller("integration2Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration2 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiWeather = 'https://sos1718fgg-elbolo-sos171810fgg.c9users.io/proxyFGGW';

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

        $http.get(apiWeather).then(function(responseDN) {
            console.log("responseDN:", responseDN.data.data["name_es"]);

            var conjunto1 = {};
            var nameNumber = responseDN.data.data["name_es"].split(",").length + 3000;

            var objectGP = {};
            objectGP["label"] = conjuntoOPA[z];
            objectGP["y"] = conjuntoDEPA[z];
            conjuntoObjetos.push(object);


            //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
            //1º Guardamos en una variable el conjunto de los años ordenados
            var nombres = response.data.name_es.length;

            //2ºRecorremos el conjunto ordenado
            console.log(nombres);
            for (var i = 0; i < nombres.length; i++) {
                //3º Recorremos el response.data en busca de la edad que corresponden a cada año
                for (var j = 0; j < response.data.length; j++) {
                    //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                    //que se encuentra en esa posicion en el conjunto ordenado
                    if (nombres[i] == response.data[j].name_es) {
                        console.log(nombres);
                        //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                        //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                        conjuntoDEPA1[i] = response.data[j].day;
                        console.log(conjuntoDEPA1);
                    }
                }
            }

            var myConfig = {
                "type": "venn",
                "series": [{
                        "values": conjuntoOPA1,
                        "join": conjuntoDEPA1
                    }
                    /*,
                                        {
                                            "values": conjuntoOPA1,
                                            "join": conjuntoDEPA1
                                        }*/
                ]

            };
            console.log(conjuntoOPA1);
            // console.log(conjuntoOPA1);
            console.log(conjuntoDEPA1);
            //console.log(conjuntoDEPA1);

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: "100%",
                width: "100%"
            });
            console.log(myConfig);
        });

    });

}]);

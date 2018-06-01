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




            var conjuntoObjetos = []
            for (var z = 0; z < conjuntoDEPA.length; z++) {

                var objectGP = {};

                objectGP["values"] = [conjuntoDEPA[z]];
                objectGP["join"] = [conjuntoOPA[z]];
                conjuntoObjetos.push(objectGP);
            }

            var objectDN = {};
            var nameNumber = [responseDN.data.data["name_es"].split(",").length + 3000];
            objectDN["values"] = [100];
            objectDN["join"] = nameNumber;

            conjuntoObjetos.push(objectDN);




            var myConfig = {
                "type": "venn",
                "series": conjuntoObjetos

            };
            console.log(myConfig);

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: "60%",
                width: "90%"
            });
            console.log(myConfig);
        });

    });

}]);

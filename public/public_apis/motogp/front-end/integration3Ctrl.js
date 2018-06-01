angular.module("Principal").controller("integration3Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration3 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var tvmaze = "https://api.tvmaze.com/search/people?q=lauren";

    $scope.data = {};
    var dataCache = {};
    $scope.name = [];
    $scope.datos2 = [];
    $scope.dataBirth = {};

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
        $http.get(tvmaze).then(function(response) {

            dataCache = response.data;
            $scope.data = dataCache;
            console.log(dataCache)



            for (var i = 0; i < $scope.dataBirth.length; i++) {
                var ar = [];
                console.log($scope.data[i]);
                $scope.datos2.push({ "varied": conjuntoOPA[i], "name": $scope.data[i].person.name });


            }

            var conjuntoObjetos = []
            for (var z = 0; z < conjuntoOPA.length; z++) {
                //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {};
                object["label"] = conjuntoOPA[z];
                object["y"] = conjuntoDEPA[z];
                conjuntoObjetos.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos
            }

            /*var conjuntoObjetos1 = []
             for (var z = 0; z < $scope.dataBirth.length; z++) {
                 //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                 //que es la forma en la que recibe los datos la gráfica 
                 var object = {};
                 object["label"] = conjuntoOPA[z];
                 object["y"] = $scope.data[i].person.name[z];
                 conjuntoObjetos1.push(object);
                 //Este conjuntoObjetos sería el conjunto final que devoleríamos
             }*/




            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Recruitment Analysis - July 2016"
                },
                data: [{
                    type: "funnel",
                    indexLabel: "{label} - {y}",
                    toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                    neckWidth: 20,
                    neckHeight: 0,
                    valueRepresents: "area",
                    dataPoints: 
                        conjuntoObjetos
                        //conjuntoObjetos1
                    

                }]

            });
            console.log(conjuntoObjetos);
            //console.log(conjuntoObjetos1);
            calculatePercentage();
            chart.render();

            function calculatePercentage() {
                var dataPoint = chart.options.data[0].dataPoints;
                var total = dataPoint[0].y;
                for (var i = 0; i < dataPoint.length; i++) {
                    if (i == 0) {
                        chart.options.data[0].dataPoints[i].percentage = 100;
                    }
                    else {
                        chart.options.data[0].dataPoints[i].percentage = ((dataPoint[i].y / total) * 100).toFixed(2);
                    }
                }
            }
        });

    });


}]);

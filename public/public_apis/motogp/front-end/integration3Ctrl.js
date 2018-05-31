angular.module("Principal").controller("integration3Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration3 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var tvmaze = "https://api.tvmaze.com/search/people?q=lauren";

    $scope.data = {};
    var dataCache = {};
    $scope.name = [];
    $scope.datos2 = [];

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






            chart = AmCharts.makeChart("chartpaco", {
                "type": "serial",
                "theme": "dark",
                "dataProvider": $scope.datos2,
                "valueAxes": [{
                    "gridColor": 'green',
                    "gridAlpha": 0.2,
                    "dashLength": 0
                }],
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "varied"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "name",
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                    "enabled": false
                }

            });
        });
    });


}]);

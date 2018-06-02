angular.module("Principal").controller("integration3Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration3 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiIsma = 'https://sos1718-07.herokuapp.com/api/v1/attacks-data';


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
                    conjuntoDEPA[i] = response.data[j].pilot;
                }
            }
        }

        $http.get(apiIsma).then(function(response) {
            var conjuntoDEPA1 = []
            //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
            //1º Guardamos en una variable el conjunto de los años ordenados
            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.killed) }).sort((a, b) => a - b)
            //2ºRecorremos el conjunto ordenado
            for (var i = 0; i < conjuntoOPA1.length; i++) {
                //3º Recorremos el response.data en busca de la edad que corresponden a cada año
                for (var j = 0; j < response.data.length; j++) {
                    //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                    //que se encuentra en esa posicion en el conjunto ordenado
                    if (conjuntoOPA1[i] == response.data[j].killed) {
                        //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                        //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                        conjuntoDEPA1[i] = response.data[j].country;
                    }
                }
            }








            var conjuntoObjetos = [];
            for (var y = 0; y < conjuntoOPA.length; y++) { //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {};
                object["label"] = conjuntoDEPA[y];
                object["y"] = conjuntoOPA[y];
                conjuntoObjetos.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos}


            }
            var conjuntoObjetos1 = []
            for (var z = 0; z < conjuntoOPA1.length; z++) {
                //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {};
                object["label"] = conjuntoDEPA1[z];
                object["y"] = conjuntoOPA1[z];
                conjuntoObjetos.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos
            }




            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "MotoGP & Attacks"
                },
                data: [{
                    type: "funnel",
                    indexLabel: "{label} - {y}",
                    toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                    neckWidth: 20,
                    neckHeight: 0,
                    valueRepresents: "area",
                    dataPoints: conjuntoObjetos
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

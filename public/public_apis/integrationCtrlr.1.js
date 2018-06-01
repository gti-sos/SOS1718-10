angular.module("Principal").controller("integrationCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("integrationCtrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiBuses = "/api/v1/buses";
    var apiBuilders = "/api/v1/builders";

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
                    conjuntoDEPA[i] = response.data[j].score;
                }
            }

        }
        console.log("tito:" + conjuntoDEPA);
        console.log("tito2:" + conjuntoOPA);

        $http.get(apiBuilders).then(function(response) {
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
                        conjuntoDEPA1[i] = response.data[j].victory;
                    }
                }

            }
            console.log("tito1:" + conjuntoDEPA1);
            console.log("tito2:" + conjuntoOPA1);

            $http.get(apiBuses).then(function(response) {
                var conjuntoDEPA2 = []
                //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
                //1º Guardamos en una variable el conjunto de los años ordenados
                var conjuntoOPA2 = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
                //2ºRecorremos el conjunto ordenado
                for (var i = 0; i < conjuntoOPA2.length; i++) {
                    //3º Recorremos el response.data en busca de la edad que corresponden a cada año
                    for (var j = 0; j < response.data.length; j++) {
                        //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                        //que se encuentra en esa posicion en el conjunto ordenado
                        if (conjuntoOPA2[i] == response.data[j].year) {
                            //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                            //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                            conjuntoDEPA2[i] = response.data[j].transportedTraveler;
                        }
                    }

                }
                console.log("tito2:" + conjuntoDEPA2);
                console.log("tito2:" + conjuntoOPA2);


                //Creamos un solo objeto y a ese mismo le vamos metiendo varias claves (y, label) y sus valores para cada caso
                //sustituyendo en cada caso el valor correspondiente de conjuntoOPA[z] y conjuntoDePuntos[z]
                //y en un conjunto de objetos vamos guardando cada objeto creado de la forma {label:2000, y:15}
                var conjuntoObjetos = []
                for (var z = 0; z < conjuntoOPA.length; z++) {
                    //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                    //que es la forma en la que recibe los datos la gráfica 
                    var object = {};
                    object["x"] = conjuntoOPA[z];
                    object["y"] = conjuntoDEPA[z];
                    conjuntoObjetos.push(object);

                    //Este conjuntoObjetos sería el conjunto final que devoleríamos
                }
                console.log("titobolo:" + conjuntoObjetos);

                var conjuntoObjetos1 = []
                for (var z = 0; z < conjuntoOPA.length; z++) {
                    //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                    //que es la forma en la que recibe los datos la gráfica 
                    var object = {};
                    object["x"] = conjuntoOPA1[z];
                    object["y"] = conjuntoDEPA1[z];
                    conjuntoObjetos1.push(object);

                    //Este conjuntoObjetos sería el conjunto final que devoleríamos
                }
                console.log("titodavi:" + conjuntoObjetos1);

                var conjuntoObjetos2 = []
                for (var z = 0; z < conjuntoOPA.length; z++) {
                    //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                    //que es la forma en la que recibe los datos la gráfica 
                    var object = {};
                    object["x"] = conjuntoOPA2[z];
                    object["y"] = conjuntoDEPA2[z];
                    conjuntoObjetos2.push(object);

                    //Este conjuntoObjetos sería el conjunto final que devoleríamos
                }
                console.log("titotolo:" + conjuntoObjetos2);

                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    theme: "light2",
                    title: {
                        text: "MotoGP , Builders & Buses"
                    },
                    axisX: {
                        valueFormatString: ""
                        
                    },
                    axisY: {
                        prefix: "",
                        labelFormatter: addSymbols
                    },
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor: "pointer",
                        itemclick: toggleDataSeries
                    },
                    data: [{
                            type: "column",
                            name: "MotoGP",
                            showInLegend: true,
                            xValueFormatString: "Score",
                            yValueFormatString: "#,##0",
                            dataPoints: conjuntoObjetos
                        },

                        {
                            type: "line",
                            name: "Builders",
                            showInLegend: true,
                            yValueFormatString: "$#,##0",
                            dataPoints: conjuntoObjetos1
                        },
                        {
                            type: "area",
                            name: "Buses",
                            markerBorderColor: "white",
                            markerBorderThickness: 2,
                            showInLegend: true,
                            yValueFormatString: "$#,##0",
                            dataPoints: conjuntoObjetos2
                        }

                    ]

                });
                chart.render();


                function addSymbols(e) {
                    var suffixes = ["", "K", "M", "B"];
                    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);

                    if (order > suffixes.length - 1)
                        order = suffixes.length - 1;

                    var suffix = suffixes[order];
                    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
                }

                function toggleDataSeries(e) {
                    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    }
                    else {
                        e.dataSeries.visible = true;
                    }
                    e.chart.render();
                }



            });

        });
    });
}]);

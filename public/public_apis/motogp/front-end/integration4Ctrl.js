angular.module("Principal").controller("integration4Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration4 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiAlvarito = 'https://sos1718-09.herokuapp.com/api/v2/spanish-universities';


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

        $http.get(apiAlvarito).then(function(response) {
            var conjuntoDEPA1 = []
            //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
            //1º Guardamos en una variable el conjunto de los años ordenados
            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.yearFund) }).sort((a, b) => a - b)
            //2ºRecorremos el conjunto ordenado
            for (var i = 0; i < conjuntoOPA1.length; i++) {
                //3º Recorremos el response.data en busca de la edad que corresponden a cada año
                for (var j = 0; j < response.data.length; j++) {
                    //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                    //que se encuentra en esa posicion en el conjunto ordenado
                    if (conjuntoOPA1[i] == response.data[j].yearFund) {
                        //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                        //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                        conjuntoDEPA1[i] = response.data[j].headquar;
                    }
                }
            }
            
            console.log("alvaro:" + conjuntoDEPA1);








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
                conjuntoObjetos1.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos
            }
            console.log("alvaro:" + conjuntoObjetos1);

            var myConfig = {
                "graphset": [{
                        "height": "10%",
                        "background-color": "white",
                        "title": {
                            "background-color": "white",
                            "text": "Congo - 2020",
                            "text-align": "left",
                            "offset-x": "45",
                            "offset-y": -6,
                            "color": "#05669D",
                            "font-size": 40,
                            "font-family": "Helvetica",
                            "font-weight": "bold"
                        },
                        "subtitle": {
                            "text": "<span style='font-weight:none;'>Population:</span> <span style='font-size:40;font-weight:bold;'>5,267,000</span>",
                            "text-align": "right",
                            "offset-x": -35,
                            "offset-y": -6,
                            "font-weight": "none",
                            "font-family": "Helvetica",
                            "color": "#05669D"
                        },
                        "labels": [{
                                "text": "BOLO",
                                "color": "white",
                                "font-size": 52,
                                "font-family": "Helvetica",
                                "font-weight": "bold",
                                "x": "20%",
                                "y": "130"
                            },
                            {
                                "text": "ALVARO",
                                "color": "white",
                                "font-size": 52,
                                "font-family": "Helvetica",
                                "font-weight": "bold",
                                "x": "60%",
                                "y": "130"
                            }
                        ]
                    },
                    {
                        "type": "pop-pyramid",
                        "y": "10%",
                        "height": "90%",
                        "background-color": "white",
                        "options": {
                            "aspect": "varea",
                            "label-placement": "side",
                            "side-2": {
                                "plotarea": {
                                    "background-color": "#D156BF"
                                },
                                "source": {
                                    "x": "-10%",
                                    "y": "95%",
                                    "font-size": 9,
                                    "font-weight": "none",
                                    "text": "Source: United Nations, Department of Economic and Social Affairs,<br>Population Division. World Population Prospects: The 2012 Revision."
                                }
                            }
                        },
                        "legend": {
                            "visible": false
                        },
                        "tooltip": {
                            "background-color": "white",
                            "border-width": 1,
                            "border-color": "#05669D",
                            "border-radius": 3,
                            "shadow": false,
                            "color": "#05669D",
                            "text": "%v%"
                        },
                        "plot": {
                            "stacked": true
                        },
                        "plotarea": {
                            "margin-top": 10,
                            "background-color": "#05669D"
                        },
                        "scale-x": {
                            "guide": {
                                "line-color": "white",
                                "line-width": 2,
                                "line-style": "solid",
                                "alpha": 0.5
                            },
                            "tick": {
                                "visible": false
                            },
                            "item": {
                                "text-align": "middle",
                                "color": "white",
                                "offset-x": 38,
                                "offset-y": -8,
                                "font-size": 9
                            },
                            "items-overlap": true,
                            "values": conjuntoOPA
                        },
                        "scale-y": {
                            "line-width": 1,
                            "line-color": "black",
                            "format": "%v%",
                            "item": {

                                "color": "white",
                                "font-size": 9,
                                "offset-y": -20,
                                "rules": [{
                                        "rule": "%i == 4",
                                        "visible": false
                                    },
                                    {
                                        "rule": "%i == 0",
                                        "visible": false
                                    }
                                ]
                            },
                            "tick": {
                                "offset-y": -10,
                                "line-color": "white",
                                "alpha": 0.5
                            },
                            "guide": {
                                "visible": false
                            },
                            "short": true,
                            "values": "0:10:2.5"
                        },
                        "series": [{
                                "data-side": 1,
                                "background-color": "white",
                                "alpha-area": 0.8,
                                "line-color": "white",
                                "line-width": 1,
                                "marker": {
                                    "visible": false
                                },
                                "values": conjuntoObjetos
                            },
                            {
                                "data-side": 2,
                                "background-color": "white",
                                "alpha-area": 0.8,
                                "line-color": "white",
                                "line-width": 1,
                                "marker": {
                                    "visible": false
                                },
                                "values": parseInt(conjuntoOPA1)
                            }
                        ]
                    }
                ]
            };

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: 500,
                width: 725
            });
        });



    });


}]);

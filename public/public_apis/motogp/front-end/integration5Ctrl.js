angular.module("Principal").controller("integration5Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration5 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiBloc = 'https://mcapi.ca/blockedservers';


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

        $http.get(apiBloc).then(function(response) {

            console.log("bloc" + response)

            var array = response.data;

            console.log("bloc1" + response)







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


            console.log("BOOLO: " + conjuntoDEPA1)
            console.log("BOOLO: " + conjuntoOPA1)
            console.log("BOOLO: " + conjuntoObjetos)

            var myConfig = {
                "type": "venn",
                "title": {
                    "text": "MotoGP & Global Terrorism"
                },
                legend: {
                    toggleAction: 'remove', // remove plot so it re-calculates percentage
                    verticalAlign: 'middle',
                    align: 'right',
                    layout: 'vertical',
                    borderWidth: 0,
                    marker: {
                        type: 'circle',
                        size: 10,
                        cursor: 'pointer',
                    },
                    item: {
                        fontSize: 15,
                        cursor: 'pointer',
                        offsetX: -5
                    }
                },
                "tooltip": {
                    "text": "%t",
                    "border-radius": 5,
                    "font-size": 15
                },
                "series": conjuntoObjetos
            };

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: '100%',
                width: "100%"
            });

        });
    });


}]);

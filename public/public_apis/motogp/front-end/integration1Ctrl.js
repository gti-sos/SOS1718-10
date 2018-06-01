/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/

angular.module("Principal").controller("integration1Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration1 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var meal = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian';

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

        $http.get(meal).then(function(response) {
            console.log(response);
            var conjuntoDEPA1 = [];
            var conjuntoOPA1 = [];
            var conjuntoOPA2 = [];
            //con este método sacamos la edad ordenada correctamente con su correspondiente año ordenado
            //1º Guardamos en una variable el conjunto de los años ordenados
            var array = response.data.meals;
            console.log("el bolo: " + array);

            for (var x = 0; x < array.length; x++) {
                conjuntoOPA1.push(array[x].idMeal);
                co
            }
            console.log("el bolo 1:" + conjuntoOPA1);



            //2ºRecorremos el conjunto ordenado
            for (var i = 0; i < conjuntoOPA1.length; i++) {
                //3º Recorremos el response.data en busca de la edad que corresponden a cada año
                for (var j = 0; j < response.data.length; j++) {
                    //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                    //que se encuentra en esa posicion en el conjunto ordenado
                    if (conjuntoOPA1[i] == response.data[j].idMeal) {
                        console.log(conjuntoOPA1);
                        //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                        //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                        conjuntoDEPA1[i] = response.data[j].strMeal;
                        console.log(conjuntoDEPA1);
                    }
                }
            }

            //Creamos un solo objeto y a ese mismo le vamos metiendo varias claves (y, label) y sus valores para cada caso
            //sustituyendo en cada caso el valor correspondiente de conjuntoOPA[z] y conjuntoDePuntos[z]
            //y en un conjunto de objetos vamos guardando cada objeto creado de la forma {label:2000, y:15}
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


            //Creamos un solo objeto y a ese mismo le vamos metiendo varias claves (y, label) y sus valores para cada caso
            //sustituyendo en cada caso el valor correspondiente de conjuntoOPA1[z] y conjuntoDePuntos1[z]
            //y en un conjunto de objetos vamos guardando cada objeto creado de la forma {label:2000, y:15}
            var conjuntoObjetos1 = []
            for (var z = 0; z < conjuntoOPA1.length; z++) {
                //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {};
                object["label"] = conjuntoOPA1[z];
                object["y"] = conjuntoDEPA1[z];
                conjuntoObjetos1.push(object);
                //Este conjuntoObjetos sería el conjunto final que devoleríamos
            }
            var chart = new CanvasJS.Chart("chartContainer", {
                theme: "light1", // "light1", "ligh2", "dark1", "dark2"
                animationEnabled: true,
                title: {
                    text: "MotoGP & Meal"
                },
                axisY: {
                    title: "Said X",
                    prefix: "",
                    lineThickness: 0,
                    suffix: ""
                },
                data: [{
                    type: "waterfall",
                    indexLabel: "{y}",
                    indexLabelFontColor: "#EEEEEE",
                    indexLabelPlacement: "inside",
                    yValueFormatString: "",
                    dataPoints: conjuntoObjetos,
                    conjuntoObjetos1


                }]

            });
            console.log(conjuntoObjetos);
            console.log(conjuntoObjetos1);
            chart.render();
        });

    });

}]);

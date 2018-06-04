/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/
/*global CanvasJS*/

angular.module("Principal").controller("integration1Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration1 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var meal = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian';

    $http.get(apiMotogp).then(function(response) {
        var conjuntoDEPA = []
   
        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
       
        for (var i = 0; i < conjuntoOPA.length; i++) {
           
            for (var j = 0; j < response.data.length; j++) {
                
                if (conjuntoOPA[i] == response.data[j].year) {
                    
                    conjuntoDEPA[i] = response.data[j].pilot;
                }
            }
            console.log("tito:" + conjuntoDEPA);
        }

        $http.get(meal).then(function(response) {
            console.log(response);

            var conjuntoOPA1 = [];
            var conjuntoOPA2 = [];
            
            var array = response.data.meals;
            console.log("el bolo: " + array);

            for (var x = 0; x < array.length; x++) {
                conjuntoOPA1.push(array[x].idMeal);
                conjuntoOPA2.push(array[x].strMeal);
            }
            console.log("el bolo 1:" + conjuntoOPA1);
            console.log("el bolo 1:" + conjuntoOPA2);


            
            var conjuntoObjetos = []
            for (var z = 0; z < conjuntoOPA.length; z++) {
               
                var object = {};
                object["label"] = conjuntoDEPA[z];
                object["y"] = conjuntoOPA[z];
                conjuntoObjetos.push(object);
                
            }


            
           
            for (var z = 0; z < conjuntoOPA1.length; z++) {
                
                var object = {};
                object["label"] = conjuntoOPA2[z];
                object["y"] = parseInt(conjuntoOPA1[z]);
                conjuntoObjetos.push(object);
                
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
                    dataPoints: conjuntoObjetos


                }]

            });
            console.log(conjuntoObjetos);

            chart.render();
        });

    });

}]);

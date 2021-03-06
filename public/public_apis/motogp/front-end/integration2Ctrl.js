/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/
/*global zingchart*/

angular.module("Principal").controller("integration2Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration2 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiWeather = 'https://sos1718-10.herokuapp.com/proxyFGGW';

    $http.get(apiMotogp).then(function(response) {
        var conjuntoDEPA = []

        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)

        for (var i = 0; i < conjuntoOPA.length; i++) {

            for (var j = 0; j < response.data.length; j++) {

                if (conjuntoOPA[i] == response.data[j].year) {

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
            var nameNumber = [responseDN.data.data["name_es"].split(",").length + 0];
            var day = [responseDN.data.data["day"]];
            objectDN["values"] = nameNumber;
            objectDN["join"] = day;

            conjuntoObjetos.push(objectDN);




            var myConfig = {
                type: 'ring',
                plot: {
                    slice: 100, // set hole size in middle of chart
                    detached: false // turn off click on slices
                },
                tooltip: {
                    visible: false
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
                series: conjuntoObjetos
            };

            zingchart.render({
                id: 'myChart',
                data: myConfig,
                height: 500,
                width: '100%'
            });

            /*
             * Every 35 milliseconds we will update the chart
             * angle by 1.5 degress so it simulates rotatition
             * animation! 
             */
            var angle = 0;
            setInterval(function() {
                angle = angle + 1.5;
                zingchart.exec('myChart', 'modify', {
                    object: 'plot',
                    data: {
                        refAngle: angle % 360
                    }
                })
            }, 35);
            console.log(myConfig);
        });

    });

}]);

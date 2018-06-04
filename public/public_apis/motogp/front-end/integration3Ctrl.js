angular.module("Principal").controller("integration3Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration3 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiIsma = 'https://sos1718-07.herokuapp.com/api/v1/attacks-data';


    $http.get(apiMotogp).then(function(response) {
        var conjuntoDEPA = []


        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)

        for (var i = 0; i < conjuntoOPA.length; i++) {

            for (var j = 0; j < response.data.length; j++) {

                if (conjuntoOPA[i] == response.data[j].year) {

                    conjuntoDEPA[i] = response.data[j].pilot;
                }
            }
        }

        $http.get(apiIsma).then(function(response) {
            var conjuntoDEPA1 = []

            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.killed) }).sort((a, b) => a - b)

            for (var i = 0; i < conjuntoOPA1.length; i++) {

                for (var j = 0; j < response.data.length; j++) {

                    if (conjuntoOPA1[i] == response.data[j].killed) {

                        conjuntoDEPA1[i] = response.data[j].country;
                    }
                }
            }


            var conjuntoObjetos = [];
            for (var y = 0; y < conjuntoOPA.length; y++) {
                var object = {};
                object["label"] = conjuntoDEPA[y];
                object["y"] = conjuntoOPA[y];
                conjuntoObjetos.push(object);



            }
            var conjuntoObjetos1 = []
            for (var z = 0; z < conjuntoOPA1.length; z++) {

                var object = {};
                object["label"] = conjuntoDEPA1[z];
                object["y"] = conjuntoOPA1[z];
                conjuntoObjetos.push(object);

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

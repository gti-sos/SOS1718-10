/*global angular*/
/*global google*/

angular
    .module("Principal")
    .controller("IntegracionFinalII", ["$scope", "$http", function($scope, $http) {
        console.log("integracion controller initialized");

        /*eliminar eltos. duplicados*/

        Array.prototype.unique = function(a) {
            return function() { return this.filter(a) }
        }(function(a, b, c) {
            return c.indexOf(a, b + 1) < 0
        });

        /*ordenar array*/

        Array.prototype.sortNumbers = function() {
            return this.sort(
                function(a, b) {
                    return a - b
                }
            );
        }

        var c = [];
        var d;
        var googleDataInt = [
            ["Country", "Result"]
        ];

        $http.get("/api/v1/buses").then(function(response) {

            var busyear = []
            var bustrans = []
            for (var i = 0; i < response.data.length; i++) {
                busyear.push(response.data[i].country)
                bustrans.push(response.data[i].transportedTraveler);

            }

            console.log(busyear);
            console.log(bustrans)

            var conjuntoObjetos2 = []
            for (var z = 0; z < bustrans.length; z++) {
                //Creamos un objeto para almacenar en un array el conjunto de objetos de la forma {label:2000, y:15}
                //que es la forma en la que recibe los datos la gráfica 
                var object = {};
                object["x"] = busyear[z];
                object["y"] = parseInt(bustrans[z]);
                conjuntoObjetos2.push(object);

                console.log("TOLDO:" + conjuntoObjetos2)









                //console.log(aBuses);

                $http.get("https://api.nexchange.io/en/api/v1/currency").then(function(responseRest) {
                    console.log("1:" + responseRest.data)
                    for (var i = 0; i < responseRest.data.length; i++) {
                        c.push([responseRest.data[i].name, responseRest.data[i].min_confirmations]);



                    }
                    console.log("HOLAAAA" + c);

                    googleDataInt.push(c);
                    console.log(googleDataInt);


                    google.charts.load('current', { packages: ['corechart', 'bar'] });
                    google.charts.setOnLoadCallback(drawBasic);

                    function drawBasic() {
                        var data = google.visualization.arrayToDataTable(c,conjuntoObjetos2, []);
                        var options = {
                            title: 'Virtual ',
                            chartArea: {
                                width: "50 %",
                                height: "500px"
                            },
                            hAxis: {
                                title: 'Transported Travelers',
                                minValue: 0
                            },
                            vAxis: {
                                title: 'Name '
                            }
                        };
                        var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
                        chart.draw(data, options);
                    }

                });
            }
        });
    }]);

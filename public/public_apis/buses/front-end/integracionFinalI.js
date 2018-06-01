/*global angular*/
/*global google*/

angular
    .module("Principal")
    .controller("IntegracionFinalI", ["$scope", "$http", function($scope, $http) {
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
        var n = [];
        var t = [];
        var p = [];
        var union = [];
        var googleDataInt = [
            ["Country", "Population"]
        ];

        $http.get("/api/v1/buses").then(function(responseBuses) {

            for (var i = 0; i < responseBuses.data.length; i++) {
                c.push([responseBuses.data[i].country,responseBuses.data[i].transportedTraveler]);
            
                //  t.push();
            }
            console.log("HOLA CABESA")
            console.log(c);





            $http.get("https://restcountries.eu/rest/v2/all").then(function(responseRest) {
                for (var i = 0; i < responseRest.data.length; i++) {
                    c.push([responseRest.data[i].name, responseRest.data[i].population]);


                }



                console.log("FINALLLLL");
                console.log(c);

                googleDataInt.push(c);
                console.log(googleDataInt);


                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = google.visualization.arrayToDataTable(c);

                    var options = {
                        colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
                        backgroundColor: '#81d4fa',
                        datalessRegionColor: '#f8bbd0',
                        defaultColor: '#f5f5f5',
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
                    chart.draw(data, options);
                };

            });

        });
    }]);

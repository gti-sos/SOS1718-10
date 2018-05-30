/*global angular*/
/*global google*/

angular
    .module("Principal")
    .controller("JugadoresIntegracionCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("MainCtrl initialized");
        var ArsenalPlayers = "https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t=Arsenal";

        $http
            .get(ArsenalPlayers)
            .then(function(response) {
              
                var nationality = response.data.map(function(d) { return d.player });
                console.log("Nacionalidades: " + nationality);

                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawMarkersMap);

                function drawMarkersMap() {
                    var data = google.visualization.arrayToDataTable([nationality]);

                    var options = {
                        region: 'IT',
                        displayMode: 'markers',
                        colorAxis: { colors: ['green', 'blue'] }
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('integrationPlayers'));
                    chart.draw(data, options);
                };
            });

    }]);

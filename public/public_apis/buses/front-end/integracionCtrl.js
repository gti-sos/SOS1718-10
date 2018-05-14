/*global angular*/
/*global Highcharts*/

angular
    .module("BusesApp")
    .controller("IntegracionCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("integracion controller initialized");
        
      


        $http.get("/api/v1/buses").then(function(response) {

            var aBuses = [];
            var conjuntoBus = response.data.map(function(d) { return parseInt(d.year) })

            for (var i = 0; i < conjuntoBus.length; i++) {

                for (var j = 0; j < response.data.length; j++) {

                    if (conjuntoBus[i] == response.data[j].year) {

                        aBuses[i] = response.data[j].community;
                    }
                }
            }

            $http.get("https://sos1718-09.herokuapp.com/api/v2/open-source-contests").then(function(response) {
                var aOpen = [];

                var conjuntoOpen = response.data.map(function(d) { return parseInt(d.year) })

                for (var i = 0; i < conjuntoOpen.length; i++) {

                    for (var j = 0; j < response.data.length; j++) {

                        if (conjuntoOpen[i] == response.data[j].year) {

                            aOpen[i] = response.data[j].autCommunity;
                        }
                    }
                }

                Highcharts.chart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Integracion'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: response.data.map(function(d) { return parseInt(d.year) })
                        
                    },
                    yAxis: {
                        title: {
                            text: 'community'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        }
                    },
                    series: [{
                        name: 'buses',
                        data: aBuses
                    }, {
                        name: 'integracion',
                        data: aOpen
                    }]
                });

            });

        });
    }]);

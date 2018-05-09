angular
    .module("BusesApp")
    .controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("main controller initialized");


        $http.get("/api/v1/buses").then(function(response) {


            Highcharts.chart('analytics', {

                title: {
                    text: 'Buses'
                },

                yAxis: {
                    min:0,
                    tickInterval:4,
                    tickOptions:{
                        formatString: '%d'
                    },
                    
                    title: {
                        text: 'Transported Traveler'
                    }
                },
                xAxis: {
                    categories: response.data.map(function(d) { return d.transportedTraveller })
                },

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },

                series: [{
                    name: 'transportedTraveller',
                    data: response.data.map(function(d) { return d.year })
                }]


            });

        });



    }]);

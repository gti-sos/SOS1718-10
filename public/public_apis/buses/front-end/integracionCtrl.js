angular
    .module("BusesApp")
    .controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
                console.log("main controller initialized");


                $http.get("/api/v1/buses").then(function(response) {
                        console.log(response.data.map(function(d) { return d.transportedTraveler }));


                        Highcharts.chart('analytics', {

                            title: {
                                text: 'Buses'
                            },

                            yAxis: {

                                title: {
                                    text: 'Transported Traveler'
                                }
                            },
                            xAxis: {
                                categories: response.data.map(function(d) { return d.year })
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
                                    //pointStart: 2010
                                }
                            },

                            series: [{
                                name: 'Transported Traveler',
                                data: response.data.map(function(d) { return parseInt(d.transportedTraveler) })
                            }]

                        });
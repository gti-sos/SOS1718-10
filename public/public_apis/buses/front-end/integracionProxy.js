/*global angular*/
/*global Highcharts*/

angular
    .module("Principal")
    .controller("IntegracionProxy", ["$scope", "$http", function($scope, $http) {
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

        var years = [];

        $http.get("/api/v1/buses").then(function(responseBuses) {



            for (var i = 0; i < responseBuses.data.length; i++) {
                years.push(responseBuses.data[i].year);
            }



            //console.log(aBuses);

            $http.get("https://sos1718-10.herokuapp.com/proxyBuses").then(function(responseProxy) {
                var aOpen = [];
                var aBuses = [];

                for (var i = 0; i < responseProxy.data.length; i++) {
                    years.push(responseProxy.data[i].year);
                }
                console.log(years.sortNumbers().unique());

                for (var i = 0; i < years.sortNumbers().unique().length; i++) {
                    var acum = 0;
                    var ac = 0;
                    for (var j = 0; j < responseBuses.data.length; j++) {
                        if (responseBuses.data[j].year == years.sortNumbers().unique()[i]) {
                            ac += parseInt(responseBuses.data[j].transportedTraveler);

                        }
                    }
                    aBuses.push(ac);

                    for (var j = 0; j < responseProxy.data.length; j++) {
                        if (responseProxy.data[j].year == years.sortNumbers().unique()[i]) {
                            acum += responseProxy.data[j].rate;

                        }
                    }
                    aOpen.push(acum);
                }

                console.log(aBuses);
                console.log(aOpen);


                //console.log(years.sortNumbers().unique());



                Highcharts.chart('container', {
                    chart: {
                        type: 'scatter',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Height Versus Weight of 507 Individuals by Gender'
                    },
                    subtitle: {
                        text: 'Source: Heinz  2003'
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'years'
                        },
                        categories: years.sortNumbers().unique(),
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'mix'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 100,
                        y: 70,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                        borderWidth: 1
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<b>{series.name}</b><br>',
                                pointFormat: '{point.x}, {point.y}'
                            }
                        }
                    },
                    series: [{
                        name: 'transportedTraveler',
                        data: aBuses
                    }, {
                        name: 'capacity',
                        data: aOpen
                    }]
                });

            });

        });
    }]);

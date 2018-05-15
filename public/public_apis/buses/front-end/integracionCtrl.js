/*global angular*/
/*global Highcharts*/

angular
    .module("Principal")
    .controller("IntegracionCtrl", ["$scope", "$http", function($scope, $http) {
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

            $http.get("https://sos1718-09.herokuapp.com/api/v1/span-univ-stats").then(function(responseSpanUnivStats) {
                var aOpen = [];
                var aBuses = [];

                for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
                    years.push(responseSpanUnivStats.data[i].year);
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
                    for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                        if (responseSpanUnivStats.data[j].year == years.sortNumbers().unique()[i]) {
                            acum += responseSpanUnivStats.data[j].firstSecondCycle;
                            
                        }
                    }
                    aOpen.push(acum);
                }

            console.log(aBuses);
            console.log(aOpen);


                //console.log(years.sortNumbers().unique());


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
                        categories: years.sortNumbers().unique()
                    },
                    yAxis: {
                        title: {
                            text: 'TransFirst'
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
                        name: 'transportedTraveler',
                        data: aBuses
                    }, {
                        name: 'firstSecondCycle',
                        data: aOpen
                    }]
                });

            });

        });
    }]);

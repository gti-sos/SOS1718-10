/*global angular*/
/*global Highcharts*/

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

        var paises = [];

        $http.get("/api/v1/buses").then(function(responseBuses) {

            

            for (var i = 0; i < responseBuses.data.length; i++) {
                paises.push(responseBuses.data[i].country);
            }



            //console.log(aBuses);

            $http.get("https://restcountries.eu/rest/v2/all").then(function(responseCountries) {
                var aOpen = [];
                var aBuses = [];

                for (var i = 0; i < responseCountries.data.length; i++) {
                    paises.push(responseCountries.data[i].year);
                }
                console.log(paises.sortNumbers().unique());
                
                for (var i = 0; i < paises.sortNumbers().unique().length; i++) {
                    var acum = 0;
                    var ac = 0;
                    for (var j = 0; j < responseBuses.data.length; j++) {
                        if (responseBuses.data[j].year == paises.sortNumbers().unique()[i]) {
                            ac += parseInt(responseBuses.data[j].transportedTraveler);
                            
                        }
                    }
                    aBuses.push(ac);
                    for (var j = 0; j < responseCountries.data.length; j++) {
                        if (responseCountries.data[j].year == paises.sortNumbers().unique()[i]) {
                            acum += responseCountries.data[j].population;
                            
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
                        name: 'capacity',
                        data: aOpen
                    }]
                });

            });

        });
    }]);

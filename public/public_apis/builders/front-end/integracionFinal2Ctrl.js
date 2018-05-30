/*global angular*/
angular
    .module("Principal")
    .controller("GraphFinalCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("MainCtrl initialized");

        var apiAConsumir = "https://sos1718-10.herokuapp.com/proxyIntegracion";
        



        //////////////////////////////////////////////Highcharts///////////////////////////////
        $http
            .get(apiAConsumir)
            .then(function(response) {
                
                var añosNacimiento =  []
                var añoNacimiento = ""
                var fechasNacimiento = response.data.map(function(d) { return d.dateBorn })
                console.log("Sacamos las fechas de nacimiento : " + fechasNacimiento);

                for (var x = 0; x < fechasNacimiento.length; x++) {
                    console.log("Mostramos la fechasNacimiento[x] : " + fechasNacimiento[x])
                    añoNacimiento=fechasNacimiento[x].split("-");
                    console.log("Vamos a mostrar el año de nacimiento: " + añoNacimiento[0]);
                    añosNacimiento.push(añoNacimiento[0]);
                }
                console.log("Vamos a mostrar los años de nacimiento: " + añosNacimiento);

    


                Highcharts.chart('integrationPlayers', {
                    chart: {
                        type: 'area'
                    },
                    title: {
                        text: 'Historic and Estimated Worldwide Population Growth by Region'
                    },
                    subtitle: {
                        text: 'Source: Wikipedia.org'
                    },
                    xAxis: {
                        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Billions'
                        },
                        labels: {
                            formatter: function() {
                                return this.value / 1000;
                            }
                        }
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#666666',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#666666'
                            }
                        }
                    },
                    series: [{
                        name: 'Asia',
                        data: [502, 635, 809, 947, 1402, 3634, 5268]
                    }, {
                        name: 'Africa',
                        data: [106, 107, 111, 133, 221, 767, 1766]
                    }, {
                        name: 'Europe',
                        data: [163, 203, 276, 408, 547, 729, 628]
                    }, {
                        name: 'America',
                        data: [18, 31, 54, 156, 339, 818, 1201]
                    }, {
                        name: 'Oceania',
                        data: [2, 2, 2, 6, 13, 30, 46]
                    }]
                });

            });

    }]);

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


        var c = [];
        var n = [];
        var t = [];
        var p = [];
        var union = [];
        var googleDataInt = [
            ["Country", "Population"]
        ];

        $http.get("/api/v1/buses").then(function(responseBuses) {





            $http.get("http://apiv3.iucnredlist.org/api/v3/country/list?token=9bb4facb6d23f48efbf424bb05c0c1ef1cf6f468393bc745d42179ac4aca5fee").then(function(responseRest) {
                for (var i = 0; i < responseRest.data.length; i++) {
                    c.push([responseRest.data[i].isocode, responseRest.data[i].country]);


                }



                console.log("FINALLLLL");
                console.log(c);

                googleDataInt.push(c);
                console.log(googleDataInt);


                Highcharts.chart('container', {
                    chart: {
                        type: 'tilemap',
                        inverted: true,
                        height: '80%'
                    },

                    title: {
                        text: 'U.S. states by population in 2016'
                    },

                    subtitle: {
                        text: 'Source:<a href="https://simple.wikipedia.org/wiki/List_of_U.S._states_by_population">Wikipedia</a>'
                    },

                    xAxis: {
                        visible: false
                    },

                    yAxis: {
                        visible: false
                    },

                    colorAxis: {
                        dataClasses: [{
                            from: 0,
                            to: 1000000,
                            color: '#F9EDB3',
                            name: '< 1M'
                        }, {
                            from: 1000000,
                            to: 5000000,
                            color: '#FFC428',
                            name: '1M - 5M'
                        }, {
                            from: 5000000,
                            to: 20000000,
                            color: '#FF7987',
                            name: '5M - 20M'
                        }, {
                            from: 20000000,
                            color: '#FF2371',
                            name: '> 20M'
                        }]
                    },

                    tooltip: {
                        headerFormat: '',
                        pointFormat: 'The population of <b> {point.name}</b> is <b>{point.value}</b>'
                    },

                    plotOptions: {
                        series: {
                            dataLabels: {
                                enabled: true,
                                format: '{point.hc-a2}',
                                color: '#000000',
                                style: {
                                    textOutline: false
                                }
                            }
                        }
                    },

                    series: [c]
                });


            });

        });
    }]);

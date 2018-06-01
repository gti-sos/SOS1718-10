angular
    .module("Principal")
    .controller("IntegrationSOSSinProxy1", ["$scope", "$http", function($scope, $http) {
        console.log("IntegrationCtrl initialized");
        var apiBuilders = "/api/v1/builders";
        var apiUnemployments = "https://sos1718-02.herokuapp.com/api/v1/unemployments";


        //Función auxiliar para eliminar repetidos
        Array.prototype.unique = function(a) {
            return function() { return this.filter(a) }
        }(function(a, b, c) {
            return c.indexOf(a, b + 1) < 0
        });


        ///////////////////////////INTEGRACION SIN PROXY////////////////////////////////////
        $http.get(apiBuilders)
            .then(function(responseBuilders) {

                var buildersCountry = []
                buildersCountry = responseBuilders.data.map(function(d) { return d.country });
                //Eliminamos los duplicados
                buildersCountry = buildersCountry.unique()

                console.log("BuildersCountry: " + buildersCountry);



                $http.get(apiUnemployments)
                    .then(function(responseUnemployments) {

                        //recorremos unemployments y añadimos sus paises a buildersCountry, para posteriormente 
                        //hacerle unique y quitarle duplicados
                        responseUnemployments.data.forEach((n) => {
                            buildersCountry.push(n.country)
                        })
                        buildersCountry = buildersCountry.unique()

                        console.log("BuildersCountry con duplicados quitados: " + buildersCountry);
                        var arrayADevolver = [];
                        for (var v = 0; v < buildersCountry.length; v++) {
                            var nodo = []
                            nodo[0] = buildersCountry[v];
                            responseBuilders.data.forEach((n) => {
                                if (n.country == buildersCountry[v]) {
                                    console.log("Country actual " + n.country);
                                    console.log("Country del array: " + buildersCountry[v]);
                                    nodo[1] = n.victory;
                                    console.log("VICTORIAS: " +n.victories)
                                }
                                responseUnemployments.data.forEach((p) => {
                                    if (p.country == buildersCountry[v]) {
                                        nodo[2] = p.longterm;
                                    }
                                })
                            })
                            arrayADevolver.push(nodo);
                        }
                        console.log("ARRAY FINAL: " + arrayADevolver);




                        anychart.onDocumentReady(function() {
                            // create data set on our data
                            var dataSet = anychart.data.set(arrayADevolver);

                            // map data for the first series, take x from the zero column and value from the first column of data set
                            var data1 = dataSet.mapAs({
                                'x': 0,
                                'value': 1
                            });
                            // map data for the second series, take x from the zero column and value from the second column of data set
                            var data2 = dataSet.mapAs({
                                'x': 0,
                                'value': 2
                            });

                            // create radar chart
                            var chart = anychart.radar();

                            // set chart title text settings
                            chart.title('Comparison Chart')
                                // set chart legend
                                .legend(true);

                            // set chart padding settings
                            chart.padding().bottom(70);

                            // create first series with mapped data
                            chart.line(data1).name('BUILDERS').markers(true);
                            // create second series with mapped data
                            chart.line(data2).name('UNEMPLYMENTS').markers(true);
                            // set tooltip format
                            chart.tooltip().format('Value: {%Value}{decimalsCount: 2}');
                            // set container id for the chart
                            chart.container('integrations');
                            // initiate chart drawing
                            chart.draw();
                        });


                    });

            });


    }]);

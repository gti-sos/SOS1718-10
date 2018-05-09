angular
    .module("BuildersApp")
    .controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("MainCtrl initialized");

    

        $http
            .get("/api/v1/builders")
            .then(function(response) {
                
                var nuevoArray = []
                
                //con esto ya tenemos guardado en un array los años ordenados 
                var conjuntoOrdenadoPorAño = response.data.map(function(d) { return parseInt(d.year)}).sort()
                for (var i = 0; i<conjuntoOrdenadoPorAño.length;i++){
                    for(var j=0; j<response.data.length;j++){
                        if(conjuntoOrdenadoPorAño[i] == response.data[j].year){
                            nuevoArray[i]=response.data[j].victory;
                        }
                    }
                }
                console.log("MUestrame el nuevo array: " + nuevoArray);
                console.log("Muestrame los años ordenados: " + conjuntoOrdenadoPorAño);
                



                Highcharts.chart('analytics', {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Champions builders'
                    },
                    xAxis: {
                        
                        categories:response.data.map(function(d) { return parseInt(d.year)}).sort((a,b)=>a-b)
                        
                        },
                        title:{
                            text:'Years'
                    },
                    yAxis: {
                        min: 0,
                        tickInterval: 4,
                        tickOptions: {
                            formatString: '%d'
                        },
                        title: {
                            text: 'Victories'
                        }

                    },

                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: 'Victories',
                        data: nuevoArray
                    }]
                });

            });




    }]);

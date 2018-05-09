angular
    .module("BuildersApp")
    .controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("MainCtrl initialized");

    

        $http
            .get("/api/v1/builders")
            .then(function(response) {
                
                var conjuntoDeVictoriasOrdenadasPorAño  = []
                
                //con este método sacamos las victorias ordenadas correctamente con su correspondiente año ordenado
                //1º Guardamos en una variable el conjunto de los años ordenados
                var conjuntoOrdenadoPorAño = response.data.map(function(d) { return parseInt(d.year)}).sort((a,b)=>a-b)
                //2ºRecorremos el conjunto ordenado
                for (var i = 0; i<conjuntoOrdenadoPorAño.length;i++){
                    //3º Recorremos el response.data en busca del numero de victorias que corresponden a cada año
                    for(var j=0; j<response.data.length;j++){
                        //4º Miramos si el objeto que estamos recorriendo en ese momento es el que tiene el mismo año que el año 
                        //que se encuentra en esa posicion en el conjunto ordenado
                        if(conjuntoOrdenadoPorAño[i] == response.data[j].year){
                            //5º Si es asi guardamos en la misma posicion del año el valor del campo victorias
                            //Y asi tendriamos ordenados, en el mismo orden que los años, las victorias
                            conjuntoDeVictoriasOrdenadasPorAño[i]=response.data[j].victory;
                        }
                    }
                }
                console.log("MUestrame el nuevo array: " + conjuntoDeVictoriasOrdenadasPorAño);
                console.log("Muestrame los años ordenados: " + conjuntoOrdenadoPorAño);
                



                Highcharts.chart('analytics', {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Champions builders'
                    },
                    xAxis: {
                        //Aqui le decimos lo que debe mostrar en los intervalos del eje x ordenados cronológicamente
                        categories:response.data.map(function(d) { return parseInt(d.year)}).sort((a,b)=>a-b)
                        
                        },
                        title:{
                            text:'Years'
                    },
                    yAxis: {
                        //Esto sirve para que el eje muestre intervalos de 4 en 4 empezando en 0
                        min: 0,
                        tickInterval: 4,
                        tickOptions: {
                            formatString: '%d'
                        },
                        title: {
                            //Texto a mostrar en la leyenda del eje Y
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
                        //Esto le dice que muestre el letrero victories para cada dato en el gráfico
                        name: 'Victories',
                        data: conjuntoDeVictoriasOrdenadasPorAño
                    }]
                });

            });




    }]);

angular
    .module("Principal")
    .controller("ApiExterna5Ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("IntegrationCtrl initialized");
        var apiBuilders = "/api/v1/builders";
        var apiFestivos = "https://feriados-cl-api.herokuapp.com/feriados";



        $http.get(apiFestivos)
            .then(function(responseFestivos) {
                var fechas = []
                var primeraFecha = responseFestivos.data[0].date
                var fechaSplitada = primeraFecha.split("-")
                var primerAño = fechaSplitada[0]
                
                console.log("Primera fecha: " + primerAño);
                responseFestivos.data.forEach((n) => {
                    var object = {};
                    object["name"] = n.title;
                    var fecha = n.date.split("-")
                    //console.log("Muestrame la fecha spliteada: " +fecha)
                    if(fecha[0] != primerAño){
                        object["parent"] = fecha[1];
                        object["value"] = fecha[2];
                        console.log("Mes: " + fecha[1]);
                           console.log("Dia: " + fecha[2])
                        fechas.push(object);
                    }
                })
                //console.log("Muestrame las fechas: " + fechas)
                console.log("Numero de fechas: " + fechas.length)

                Highcharts.chart('api-externa5', {
                    series: [{
                        type: "treemap",
                        layoutAlgorithm: 'stripes',
                        alternateStartingDirection: true,
                        levels: [{
                            level: 1,
                            layoutAlgorithm: 'sliceAndDice',
                            dataLabels: {
                                enabled: true,
                                align: 'left',
                                verticalAlign: 'top',
                                style: {
                                    fontSize: '15px',
                                    fontWeight: 'bold'
                                }
                            }
                        }],
                        data: [{
                                id: '01',
                                name: 'Enero',
                                color: "#EC2500"
                            }, {
                                id: '02',
                                name: 'Febrero',
                                color: "#ECE100"
                            }, {
                                id: '03',
                                name: 'Marzo',
                                color: '#EC9800'
                            },
                            {
                                id: '04',
                                name: 'Abril',
                                color: "#EC2500"
                            }, {
                                id: '05',
                                name: 'Mayo',
                                color: "#ECE100"
                            }, {
                                id: '06',
                                name: 'Junio',
                                color: '#EC9800'
                            },
                            {
                                id: '07',
                                name: 'Julio',
                                color: "#EC2500"
                            }, {
                                id: '08',
                                name: 'Agosto',
                                color: "#ECE100"
                            }, {
                                id: '09',
                                name: 'Septiembre',
                                color: '#EC9800'
                            },
                            {
                                id: '10',
                                name: 'Octubre',
                                color: "#EC2500"
                            }, {
                                id: '11',
                                name: 'Noviembre',
                                color: "#ECE100"
                            }, {
                                id: '12',
                                name: 'Diciembre',
                                color: '#EC9800'
                            },
                            {
                                name: 'Año nuevo',
                                parent: '01',
                                value: 1
                            }
                        ]
                    }],
                    title: {
                        text: 'Fruit consumption'
                    }
                });


            });


    }]);

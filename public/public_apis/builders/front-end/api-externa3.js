angular
    .module("Principal")
    .controller("ApiExterna3Ctrl", ["$scope", "$http", function($scope, $http) {
        console.log("IntegrationCtrl initialized");
        var apiBuilders = "/api/v1/builders";
        var apiFestivos = "https://feriados-cl-api.herokuapp.com/feriados";

        $http.get(apiFestivos)
            .then(function(responseFestivos) {

                //Aqui vamos a guardar los objetos con las fechas
                var fechas = []
                //Cogemos la primera fecha para solo devolver los festivos de ese año
                var primeraFecha = responseFestivos.data[0].date
                //Spliteamos la fecha ara quedarnos solo con el año
                var fechaSpliteada = primeraFecha.split("-");
                //Tomamos el año de la primera fecha
                var primerAño = fechaSpliteada[0]

                    / //Recorremos los datos de la api de festivos
                    responseFestivos.data.forEach((n) => {
                        //creamos un objeto donde vamos a almacenar la fecha
                        var object = {}
                        object["name"] = n.title;
                        //Spliteamos la fecha para meter en el objeto 
                        var fecha = n.date.split("-")
                        //comprobamos si la fecha actual que estamos mirando es la misma que la calculada anteriormente
                        //para no repetir años
                        if (fecha[0] == primerAño) {
                            object["parent"] = fecha[1] //mes
                            object["vallue"] = fecha[2] //dia
                        }
                        fechas.push(object);
                    })

                Highcharts.chart('api-externa3', {
                    series: [{
                        type: "treemap",
                        layoutAlgorithm: 'stripes',
                        //alternateStartingDirection: true,
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

/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/

angular.module("Principal").controller("pollutionCitiesMotogpGraphsCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("PollutionCitiesMotogp Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiPollution = 'https://sos1718-10.herokuapp.com/proxyFGG';


    $http.get(apiPollution).then(function(responsePol) {
        var conjuntoDEPA1 = []
      
        var conjuntoOPA1 = responsePol.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
       
        for (var i = 0; i < conjuntoOPA1.length; i++) {
            
            for (var j = 0; j < responsePol.data.length; j++) {
               
                if (conjuntoOPA1[i] == responsePol.data[j].year) {
                   
                    conjuntoDEPA1[i] = responsePol.data[j].nitrous;
                }
            }
        }


        $http.get(apiMotogp).then(function(response) {
            var conjuntoDEPA = []
     
            var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
            
            for (var i = 0; i < conjuntoOPA.length; i++) {
                
                for (var j = 0; j < response.data.length; j++) {
               
                    if (conjuntoOPA[i] == response.data[j].year) {
                     
                        conjuntoDEPA[i] = response.data[j].score;
                    }
                }
            }



            Highcharts.chart('container', {
                chart: {
                    type: 'scatter'
                },
                title: {
                    text: 'Pollution Cities & MotoGP Stats '
                },
                subtitle: {
                    text: 'Source: PollutionMotoGP.com'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
                },
                yAxis: {
                    title: {
                        text: 'Convinada'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'SCORE',
                    data: conjuntoDEPA

                }, {
                    name: 'NITOURS',
                    data: conjuntoOPA1

                }]
            });
        });
    });


}]);

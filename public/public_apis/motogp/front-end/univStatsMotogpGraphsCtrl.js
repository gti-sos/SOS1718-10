/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/

angular.module("Principal").controller("univStatsMotogpGraphsCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("UnivStatsMotoGp Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiSpanUniv = 'https://sos1718-09.herokuapp.com/api/v1/span-univ-stats';

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

        $http.get(apiSpanUniv).then(function(response) {
            var conjuntoDEPA1 = []
           
            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
           
            for (var i = 0; i < conjuntoOPA1.length; i++) {
                
                for (var j = 0; j < response.data.length; j++) {
                
                    if (conjuntoOPA1[i] == response.data[j].year) {
                       
                        conjuntoDEPA1[i] = response.data[j].firstSecondCycle;
                    }
                }
            }
            Highcharts.chart('container', {
                chart: {
                    type: 'line',
                    spacingBottom: 30
                },
                title: {
                    text: 'GPStatsApi and SpanUnivStatsApi Integration *'
                },
                subtitle: {
                    text: '* MOTOGP\'s union with de UNIVSTATS',
                    floating: true,
                    align: 'right',
                    verticalAlign: 'bottom',
                    y: 15
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    verticalAlign: 'top',
                    x: 150,
                    y: 100,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
                },
                yAxis: {
                    title: {
                        text: 'Convinada'
                    },
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y;
                    }
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.5
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'SCORE',
                    data: conjuntoDEPA
                }, {
                    name: 'firstSecondCycle',
                    data: conjuntoDEPA1
                }]
            });
        });
    });

}]);

angular.module("Principal").controller("integration4Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration4 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiFran = 'https://sos1718-10.herokuapp.com/proxyFGGF';


    $http.get(apiMotogp).then(function(response) {
        var conjuntoDEPA = []
       
        var conjuntoOPA = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
        
        for (var i = 0; i < conjuntoOPA.length; i++) {
           
            for (var j = 0; j < response.data.length; j++) {
               
                if (conjuntoOPA[i] == response.data[j].year) {
                    
                    conjuntoDEPA[i] = response.data[j].country;
                }
            }
        }

        $http.get(apiFran).then(function(response) {
            var conjuntoDEPA1 = []
          
            var conjuntoOPA1 = response.data.map(function(d) { return parseInt(d.year) }).sort((a, b) => a - b)
            
            for (var i = 0; i < conjuntoOPA1.length; i++) {
                
                for (var j = 0; j < response.data.length; j++) {
                   
                    if (conjuntoOPA1[i] == response.data[j].year) {
                        
                        conjuntoDEPA1[i] = response.data[j].state;
                    }
                }
            }


            var conjuntoObjetos = [];
            for (var y = 0; y < conjuntoOPA.length; y++) { 
                var object = {};
                object["country"] = conjuntoDEPA[y];
                object["visits"] = conjuntoOPA[y];
                conjuntoObjetos.push(object);
                
            

            }
            console.log("BOOLO1: " + conjuntoDEPA)
            console.log("BOOLO1: " + conjuntoOPA)
            console.log("BOOLO1: " + conjuntoObjetos)
            for (var y = 0; y < conjuntoOPA1.length; y++) {
                var object = {}
                object["country"] = conjuntoDEPA1[y];
                object["visits"] = conjuntoOPA1[y];
                conjuntoObjetos.push(object);
               


            }


            console.log("BOOLO: " + conjuntoDEPA1)
            console.log("BOOLO: " + conjuntoOPA1)
            console.log("BOOLO: " + conjuntoObjetos)


            var chart = AmCharts.makeChart("chartdiv", {
                "type": "serial",
                "theme": "dark",
                "dataProvider": conjuntoObjetos,
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "visits"
                }],
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "country",
                "categoryAxis": {
                    "gridPosition": "start",
                    "gridAlpha": 0,
                    "tickPosition": "start",
                    "tickLength": 20
                },
                "export": {
                    "enabled": true
                }

            });
        });
    });

}]);

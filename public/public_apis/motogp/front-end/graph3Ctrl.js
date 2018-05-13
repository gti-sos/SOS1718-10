/*global angular*/
/*global Highcharts*/
/*global google*/

angular.module("MotogpStatsApp").controller("Graph3Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("graph3 Ctrl initialized!");
    var chart = AmCharts.makeChart("isma", {
        "theme": "light",
        "type": "serial",
        "dataProvider": [{
            "year": 2004,
            "killed": 201
        }, {
            "year": 2015,
            "killed": 89
        }, {
            "year": 2016,
            "killed": 0
        }, {
            "year": 2016,
            "killed": 84
        }, {
            "year": 2012,
            "killed": 78
        }],
        "valueAxes": [{
            "title": "Muertos por año"
        }],
        "graphs": [{
            "balloonText": "Income in [[category]]:[[value]]",
            "fillAlphas": 1,
            "lineAlpha": 0.2,
            "title": "Income",
            "type": "column",
            "valueField": "killed"
        }],
        "depth3D": 20,
        "angle": 30,
        "rotate": true,
        "categoryField": "year",
        "categoryAxis": {
            "gridPosition": "start",
            "fillAlpha": 0.05,
            "position": "left"
        },
        "export": {
            "enabled": true
        }
    });

}]);

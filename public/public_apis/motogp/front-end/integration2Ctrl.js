/*global angular*/
/*global Highcharts*/
/*global google*/
/*global AmCharts*/

angular.module("Principal").controller("integration2Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration2 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiPollution = 'https://sos1718-10.herokuapp.com/proxyFGG';
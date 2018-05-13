/*global angular*/

angular.module("MotogpStatsApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"list.html",
        controller: "ListCtrl"
    })
    .when("/pilot/:year",{
        templateUrl:"edit.html",
        controller: "EditCtrl"
     })
     .when("/analytics",{
         templateUrl:"graph1.html",
         controller: "Graph1Ctrl"
     })
     .when("/analytics2",{
         templateUrl:"graph3.html",
         controller:"Graph3Ctrl"
     })
     .when("/integration1",{
         templateUrl:"univStatsMotogpGraphs.html",
         controller: "univStatsMotogpGraphsCtrl"
     })
     .when("/integration2",{
         templateUrl:"pollutionCitiesMotogpGraphs.html",
         controller: "pollutionCitiesMotogpGraphsCtrl"
     });
});

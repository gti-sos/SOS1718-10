/*global angular*/

angular.module("Principal", ["ngRoute"]).config(function ($routeProvider){
    $routeProvider.when("/",{
        templateUrl : "index1.html"
    }).
                    /*PACO*/
    when("/motogp-stats",{
        templateUrl : "../public_apis/motogp/front-end/list.html",
        controller : "ListCtrl"
    }).
    when("/pilot/:year",{
        templateUrl : "../public_apis/motogp/front-end/edit.html",
        controller : "EditCtrl"
    }).
    when("/graphsmoto", {
        templateUrl : "../public_apis/motogp/front-end/graph1.html",
        controller: "Graph1Ctrl"
    }).
    when("/integrationmoto1", {
        templateUrl: "../public_apis/motogp/front-end/univStatsMotogpGraphs.html",
        controller: "univStatsMotogpGrapsCtrl"
    }).
    when("/integrationmoto2", {
        templateUrl: "../public_apis/motogp/front-end/pollutionCitiesMotogpGraphs.html",
        controller: "pollutionCitiesMotogpGraphsCtrl"
    });
                        /*DAVID*/
                        /*VICTOR*/
    
});
/*global angular*/

angular.module("Principal", ["ngRoute"]).config(function ($routeProvider){
    $routeProvider.when("/",{
        templateUrl : "index1.html"
    }).
                    /*PACO*/
    when("/motogp-stats",{
        templateUrl : "../public_apis/motogp/front-end/list.html",
        controller : "ListCtrl1"
    }).
    when("/pilot/:year",{
        templateUrl : "../public_apis/motogp/front-end/edit.html",
        controller : "EditCtrl1"
    }).
    when("/graphsmoto", {
        templateUrl : "../public_apis/motogp/front-end/graph1.html",
        controller: "Graph1Ctrl"
    }).
    when("/integrationmoto1", {
        templateUrl: "../public_apis/motogp/front-end/univStatsMotogpGraphs.html",
        controller: "univStatsMotogpGraphsCtrl"
    }).
    when("/integrationmoto2", {
        templateUrl: "../public_apis/motogp/front-end/pollutionCitiesMotogpGraphs.html",
        controller: "pollutionCitiesMotogpGraphsCtrl"
    })
                        /*DAVID*/
                        
                        
    .when("/builders",{
        templateUrl : "../public_apis/builders/front-end/list.html",
        controller : "ListCtrl"
    }).
    when("/builder/:year",{
        templateUrl : "../public_apis/builders/front-end/edit.html",
        controller : "EditCtrl"
    }).
    when("/graphsBuilders", {
        templateUrl : "../public_apis/builders/front-end/graph.html",
        controller: "GraphCtrl"
    }).
    when("/integrationBuilders", {
        templateUrl: "../public_apis/builders/front-end/integration.html",
        controller: "IntegrationCtrl"
    }).
    when("/integrationBuilders2", {
        templateUrl: "../public_apis/builders/front-end/integration2.html",
        controller: "IntegrationCtrl2"
    });
                        /*VICTOR*/
    
});
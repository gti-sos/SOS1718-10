/*global angular*/

angular.module("AppManager", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "../public_apis/motogp/front-end/list.html",
            controller: "ListCtrl"
            
        })
        .when("/pilot/:year", {
            templateUrl: "../public_apis/motogp/front-end/edit.html",
            controller: "EditCtrl"
        })
        .when("/analytics", {
            templateUrl: "../public_apis/motogp/front-end/graph1.html",
            controller: "Graph1Ctrl"
        })
        .when("/integration1", {
            templateUrl: "../public_apis/motogp/front-end/univStatsMotogpGraphs.html",
            controller: "univStatsMotogpGraphsCtrl"
        })
        .when("/integration2", {
            templateUrl: "../public_apis/motogp/front-end/pollutionCitiesMotogpGraphs.html",
            controller: "pollutionCitiesMotogpGraphsCtrl"
        });
});

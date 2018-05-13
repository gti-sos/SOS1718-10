/*global angular*/

angular.module("App10", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "AppVistas.html"

            /*DAVID*/

        })
        .when("/builders", {
            templateUrl: "buildersList.html",
            controller: "buildersListCtrl"
        })
        .when("/builder/:year", {
            templateUrl: "buildersEdit.html",
            controller: "buildersEditCtrl"
        })
        .when("/buildersGraphs", {
            templateUrl: "buildersGraphs.html",
            controller: "buildersGraphsCtrl"

            /*VICTOR*/

        })
        .when("/buses", {
            templateUrl: "busesList.html",
            controller: "busesListCtrl"
        })
        .when("/buses/:community", {
            templateUrl: "busesEdit.html",
            controller: "busesEditCtrl"
        })
        .when("/busesGraphs", {
            templateUrl: "busesGraphs.html",
            controller: "busesGraphsCtrl"
        
              /*PACO*/

        })
        .when("/motogp-stats", {
            templateUrl: "motogpList.html",
            controller: "motogpListCtrl"
        })
        .when("/pilot/:year", {
            templateUrl: "motogpEdit.html",
            controller: "motogpEditCtrl"
        })
        .when("/motogpStatsGraphs", {
            templateUrl: "motogpGraphs.html",
            controller: "motogpGraphsCtrl"

        });

});

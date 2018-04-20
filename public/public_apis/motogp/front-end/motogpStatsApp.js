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
     });

});

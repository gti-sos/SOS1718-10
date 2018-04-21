/*global angular*/

angular.module("BusesApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"list.html",
        controller: "ListCtrl"
    })
    .when("/buses/:community",{
        templateUrl:"edit.html",
        controller: "EditCtrl"
     });

});
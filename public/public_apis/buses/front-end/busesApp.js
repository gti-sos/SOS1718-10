/*global angular*/

angular.module("BusesApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"list.html",
        controller: "ListCtrl"
    })
    .when("/graphs",{
        templateUrl:"graphs.html",
        controller: "MainCtrl"
    })
    .when("/integracion",{
        templateUrl:"integracion.html",
        controller: "IntegracionCtrl"
    })
    .when("/integracionProxy",{
        templateUrl:"integracionProxy.html",
        controller: "IntegracionProxy"
    })
    .when("/buses/:community",{
        templateUrl:"edit.html",
        controller: "EditCtrl"
     });

});
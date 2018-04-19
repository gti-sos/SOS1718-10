/*global angular*/

angular.module("BuildersApp", ["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"list.html",
        controller: "ListCtrl"
    })
    .when("/builder/:year",{
        templateUrl:"edit.html",
        controller: "EditCtrl"
     });

});

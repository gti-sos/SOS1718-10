/*global angular*/

angular.module("App10", ["ngRoute"]).config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"index.html"
    })
    
    .when("/builders",{
        templateUrl:"buildersList.html",
        controller: "buildersListCtrl"
     });
});

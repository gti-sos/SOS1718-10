/* global angular */

 angular.module("BuildersApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Edit Ctrl initialized!");
     var builderURL = "/api/v1/builders/" + $routeParams.year;
     
     $http.get(builderURL).then(function(response){
           $scope.updatedBuilder = response.data;
     });
     $scope.updateBuilder = function() {
     $http.put(builderURL, $scope.updatedBuilder).then(function(response) {
           $scope.status = "Status:" + response.status;
           $location.path("/");
     });
   }
 }]);
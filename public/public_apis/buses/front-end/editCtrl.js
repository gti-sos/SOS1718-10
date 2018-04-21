/* global angular */

 angular.module("BusesApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Edit Ctrl initialized!");
     var busURL = "/api/v1/buses/" + $routeParams.community;
     
     $http.get(busURL).then(function(response){
           $scope.updatedBus = response.data;
     });
     $scope.updateBus = function() {
     $http.put(busURL, $scope.updatedBus).then(function(response) {
           $scope.status = "Status:" + response.status;
           $location.path("/");
     });
   }
 }]);
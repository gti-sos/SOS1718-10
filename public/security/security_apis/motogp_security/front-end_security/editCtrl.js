/* global angular */

 angular.module("MotogpStatsApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Edit Ctrl initialized!");
     var pilotURL = "/api/v1/motogp-stats/" + $routeParams.year;
     
     $http.get(pilotURL).then(function(response){
           $scope.updatedPilot = response.data;
     });
     $scope.updatePilot = function() {
     $http.put(pilotURL, $scope.updatedPilot).then(function(response) {
           $scope.status = "Status:" + response.status;
           $location.path("/");
     });
   }
 }]);
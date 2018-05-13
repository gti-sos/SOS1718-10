/* global angular */

 angular.module("App10").controller("motogpEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Edit Ctrl initialized!");
     var pilotURL = "/api/v1/motogp-stats/" + $routeParams.year;
     
     $http.get(pilotURL).then(function(response){
           $scope.updatedPilot = response.data;
     });
      $scope.updatePilot = function() {
      if(Object.values($scope.updatedPilot).includes(null)){
          $scope.status = "FAIL: It is necesary to fill in all the fields --> status: (400)";
      }else{
       $http.put(pilotURL, $scope.updatedPilot).then(function(response) {
           $scope.status = "UPDATE method Status: Correctly updated (" + response.status + ")";
           $location.path("/");
   
     });
   
       
      }
  
      
     };
  
 }]);
/* global angular */

 angular.module("MotogpStatsApp-secure").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Edit Ctrl initialized!");
     var pilotURL = "/api/v1/security/motogp-stats/" + $routeParams.year;
     $scope.apikey = "davvicfra";
     
     $http.get(pilotURL + "?apikey=" + $scope.apikey).then(function(response){
           $scope.updatedPilot = response.data;
     });
     $scope.updatePilot = function() {
      if(Object.values($scope.updatedPilot).includes(null)){
          $scope.status = "FAIL: It is necesary to fill in all the fields --> status: (400)";
      }else{
       $http.put(pilotURL + "?apikey=" + $scope.apikey, $scope.updatedPilot).then(function(response) {
           $scope.status = "UPDATE method Status: Correctly updated (" + response.status + ")";
           $location.path("/");
   
     });
   
       
      }
  
      
     };
  
 }]);
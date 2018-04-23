/* global angular */

 angular.module("MotogpStatsApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Edit Ctrl initialized!");
     var builderURL = "/api/v1/builders/" + $routeParams.year;
     
     $http.get(builderURL).then(function(response){
           $scope.updatedBuilder = response.data;
     });
      $scope.updateBuilder = function() {
      if(Object.values($scope.updatedBuilder).includes(null)){
          $scope.status = "FAIL: It is necesary to fill in all the fields --> status: (400)";
      }else{
       $http.put(builderURL, $scope.updatedbuilder).then(function(response) {
           $scope.status = "UPDATE method Status: Correctly updated (" + response.status + ")";
           $location.path("/");
   
     });
   
       
      }
  
      
     };
  
 }]);
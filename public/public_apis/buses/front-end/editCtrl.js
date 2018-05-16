/* global angular */

 angular.module("Principal").controller("EditCtrl2", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
     console.log("Edit Ctrl initialized!");
     var busURL = "/api/v1/buses/" + $routeParams.community;
     
     $http.get(busURL).then(function(response){
           $scope.updatedBus = response.data;
     });
     $scope.updateBus = function() {
     if(Object.values($scope.updatedBus).includes(null)){
          $scope.status = "FAIL: It is necesary to fill in all the fields --> status: (400)";
      }else{
         $http.put(busURL, $scope.updatedBus).then(function(response) {
           $scope.status = "UPDATE method Status: Correctly updated (" + response.status + ")";
           $location.path("/buses");
     
         });
      }
     };
  
 }]);
   

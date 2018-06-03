/* global angular */

angular.module("Principal").controller("EditCtrl1", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
 console.log("Edit Ctrl initialized!");
 var pilotURL = "/api/v1/motogp-stats/" + $routeParams.year;

 $http.get(pilotURL).then(function successCallback(response) {
  $scope.updatedPilot = response.data;
 });
 $scope.updatePilot = function errorCallback() {
  if (Object.values($scope.updatedPilot).includes(null)) {
   alert("piloto no modificado (rellene todos los campos)");
  }
  else {
   $http.put(pilotURL, $scope.updatedPilot).then(function successCallback(response) {
    alert("Piloto modificado correctamente");
    $scope.status = "UPDATE method Status: Correctly updated (" + response.status + ")";
    $location.path("/motogp-stats");

   });
  }
 }
}]);

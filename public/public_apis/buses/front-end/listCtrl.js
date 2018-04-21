/*global angular*/

angular.module("BusesApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/buses";

    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            console.log("Load initial data: OK");
            refresh();
        });
    };

    function refresh() {
        $http.get(api).then(function successCallback(response) {
            $scope.buses = response.data;
            if ($scope.buses.isEmpty) {
                document.getElementById("loadInitialData").disabled = false;
            }
            else {
                document.getElementById("loadInitialData").disabled = true;
            }
        }, function errorCallback(response) {
            console.log("Error callback");
            $scope.buses = [];
        });
    }

    $scope.addBus = function() {
        $http.post(api, $scope.newBus).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }

    $scope.deleteBus = function(community) {
        $http.delete(api + "/" + community).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }

    $scope.deleteAll = function() {
        $http.delete(api).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log("Lista Vacia");
            refresh();
        });
    }

    function getBuses() {
        $http.get(api).then(function(response) {
            $scope.buses = response.data;
        });
    }

    refresh();

}]);

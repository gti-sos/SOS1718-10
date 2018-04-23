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
        $http.post(api, $scope.newBuses).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 409){
                $scope.status = "Status:" + response.status + ("FAIL: Bus already exist!");
            }
            if(response.status == 422){
                $scope.status = "Status:" + response.status + ("FAIL: Bus does not have expected fields!");
            }
            if(response.status == 400){
                $scope.status == "Status:" + response.status + ("FAIL: New POST request to /buses/ without buses" );
            }
        });
        refresh();
    }

    $scope.deleteBus = function(community) {
        $http.delete(api + "/" + community).then(function(response) {

            $scope.status = "Status:" + response.status + "(Bus deleted correctly)";
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }   

    $scope.deleteAll = function() {
        $http.delete(api).then(function successCallback(response) {

            $scope.status = "Status:" + response.status;+ "(All buses deleted)";
            console.log("Lista Vacia");
            refresh();
        }, function errorCallback(response){
            $scope.status = "Status:" + response.status + "(FAIL: you can not delete all buses)";
            console.log("ERROR");
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

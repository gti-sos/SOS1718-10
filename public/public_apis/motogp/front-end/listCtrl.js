/*global angular*/

angular.module("MotogpStatsApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/motogp-stats";
    $scope.refresh = refresh();

    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            console.log("Load initial data: OK");
            refresh();
        });
    };

    function refresh() {
        $http.get(api).then(function successCallback(response) {
            $scope.pilots = response.data;
            if ($scope.pilots.isEmpty) {
                document.getElementById("loadInitialData").disabled = false;
            }
            else {
                document.getElementById("loadInitialData").disabled = true;
            }
        }, function errorCallback(response) {
            console.log("Error callback");
            $scope.pilots = [];
        });
    }

    //PAGINACIÓN

    $scope.offset = 0;
    $scope.getPaginacion = function() {
        $http.get(api + "?&limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
            console.log($scope.data);
        });
    };

    $scope.addPilot = function() {
        $http.post(api, $scope.newPilot).then(function successCallback(response) {
            $scope.status = "Status:" + response.status + ("Pilot added");
            refresh();
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 409){
                $scope.status = "Status:" + response.status + ("FAIL: Pilot already exist!");
            }
            if(response.status == 422){
                $scope.status = "Status:" + response.status + ("FAIL: Pilot does not have expected fields!");
            }
            if(response.status == 400){
                $scope.status == "Status:" + response.status + ("FAIL: New POST request to /motogp-stats/ without motogp-stats" );
            }
        });
        refresh();
    }

    $scope.deletePilot = function(year) {
        $http.delete(api + "/" + year).then(function(response) {

            $scope.status = "Status:" + response.status + "(Pilot deleted correctly)";
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }

    $scope.deleteAll = function() {
        $http.delete(api).then(function successCallback(response) {

            $scope.status = "Status:" + response.status + "(All pilots deleted)";
            console.log("Lista Vacia");
            refresh();
        }, function errorCallback(response){
            $scope.status = "Status:" + response.status + "(FAIL: you can not delete all pilots)";
            console.log("ERROR");
            refresh();
        });
    }

    function getPilots() {
        $http.get(api).then(function(response) {
            $scope.pilots = response.data;
        });
    }

    refresh();

     //BUSQUEDA

    $scope.search = function() {
        $http.get(api + "?&year=" + $scope.newPilot.year).then(function(response) {
            console.log("Muestra el piloto del año: " + $scope.newPilot.year);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
        });
    }
}]);

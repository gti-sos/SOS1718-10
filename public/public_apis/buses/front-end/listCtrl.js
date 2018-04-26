/*global angular*/


angular.module("BusesApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {

    //////////////////////VARIABLES//////////////////////////////    

    var search = "?";

    var limit = 10;
    var offset = 0;
    var paginacionString = "";

    ////////////////////////////////////////////////////////////

    console.log("List Ctrl initialized!");

    var api = "/api/v1/buses";

    $scope.refresh = refresh();

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
        }, function errorCallback(response) {
            console.log(response.status);
            if (response.status == 409) {
                $scope.status = "Status:" + response.status + ("FAIL: Bus already exist!");
            }
            if (response.status == 422) {
                $scope.status = "Status:" + response.status + ("FAIL: Bus does not have expected fields!");
            }
            if (response.status == 400) {
                $scope.status == "Status:" + response.status + ("FAIL: New POST request to /buses/ without buses");
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

            $scope.status = "Status:" + response.status; + "(All buses deleted)";
            console.log("Lista Vacia");
            refresh();
        }, function errorCallback(response) {
            $scope.status = "Status:" + response.status + "(FAIL: you can not delete all buses)";
            console.log("ERROR");
            refresh();
        });
    }


    function getBuses() {
        paginacionString = "&limit=" + limit + "&offset=" + offset;
        $http.get(api + search + paginacionString).then(function(response) {
            $scope.buses = response.data;
        });

        search = "?";
    }

    refresh();

    /////////////////////////////BUSQUEDA//////////////////////////////////////



    $scope.buscarBus = function() {



        if ($scope.buscarBus.community) {
            search += ("&community=" + $scope.buscarBus.community);
        }
        if ($scope.buscarBus.year) {
            search += ("&year=" + $scope.buscarBus.year);
        }
        if ($scope.buscarBus.month) {
            search += ("&month=" + $scope.buscarBus.month);
        }
        if ($scope.buscarBus.occupation) {
            search += ("&occupation=" + $scope.buscarBus.occupation);
        }
        if ($scope.buscarBus.transportedTraveler) {
            search += ("&transportedTraveler=" + $scope.buscarBus.transportedTraveler);
        }
        if ($scope.buscarBus.country) {
            search += ("&country=" + $scope.buscarBus.country);
        }
        //if ($scope.buscarBus.from) {
        //    search += ("&from=" + $scope.buscarBus.from);
        //}
        //if ($scope.buscarBus.to) {
        //    search += ("&to=" + $scope.buscarBus.to);
        //}

        getBuses();


    };

    ////////////////////////PAGINACION////////////////////////////////////////////





    $scope.siguientePag = function() {
        offset += limit;
        getBuses();

    };

    $scope.anteriorPag = function() {
        offset -= limit;
        getBuses();

    };



}]);

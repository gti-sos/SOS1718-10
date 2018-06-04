/*global angular*/


angular.module("Principal").controller("ListCtrl2", ["$scope", "$http", function($scope, $http) {

    //////////////////////VARIABLES//////////////////////////////    

    var search = "?";

    ////////////////////////////////////////////////////////////

    console.log("List Ctrl initialized!");

    var api = "/api/v1/buses";

    $scope.refresh = refresh();

    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function successCallback(response) {
            alert("Añadiendo Buses");
            refresh();
            getBuses();
        }, function errorCallback(response) {
            alert("Hay Buses existentes, vacie la base de datos y pulse de nuevo");
            console.log("ERROR");
            getBuses();
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
            alert("correctly added bus");
            getBuses();

        }, function errorCallback(response) {
            console.log(response.status);
            if (response.status == 409) {
                $scope.status = "Status:" + response.status + ("FAIL: Bus already exist!");
                alert("bus already exist!");
            }
            if (response.status == 422) {
                $scope.status = "Status:" + response.status + ("FAIL: Bus does not have expected fields!");
                alert("Bus does not have expected fields");

            }
            if (response.status == 400) {
                $scope.status == "Status:" + response.status + ("FAIL: New POST request to /buses/ without buses");
                alert("New POST request to /bus/ without builder");

            }

        });
        refresh();
        getBuses();

    }

    $scope.deleteBus = function(community) {
        $http.delete(api + "/" + community).then(function(response) {

            $scope.status = "Status:" + response.status + "(Bus deleted correctly)";
            alert("bus deleted");
            console.log(JSON.stringify((response, null, 2)));
            refresh();
            getBuses();

        });
    }

    $scope.deleteAll = function() {
        $http.delete(api).then(function successCallback(response) {

            $scope.status = "Status:" + response.status; + "(All buses deleted";
            alert("Database empty, buses deleted correctly");
            console.log("Lista Vacia");
            refresh();
            getBuses();
        }, function errorCallback(response) {
            $scope.status = "Status:" + response.status + "(FAIL: you can not delete all buses)";
            console.log("ERROR");
            refresh();
            getBuses();
        });
    }


    function getBuses() {
        $http.get(api + search).then(function(response) {
            $scope.buses = response.data;
        });

        search = "?";
    }
    getBuses();
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



    //PAGINACIÓN

    $scope.offset = 0;
    $scope.getPaginacion = function() {
        console.log("Muestrame la paginacion" + api + "&limit=" + $scope.limit + "&offset=" + $scope.offset);
        $http
            .get(api + "?" + "&limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.data = JSON.stringify(response.data, null, 2);
                $scope.buses = response.data;
                console.log($scope.data);
            });

    };



    //MÉTODOS DE PAGINACIÓN

    $scope.viewby = 0;
    $scope.totalItems = function() {
        return $scope.buses.length;
    };
    $scope.currentPage = 1;
    $scope.itemsPerPage = function() {
        return $scope.limit;
    };
    $scope.maxSize = 5; //Botones (1 xpagina) a mostrar 
    $scope.offset = 0;



    $scope.newPage = function(numberPage) {
        var viewby = $scope.viewby;
        $scope.currentPage = numberPage;
        $scope.offset = numberPage * viewby - parseInt($scope.viewby);
        $scope.limit = $scope.viewby;
        $http
            .get(api + "?" + "&limit=" + $scope.limit + "&offset=" + $scope.offset)
            .then(function(response) {
                $scope.buses = response.data;
            });

    };

    $scope.nextPage = function(numberPage) {
        $scope.currentPage = numberPage;
        $scope.offset = parseInt($scope.offset) + parseInt($scope.viewby);
        console.log($scope.offset);
        $scope.limit = $scope.viewby;
        $http
            .get(api + "?" + "&limit= " + $scope.limit + "&offset= " + $scope.offset)
            .then(function(response) {
                $scope.buses = response.data;
            });
    };


    $scope.previousPage = function(numberPage) {
        var viewby = $scope.viewby;
        $scope.currentPage = numberPage;
        $scope.offset -= viewby;
        $http
            .get(api + "?" + "&limit= " + $scope.limit + "&offset= " + $scope.offset)
            .then(function(response) {
                $scope.buses = response.data;
            });
    };



    $scope.setItemsPerPage = function(numberPage) {
        $scope.itemsPerPage = numberPage;
        $scope.currentPage = 1;
        $scope.offset = 0;
        var pages = [];
        $http
            .get(api)
            .then(function(response) {
                for (var i = 1; i <= response.data.length / $scope.viewby; i++) {
                    pages.push(i);
                }
                if (pages.length * $scope.viewby < response.data.length) {
                    pages.push(pages.length + 1);
                }
                $scope.pages = pages;
                document.getElementById("pagination").style.display = "block";
                document.getElementById("pagination").disabled = false;
            });

        $http
            .get(api + "?" + "&limit= " + numberPage + "&offset= " + $scope.offset)
            .then(function(response) {
                $scope.buses = response.data;
            });

    };
    getBuses();



}]);

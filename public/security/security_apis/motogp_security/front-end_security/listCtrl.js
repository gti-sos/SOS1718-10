/*global angular*/

angular.module("MotogpStatsApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    $scope.url = "/api/v1/security/motogp-stats";
    $scope.apikey = "davvicfra";
    $scope.refresh = refresh();


    $scope.loadInitialData = function() {
        $http.get($scope.url + "/loadInitialData?apikey=" + $scope.apikey).then(function(response) {
            console.log("Load initial data: OK");
            refresh();
        });
    };

    function refresh() {
        if ($scope.apikey == "davvicfra") {
            $http.get($scope.url + "?apikey=" + $scope.apikey).then(function successCallback(response) {
                console.log($scope.apikey);
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
        else {
            $scope.pilots = [];
        }
    }
    
    //COMPRUEBA APIKEY

    function checkApiKeyFunction(dato){
        if(dato == ""){
            alert("Apikey vacía, por favor introduzca una apikey");
        }else{
            $http.get($scope.url + "?apikey=" + dato).then(function successCallback(response){
                alert("Apikey correcta");
            }, function erroCallback(response){
                alert("Apikey incorrecta, pida la apikey correcta al administrador");
            });
        }
        refresh();
    }


    //PAGINACIÓN

    $scope.offset = 0;
    $scope.getPaginacion = function() {
        $http.get($scope.url + "?apikey=" + $scope.apikey + "&limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
            console.log($scope.data);
        });
    };

    //AÑADIR NUEVO PILOTO

    $scope.addPilot = function() {
        $http.post($scope.url + "?apikey=" + $scope.apikey, $scope.newPilot).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }

    //DELETE 

    $scope.deletePilot = function(year) {
        $http.delete($scope.url + "/" + year + "/?apikey=" + $scope.apikey).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }

    //DELETE ALL

    $scope.deleteAll = function() {
        $http.delete($scope.url + "?apikey=" + $scope.apikey).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log("Lista Vacia");
            refresh();
        });
    }

    //GET

    function getPilots() {
        checkApiKeyFunction($scope.apikey);
        $http.get($scope.url + "?apikey=" + $scope.apikey).then(function successCallback(response) {
            $scope.pilots = response.data;
            if($scope.pilots.isEmpty){
                document.getElementById("loadInitialData").disabled = false;
            }else{
                document.getElementById("loadInitialData").disabled = true;
            }
            console.log("Showing data");
        },function errorCallback(response){
            $scope.pilots = [];
        });
        
    };

    //BUSQUEDA

    $scope.search = function() {
        $http.get($scope.url + "?apikey=" + $scope.apikey + "&year=" + $scope.newPilot.year).then(function(response) {
            console.log("Muestra el piloto del año: " + $scope.newPilot.year);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
        });
    }


}]);

/*global angular*/

angular.module("MotogpStatsApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/security/motogp-stats";
    var apikey = "davvicfra";
    $scope.refresh = refresh();


    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData?apikey=" + apikey).then(function(response) {
            console.log("Load initial data: OK");
            refresh();
        });
    };

    function refresh() {
        if (apikey == "davvicfra") {
            $http.get(api + "?apikey=" + apikey).then(function successCallback(response) {
                console.log(apikey);
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

    function checkApiKey(dato){
        if(dato == ""){
            alert("Apikey vacía, por favor introduzca una apikey");
        }else{
            $http.get(api + "?apikey=" + dato).then(function successCallback(response){
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
        $http.get(api + "?apikey=" + apikey + "&limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
            console.log($scope.data);
        });
    };

    //AÑADIR NUEVO PILOTO

    $scope.addPilot = function() {
        $http.post(api + "?apikey=" + apikey, $scope.newPilot).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }

    //DELETE 

    $scope.deletePilot = function(year) {
        $http.delete(api + "/" + year + "/?apikey=" + apikey).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            refresh();
        });
    }

    //DELETE ALL

    $scope.deleteAll = function() {
        $http.delete(api + "?apikey=" + apikey).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log("Lista Vacia");
            refresh();
        });
    }

    //GET

    function getPilots() {
        checkApiKey(apikey);
        $http.get(api + "?apikey=" + apikey).then(function successCallback(response) {
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
        $http.get(api + "?apikey=" + apikey + "&year=" + $scope.newPilot.year).then(function(response) {
            console.log("Muestra el piloto del año: " + $scope.newPilot.year);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
        });
    }


}]);

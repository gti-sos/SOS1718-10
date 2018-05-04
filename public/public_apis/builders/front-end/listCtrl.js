/*global angular*/

angular.module("BuildersApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/builders";

    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            $scope.status = "Status:" + response.status + ("Lista inicializada");
            console.log("Load initial data: OK");
            getBuilders();
        });
    };
    
    
    $scope.search = function(){
        $http.get(api + "?&year=" + $scope.newBuilder.year).then(function successCallback(response){
            console.log(api + "?&year=" + $scope.newBuilder.year);
            console.log("Muestra el constructor del año: " + $scope.newBuilder.year);
            $scope.data= JSON.stringify(response.data, null, 2);
            $scope.builders = response.data;
            console.log("Muestrame los datos del $scope" + $scope.builders);
        }, function errorCallback(response){
            console.log(response.status);
            if(response.status == 400){
                $scope.status = "Status" + response.status + ("Bad request");
            }
            if(response.status == 404){
                $scope.status = "Status" + response.status + ("No hay resultados con esos datos");
            }
        });
    };
    
    $scope.searchBuilder = function(){
        $http.get(api + "?&builder=" + $scope.newBuilder.builder).then(function successCallback(response){
            console.log(api + "?&builder=" + $scope.newBuilder.builder);
            console.log("Muestra el constructor: " + $scope.newBuilder.builder);
            $scope.data= JSON.stringify(response.data, null, 2);
            $scope.builders = response.data;
            console.log("Muestrame los datos del $scope" + $scope.builders);
        }, function errorCallback(response){
            console.log(response.status);
            if(response.status == 400){
                $scope.status = "Status" + response.status + ("Bad request");
            }
            if(response.status == 404){
                $scope.status = "Status" + response.status + ("No hay resultados con esos datos");
            }
        });
    };
    $scope.addBuilder = function() {
        $http.post(api, $scope.newBuilder).then(function successCallback(response) {
            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            getBuilders();
            },function errorCallback(response){
            console.log(response.status);
            if(response.status == 409){
                $scope.status = "Status:" + response.status + ("FAIL: Builder already exist!");
            }
            if(response.status == 422){
                $scope.status = "Status:" + response.status + ("FAIL: Builder does not have expected fields!");
            }
            if(response.status == 400){
                $scope.status == "Status:" + response.status + ("FAIL: New POST request to /builder/ without builder" );
            }
        });
        getBuilders();
    }

    $scope.deleteBuilder = function(year) {
        $http.delete(api + "/" + year).then(function(response) {
            $scope.status = "Status:" + response.status + ("Elemento borrado");
            console.log(JSON.stringify((response, null, 2)));
            getBuilders();
        });
    }
    
    $scope.deleteAll = function(){
        $http.delete(api).then(function successCallback(response){
            
            $scope.status = "Status:" + response.status + ("Todo borrado");
            console.log("Lista Vacia");
            getBuilders();
        }, function errorCallback(response){
            $scope.status = "Status:" + response.status + "(FAIL: you can not delete all pilots)";
            console.log("ERROR");
            getBuilders();
        });
    }

    function getBuilders() {
        $http.get(api).then(function(response) {
            $scope.builders = response.data;
        });
    }

    getBuilders();

}]);

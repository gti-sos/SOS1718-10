/*global angular*/

angular.module("BuildersApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/builders";

      $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            console.log("Load initial data: OK");
            getBuilders();
        });
    };
    
    $scope.addBuilder = function() {
        $http.post(api, $scope.newBuilder).then(function successCallback(response) {
            //$scope.status = "Status:" + response.status;
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
            //$scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            getBuilders();
        });
    }
    
    $scope.deleteAll = function(){
        $http.delete(api).then(function successCallback(response){
            
            //$scope.status = "Status:" + response.status;
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

/*global angular*/

angular.module("BuildersApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/builders";

    $scope.addBuilder = function() {
        $http.post(api, $scope.newBuilder).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            getBuilders();
        });
    }

    $scope.deleteBuilder = function(year) {
        $http.delete(api + "/" + year).then(function(response) {
            
            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            getBuilders();
        });
    }
    
    $scope.deleteAll = function(){
        $http.delete(api).then(function(response){
            
            $scope.status = "Status:" + response.status;
            console.log("Lista Vacia");
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

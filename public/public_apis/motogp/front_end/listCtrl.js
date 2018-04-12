/*global angular*/

angular.module("MotogpStatsApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/motogp-stats";

    $scope.addPilot = function() {
        $http.post(api, $scope.newPilot).then(function(response) {

            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            getPilots();
        });
    }

    $scope.deletePilot = function(year) {
        $http.delete(api + "/" + year).then(function(response) {
            
            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            getPilots();
        });
    }

    function getPilots() {
        $http.get(api).then(function(response) {
            $scope.pilots = response.data;
        });
    }

    getPilots();

}]);

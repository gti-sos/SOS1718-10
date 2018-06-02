angular.module("Principal").controller("integration7Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration7 Ctrl initialized!");
    var apiDatos = 'https://api.tvmaze.com/search/people?q=lauren';

    function getPersons() {
        $http.get(apiDatos).then(function(response) {

            var array = response.data;

            console.log("LOS DATOS:" + array)

            $scope.data = JSON.stringify(response.data, null, 2);

            console.log("los datos1:" + $scope.data)

            $scope.person = response.data;

            console.log("los datos2:" + $scope.person)
        });
    }
    getPersons();

}]);

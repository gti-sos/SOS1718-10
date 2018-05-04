/*global angular*/
/*global $*/

angular.module("MotogpStatsApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/motogp-stats";
    var search ='?';
    var limit = 10;
    var offset = 0;
    var paginacionString = "";
    $scope.currentPage = 1;

    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            $('#addedAll').modal('show');
            getPilots();
        });
    };

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
            $('#added').modal('show');
            getPilots();
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 409){
                $('#fail_409').modal('show');
            }
            if(response.status == 422){
                $('#fail_422').modal('show');
            }
            if(response.status == 400){
                $('#fail_400').modal('show');
            }
        });
        getPilots();
    }

    $scope.deletePilot = function(year) {
        $http.delete(api + "/" + year).then(function(response) {
            $('#deleted').modal('show');
            console.log("muestrame los datos" + getPilots());
            getPilots();
        });
    }

    $scope.deleteAll = function() {
        $http.delete(api).then(function successCallback(response) {

            $('#deleteAll').modal('show');
            console.log("Lista Vacia");
            getPilots();
        }, function errorCallback(response){
            $('#fail_deleteAll').modal('show');
            console.log("ERROR");
             getPilots();
        });
       
    }
    

    function getPilots() {
        $http.get(api).then(function(response) {
            $scope.pilots = response.data;
        });
    }
    
     getPilots();

     //BUSQUEDA

    $scope.searchYear = function () {

        $http.get(api + "?&year=" + $scope.newPilot.year).then(function successCallback(response) {
            console.log("Muestra el piloto del año: " + $scope.newPilot.year);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 400){
                $('#fail_400').modal('show');
            }
            if(response.status == 404){
                $('#fail_404').modal('show');
            }
        });
    }
    
    $scope.searchPilot = function () {
        
        $http.get(api + "?&pilot=" + $scope.newPilot.pilot).then(function(response) {
            console.log("Muestra el nombre del piloto: " + $scope.newPilot.pilot);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 400){
               $('#fail_400').modal('show');
            }
            if(response.status == 404){
                $('#fail_404').modal('show');
            }
        });
    }
    
    $scope.searchCountry = function () {
        
        $http.get(api + "?&country=" + $scope.newPilot.country).then(function(response) {
            console.log("Muestra el piloto del pais: " + $scope.newPilot.country);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 400){
               $('#fail_400').modal('show');
            }
            if(response.status == 404){
                $('#fail_404').modal('show');
            }
        });
    }
    
    $scope.searchScore = function () {
        
        $http.get(api + "?&score=" + $scope.newPilot.score).then(function(response) {
            console.log("Muestra la puntuacion del piloto: " + $scope.newPilot.score);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
            
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 400){
                $('#fail_400').modal('show');
            }
            if(response.status == 200){
                $('#200').modal('show');
            }
            if(response.status == 404){
               $('#fail_404').modal('show');
            }

        });
    }
    
    $scope.searchAge = function () {
        
        $http.get(api + "?&age=" + $scope.newPilot.age).then(function(response) {
            console.log("Muestra la edad del piloto: " + $scope.newPilot.age);
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 400){
                $('#fail_400').modal('show');
            }
            if(response.status == 404){
                $('#fail_404').modal('show');
            }

        });
    }
}]);


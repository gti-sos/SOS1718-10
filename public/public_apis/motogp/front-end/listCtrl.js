/*global angular*/
/*global $*/

angular.module("Principal").controller("ListCtrl1", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/motogp-stats";
    //var api = "https://sos1718-09.herokuapp.com/api/v1/span-univ-stats";

    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function successCallback(response) {
            alert("Añadiendo Pilotos");
            getPilots();
        }, function errorCallback(response){
            alert("Hay pilotos existentes, vacie la base de datos y pulse de nuevo");
            console.log("ERROR");
            getPilots();
        });
    }


    $scope.addPilot = function() {
        $http.post(api, $scope.newPilot).then(function successCallback(response) {
            alert("Piloto añadido correctamente");
            getPilots();
        },function errorCallback(response){
            console.log(response.status);
            if(response.status == 409){
               alert();
            }
            if(response.status == 422){
               alert();  
            }
            if(response.status == 400){
               alert();  
            }
        });
        getPilots();
    }

    $scope.deletePilot = function(year) {
        $http.delete(api + "/" + year).then(function(response) {
            alert("Piloto borrado correctamente");
            console.log("muestrame los datos" + getPilots());
            getPilots();
        });
    }

    $scope.deleteAll = function() {
        $http.delete(api).then(function successCallback(response) {

            alert("Se hab borrado todos los pilotos");
            console.log("Lista Vacia");
            getPilots();
        }, function errorCallback(response){
            alert("No hay pilotos que borrar");
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
                alert("No se encuentra" + $scope.newPilot.year + "en la base de datos");
            }
            if(response.status == 404){
                alert("No se encuentra" + $scope.newPilot.year + "en la base de datos");
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
    
     //PAGINACIÓN

    $scope.offset = 0;
    $scope.getPaginacion = function() {
        $http.get(api + "?&limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response) {
            $scope.data = JSON.stringify(response.data, null, 2);
            $scope.pilots = response.data;
            console.log($scope.data);
        });
    };
    
    //MÉTODS DE PAGINACION
    
    $scope.viewby = 0;
    $scope.totalItems = function() {
        return $scope.pilots.length;
    };
    $scope.currentPage = 1;
    $scope.itemsPerPage = function(){
        return $scope.limit;
    };
    $scope.maxSize = 5; //Botones (1 por pagina) a mostrar
    $scope.offset = 0;
    
    $scope.newPage = function(numberPage){
        var viewby = $scope.viewby;
        $scope.currentPage = numberPage;
        $scope.offset = numberPage*viewby-parseInt($scope.viewby);
        $scope.limit = $scope.viewby;
        $http.get(api + "?" + "&limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response){
            $scope.pilots = response.data;
        });
    };
    
    $scope.previousPage = function(numberPage){
        var viewby = $scope.viewby;
        $scope.currentPage = numberPage;
        $scope.offset -= viewby;
        $http.get(api + "?" + "&limit=" + $scope.limit + "&offset=" + $scope.offset).then(function(response){
            $scope.pilots = response.data;
        });
    };
    
       $scope.setItemsPerPage = function(numberPage) {
            $scope.itemsPerPage = numberPage;
            $scope.currentPage = 1;
            $scope.offset = 0;
            var pages =[];
             $http
                .get(api)
                .then(function(response){
                    for(var i =1;i<=response.data.length / $scope.viewby;i++){
                        pages.push(i);
                    }
                    if(pages.length*$scope.viewby<response.data.length){
                        pages.push(pages.length+1);
                    }
                    $scope.pages = pages;
                        document.getElementById("pagination").style.display = "block";
                        document.getElementById("pagination").disabled = false;
                });
            
            $http
                .get(api + "?" + "&limit= " + numberPage +"&offset= "+ $scope.offset)
                    .then(function(response){
                        $scope.pilots = response.data;
                });
                
        };
    getPilots();
    
    
}]);


/*global angular*/

angular.module("BuildersApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/builders";

    $scope.loadInitialData = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            $scope.status = "Status:" + response.status + ("Lista inicializada");
            alert("DataBase initialized");
            console.log("Load initial data: OK");
            getBuilders();
        });
    };
    
    
    $scope.search = function(){
        $http.get(api + "?&year=" + $scope.newBuilder.year).then(function successCallback(response){
            console.log("Muestra el constructor del año: " + $scope.newBuilder.year);
            console.log("Muestra el stado: " + response.status);
            $scope.data= JSON.stringify(response.data, null, 2);
            $scope.builders = response.data;
            console.log("Muestrame los datos del $scope" + $scope.builders);
        }, function errorCallback(response){
            console.log("Muestra el stado: " + response.status);
            if(response.status == 400){
                $scope.status = "Status" + response.status + ("Bad request");
            }
            if(response.status == 404){
                alert(" there is no constructor in the database with that year");
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
                alert("The builder is not in the database");
                $scope.status = "Status" + response.status + ("No hay resultados con esos datos");
            }
        });
    };
    $scope.addBuilder = function() {
        $http.post(api, $scope.newBuilder).then(function successCallback(response) {
            $scope.status = "Status:" + response.status;
            console.log(JSON.stringify((response, null, 2)));
            alert("correctly added builder");
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
            alert("Builder deleted");
            console.log(JSON.stringify((response, null, 2)));
            getBuilders();
        });
    }
    
    $scope.deleteAll = function(){
        $http.delete(api).then(function successCallback(response){
            
            $scope.status = "Status:" + response.status + ("Todo borrado");
            alert("Database empty, builders deleted correctly");
            console.log("Lista Vacia");
            getBuilders();
        }, function errorCallback(response){
            $scope.status = "Status:" + response.status + "(FAIL: you can not delete all pilots)";
            console.log("ERROR");
            getBuilders();
        });
    }
    
    
    
    
    
    
    
    
    
    
    
    
    //PAGINACIÓN
    $scope.offset = 0;
     $scope.getPaginacion = function(){
           console.log("Muestrame la paginacion" + api +"&limit="+ $scope.limit +"&offset="+$scope.offset);
            $http
                .get(api + "?" +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.builders = response.data;
                    console.log( $scope.data );
                });
            
        } ;
        
         
         
         //MÉTODOS DE PAGINACIÓN
         
        $scope.viewby = 0;
        $scope.totalItems = function() {
            return $scope.builders.length;
        };
        $scope.currentPage = 1;
        $scope.itemsPerPage = function() {
            return $scope.limit;
        };
        $scope.maxSize = 5; //Botones (1 xpagina) a mostrar 
        $scope.offset = 0;
        
        
        
        $scope.newPage = function(numberPage){
            var viewby = $scope.viewby;
            $scope.currentPage = numberPage;
            $scope.offset = numberPage*viewby-parseInt( $scope.viewby);
            $scope.limit = $scope.viewby;
            $http
                .get(api + "?" +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.builders = response.data;
                });
            
        };
        
        $scope.nextPage = function(numberPage) {
            $scope.currentPage = numberPage;
            $scope.offset = parseInt($scope.offset) + parseInt($scope.viewby);
            console.log($scope.offset);
            $scope.limit = $scope.viewby;
            $http
                .get(api + "?" +"&limit= "+ $scope.limit +"&offset= " + $scope.offset)
                .then(function(response){
                    $scope.builders = response.data;
                });
        };
        
        
        $scope.previousPage = function(numberPage) {
            var viewby = $scope.viewby;
            $scope.currentPage = numberPage;
            $scope.offset -= viewby;
            $http
                .get(api + "?" +"&limit= "+ $scope.limit +"&offset= " + $scope.offset)
                .then(function(response){
                    $scope.builders = response.data;
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
                        $scope.builders = response.data;
                });
                
        };
    getBuilders();
    
    
    
    
    
    
    


    function getBuilders() {
        $http.get(api).then(function(response) {
            $scope.builders = response.data;
        });
    }

    getBuilders();

}]);

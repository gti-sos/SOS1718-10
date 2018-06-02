angular.module("Principal").

controller("ApiExterna1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 1)");

    $scope.data = {};
    var dataCache = {};
    $scope.id = [];
    $scope.year = [];
    $scope.datos = [];
    $scope.datos2 = [];



    /*$http.get("/api/v1/builders").then(function(responseBuilders) {

        dataBuilders = responseBuilders.data;
        $scope.dataBuilders = dataBuilders;

        for (var i = 0; i < responseBuilders.data.length; i++) {
            $scope.year.push(Number(responseBuilders.data[i].year));
        }
        $http.get("https://api.fixer.io/latest").then(function(response) {

            dataCache = response.data;
            $scope.data = dataCache;



            for (var i = 0; i < $scope.dataBuilders.length; i++) {
                var ar = [];
                ar.push($scope.data.base);
                ar.push($scope.year[i]);

                $scope.datos2.push(ar);


            }



            chart = anychart.cartesian();
            console.log($scope.datos2);
            console.log(response.data.length);*/


    $http.get("/api/v1/builders").then(function(responseBuilders) {
        
        var year = []

        for (var i = 0; i < responseBuilders.data.length; i++) {
            year.push(responseBuilders.data[i].year);
        }
        $http.get("https://api.fixer.io/latest").then(function(response) {
            var datos = []

            for (var i = 0; i < responseBuilders.data.length; i++) {
                var ar = [];
                ar.push(response.data.base);
                ar.push(year[i]);
                console.log("year[i]: " + year[i]);
            }
            datos.push(ar);
            console.log("Datos: " + datos)



            chart = anychart.cartesian();
            console.log(datos);
            console.log(response.data.length);


            // data


            // add a marker seris
            chart.bubble(datos);

            // set chart title
            chart.title("Bubble Chart");
            chart.maxBubbleSize(20);
            chart.minBubbleSize(10);
            // set axes titles 
            chart.xAxis().title("RMS");
            chart.yAxis().title("Builders");

            // draw
            chart.container("api-externa");
            chart.draw();
        });
    });


}]);

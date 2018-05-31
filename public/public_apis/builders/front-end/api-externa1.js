angular.module("Principal").

controller("ApiExterna1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 1)");

    $scope.data = {};
    var dataCache = {};
    $scope.id = [];
    $scope.year = [];
    $scope.datos = [];
    $scope.datos2 = [];



    $http.get("/api/v1/builders").then(function(response) {

        dataBuilders = response.data;
        $scope.dataBuilders = dataBuilders;

        for (var i = 0; i < response.data.length; i++) {
            $scope.year.push(Number($scope.dataBuilders[i].year));
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
            console.log(response.data.length);


            // data


            // add a marker seris
            chart.bubble($scope.datos2);

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

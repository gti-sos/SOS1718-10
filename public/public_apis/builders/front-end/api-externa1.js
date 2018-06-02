angular.module("Principal").

controller("ApiExterna1Ctrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 1)");

    $http.get("/api/v1/builders").then(function(responseBuilders) {

            var years = []

            for (var i = 0; i < responseBuilders.data.length; i++) {
                years.push(responseBuilders.data[i].year);
            }
            $http.get("https://api.myjson.com/bins/1lzv8").then(function(response) {

                    var albums = response.data.map(function(d) { return d.albums })
                    var datos = []



                    for (var j = 0; j < years.length; j++) {
                        var ar = [];
                        ar.push(years[j]);
                        ar.push(albums[j]);
                        datos.push(ar);
                    }
                

                chart = anychart.cartesian(); console.log(datos); console.log(response.data.length);


                // add a marker seris
                chart.bubble(datos);

                // set chart title
                chart.title("Bubble Chart"); chart.maxBubbleSize(20); chart.minBubbleSize(10);
                // set axes titles 
                chart.xAxis().title("Albums"); chart.yAxis().title("Builders");

                // draw
                chart.container("api-externa"); chart.draw();
            });
    });


}]);

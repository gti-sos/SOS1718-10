/*global angular*/
/*global google*/

angular
    .module("Principal")
    .controller("IntegracionFinal3", ["$scope", "$http", function($scope, $http) {
        console.log("integracion controller initialized");

        


        var c = [];
        var n = [];
        var t = [];
        var p = [];
        var union = [];
        var googleDataInt = [
            ["Country", "Population"]
        ];

        $http.get("/api/v1/buses").then(function(responseBuses) {





            $http.get("").then(function(responseRest) {
                for (var i = 0; i < responseRest.data.length; i++) {
                    c.push([responseRest.data[i].name, responseRest.data[i].area]);
                    console.log(responseRest.data);

                }



                
                console.log(c);

            });

        });
    }]);

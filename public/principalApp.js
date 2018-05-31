/*global angular*/

angular.module("Principal", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "index1.html"
    }).
    /*PACO*/
    when("/motogp-stats", {
        templateUrl: "../public_apis/motogp/front-end/list.html",
        controller: "ListCtrl"
    }).
    when("/pilot/:year", {
            templateUrl: "../public_apis/motogp/front-end/edit.html",
            controller: "EditCtrl"
        })
        /*PACO*/
        .when("/motogp-stats", {
            templateUrl: "../public_apis/motogp/front-end/list.html",
            controller: "ListCtrl1"
        }).
    when("/pilot/:year", {
        templateUrl: "../public_apis/motogp/front-end/edit.html",
        controller: "EditCtrl1"
    }).
    when("/graphsmoto", {
        templateUrl: "../public_apis/motogp/front-end/graph1.html",
        controller: "Graph1Ctrl"
    }).
    when("/integrationmoto1", {
        templateUrl: "../public_apis/motogp/front-end/univStatsMotogpGraphs.html",
        controller: "univStatsMotogpGraphsCtrl"
    }).
    when("/integrationmoto2", {
        templateUrl: "../public_apis/motogp/front-end/pollutionCitiesMotogpGraphs.html",
        controller: "pollutionCitiesMotogpGraphsCtrl"
    }).when("/integrationmotoext1", {
        templateUrl: "../public_apis/motogp/front-end/integration1.html",
        controller: "integration1Ctrl"
    }).
    when("/integrationmotoext2", {
        templateUrl: "../public_apis/motogp/front-end/integration2.html",
        controller: "integration2Ctrl"
    }).
    /*DAVID*/


    when("/builders", {
        templateUrl: "../public_apis/builders/front-end/list.html",
        controller: "ListCtrl"
    }).
    when("/builder/:year", {
        templateUrl: "../public_apis/builders/front-end/edit.html",
        controller: "EditCtrl"
    }).
    when("/graphsBuilders", {
        templateUrl: "../public_apis/builders/front-end/graph.html",
        controller: "GraphCtrl"
    }).
    when("/integrationSOSSinProxy", {
        templateUrl: "../public_apis/builders/front-end/integrationSOS-SinProxy.html",
        controller: "IntegrationSOSSinProxy"
    }).
    when("/integrationSOSConProxy", {
        templateUrl: "../public_apis/builders/front-end/integrationSOS-ConProxy.html",
        controller: "IntegrationSOSConProxy"

            /*VICTOR*/

        }).when("/buses", {
            templateUrl: "../public_apis/buses/front-end/list.html",
            controller: "ListCtrl2"
        })
        .when("/graphsBuses", {
            templateUrl: "../public_apis/buses/front-end/graphs.html",
            controller: "MainCtrl"
        })
        .when("/integracionBuses", {
            templateUrl: "../public_apis/buses/front-end/integracion.html",
            controller: "IntegracionCtrl3"
        })
        .when("/integracionProxyBuses", {
            templateUrl: "../public_apis/buses/front-end/integracionProxy.html",
            controller: "IntegracionProxy"
        })
        .when("/buses/:community", {
            templateUrl: "../public_apis/buses/front-end/edit.html",
            controller: "EditCtrl2"
        });


});

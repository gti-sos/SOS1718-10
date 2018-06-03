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
    when("/integrationmotoext3", {
        templateUrl: "../public_apis/motogp/front-end/integration3.html",
        controller: "integration3Ctrl"
    }).
    when("/integrationmotoext4", {
        templateUrl: "../public_apis/motogp/front-end/integration4.html",
        controller: "integration4Ctrl"
    }).when("/integrationmotoext5", {
        templateUrl: "../public_apis/motogp/front-end/integrationPetao.html",
        controller: "integration5Ctrl"
    }).
    when("/integrationmotoext6", {
        templateUrl: "../public_apis/motogp/front-end/integration6.html",
        controller: "integration6Ctrl"
    }).
    when("/integrationmotoext7", {
        templateUrl: "../public_apis/motogp/front-end/integration7.html",
        controller: "integration7Ctrl"
    }).
    when("/analytics", {
        templateUrl: "../public_apis/integration.html",
        controller: "integrationCtrl"
    }).
    when("/integrations", {
        templateUrl: "../public_apis/grupo.html"
    }).
    when("/about", {
        templateUrl: "../public_apis/videos.html"
    }).
    when("/motogp-stats-profile", {
        templateUrl: "../public_apis/motogp/index.html"
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
    when("/builders-profile", {
        templateUrl: "../public_apis/builders/index.html"
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
    }).
    when("/integrationApiExterna1", {
        templateUrl: "../public_apis/builders/front-end/apiExterna1.html",
        controller: "ApiExterna1Ctrl"
    }).
    when("/integrationApiExterna2", {
        templateUrl: "../public_apis/builders/front-end/apiExterna2.html",
        controller: "ApiExterna2Ctrl"
    }).
    when("/integrationApiExterna3", {
        templateUrl: "../public_apis/builders/front-end/apiExterna3.html",
        controller: "ApiExterna3Ctrl"
    }).
    when("/integrationApiExterna4", {
        templateUrl: "../public_apis/builders/front-end/apiExterna4.html",
        controller: "ApiExterna4Ctrl"
    }).
    when("/integrationApiSOS1", {
        templateUrl: "../public_apis/builders/front-end/apiSOS1.html",
        controller: "ApiSOS1Ctrl"
    }).
    when("/integrationApiSOS2", {
        templateUrl: "../public_apis/builders/front-end/apiSOS2.html",
        controller: "ApiSOS2Ctrl"
    }).
    when("/integrationApiSOS3", {
            templateUrl: "../public_apis/builders/front-end/apiSOS3.html",
            controller: "ApiSOS3Ctrl"
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
        .when("/integracionFinalI", {
            templateUrl: "../public_apis/buses/front-end/integracionFinalI.html",
            controller: "IntegracionFinalI"
        })
        .when("/integracionFinalII", {
            templateUrl: "../public_apis/buses/front-end/integracionFinalII.html",
            controller: "IntegracionFinalII"
        })
        .when("/integracionFinal3", {
            templateUrl: "../public_apis/buses/front-end/integracionFinal3.html",
            controller: "IntegracionFinal3"
        })
        .when("/buses/:community", {
            templateUrl: "../public_apis/buses/front-end/edit.html",
            controller: "EditCtrl2"
        });


});

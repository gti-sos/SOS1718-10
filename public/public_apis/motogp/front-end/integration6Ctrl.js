angular.module("Principal").controller("integration6Ctrl", ["$scope", "$http", function($scope, $http) {
    console.log("integration6 Ctrl initialized!");
    var apiMotogp = "/api/v1/motogp-stats";
    var apiW = 'https://simple-weather.p.mashape.com/weatherdata?lat=40.0&lng=-3.0&mashape-key=d8593BVX5dmshF2FTxE1j7VTjI1fp1NZA3ijsnlGTaAgUqSAaE';


    $http.get(apiMotogp).then(function(response) {


        $http.get(apiW).then(function doneFilter(responseExterna) {


            FusionCharts.ready(function() {
                var wealthChart = new FusionCharts({
                        type: 'pyramid',
                        renderAt: 'chart-container',
                        id: 'wealth-pyramid-chart',
                        width: '500',
                        height: '400',
                        dataFormat: 'json',
                        dataSource: {
                            "chart": {
                                "theme": "fint",
                                "caption": "MOTO GP & SIMPLE WEATHER DATS",
                                "captionOnTop": "0",
                                "captionPadding": "25",
                                "alignCaptionWithCanvas": "1",
                                "subcaption": "Credit Suisse 2013",
                                "subCaptionFontSize": "12",
                                "borderAlpha": "20",
                                "is2D": "1",
                                "bgColor": "#ffffff",
                                "showValues": "1",
                                "numberPrefix": "$",
                                "numberSuffix": "M",
                                "plotTooltext": "$label of world population is worth USD $value tn ",
                                "showPercentValues": "1",
                                "chartLeftMargin": "40"
                            },
                            "data": [{
                                    "label": response.data[0]["country"],
                                    "value": responseExterna.data["query"]["results"]["channel"]["ttl"]
                                },
                                {
                                    "label": response.data[1]["country"],
                                    "value": responseExterna.data["query"]["results"]["channel"]["image"]["width"] + " px"
                                },
                                {
                                    "label": response.data[2]["country"],
                                    "value": responseExterna.data["query"]["results"]["channel"]["image"]["height"] + " px"
                                },
                                {
                                    "label": response.data[3]["country"],
                                    "value": responseExterna.data["query"]["results"]["channel"]["item"]["lat"] + "º"
                                },
                                {
                                    "label": response.data[4]["country"],
                                    "value": responseExterna.data["query"]["results"]["channel"]["item"]["long"] + "º"
                                },
                                {
                                    "label": response.data[5]["country"],
                                    "value": responseExterna.data["query"]["results"]["channel"]["item"]["condition"]["code"] + " px"
                                }
                            ]
                        }
                    })

                    .render();
            });

        });

    });

}]);

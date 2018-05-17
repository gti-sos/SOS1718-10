/*global angular*/
/*global Highcharts*/
/*global google*/
/*global echarts*/

angular
    .module("Principal")
    .controller("MainCtrl", ["$scope", "$http", function($scope, $http) {
                console.log("main controller initialized");


                $http.get("/api/v1/buses").then(function(response) {
                        console.log(response.data.map(function(d) { return d.transportedTraveler }));


                        Highcharts.chart('analytics', {

                            title: {
                                text: 'Buses'
                            },

                            yAxis: {

                                title: {
                                    text: 'Transported Traveler'
                                }
                            },
                            xAxis: {
                                categories: response.data.map(function(d) { return d.year })
                            },

                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle'
                            },

                            plotOptions: {
                                series: {
                                    label: {
                                        connectorAllowed: false
                                    },
                                    //pointStart: 2010
                                }
                            },

                            series: [{
                                name: 'Transported Traveler',
                                data: response.data.map(function(d) { return parseInt(d.transportedTraveler) })
                            }]

                        });
            
            
            
/////////////////////////////////GOOGLE CHART///////////////////////////////////

                        var com;
                        var trans;
                        var googleChartData = [
                            ["Region", "Transported Traveler"]
                        ];

                        for (var i = 0; i < response.data.length; i++) {
                            com = response.data[i].community;
                            trans = response.data[i].transportedTraveler;
                            googleChartData.push([com, trans]);
                        }
                        console.log(googleChartData);


                        google.charts.load('current', {
                            'packages': ['geochart'],
                            // Note: you will need to get a mapsApiKey for your project.
                            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                        });
                        google.charts.setOnLoadCallback(drawRegionsMap);

                        function drawRegionsMap() {
                            var data = google.visualization.arrayToDataTable(googleChartData);

                            var options = {

                                region: 'ES',
                                resolution: 'provinces'

                            };

                            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                            chart.draw(data, options);
                        }


                        /////////////////////////ECHART/////////////////////////////////////////////////
                        
                       

                        var myChart = echarts.init(document.getElementById('main'));

                        

                        var option = {
                            title: {
                                text: 'Travelers'
                            },
                            tooltip: {},
                            legend: {
                                data: ['销量']
                            },
                            xAxis: {
                                text: 'years',
                                data: response.data.map(function(d) { return d.year })
                            },
                            yAxis: {
                                text: 'Transported Traveler'
                            },
                            series: [{
                                name: 'Transported Traveler',
                                type: 'bar',
                                data: response.data.map(function(d) { return parseInt(d.transportedTraveler) })
                            }]
                        };
                        myChart.setOption(option);
                    


                });


  }]);
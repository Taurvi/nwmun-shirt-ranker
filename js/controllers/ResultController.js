'use strict';
angular.module('ngApp')
    .controller('ResultController', ['$scope', 'ResultsClass', function ($scope, ResultsClass) {
        $scope.getData = function() {
            socket.emit('getData');
        };

        $scope.rawResults = null;
        $scope.results = null;
        var graphData = [];

        socket.on('returnData', function(data) {
            var jsonData = JSON.parse(data);
            $scope.rawResults = jsonData;
            $scope.results = new ResultsClass(jsonData);
            $scope.$apply();

            for (var color in $scope.results.colors) {
                var ranking = 0;
                for (var i = 0; i < $scope.results.colors[color].length; i++) {
                    var rank =  $scope.results.colors[color][i];
                    ranking += parseInt(rank);
                }

                graphData.push([color, ranking]);
            }

            graphData.sort(function(a, b) {return a[1] - b[1]});

            // Load the Visualization API and the corechart package.
            google.charts.load('current', {'packages':['corechart']});

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);
        });

        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
        function drawChart() {

            // Create the data table.
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Color');
            data.addColumn('number', 'Ranking');

            data.addRows(graphData);

            // Set chart options
            var options = {
                title: 'T-Shirt Rankings',
                height: 600,
                legend: {position: 'none'}
            };
            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }

    }]);
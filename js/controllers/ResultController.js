'use strict';
angular.module('ngApp')
    .controller('ResultController', ['$scope', 'ResultsClass', function ($scope, ResultsClass) {
        $scope.getData = function() {
            socket.emit('getData');
            $('#button').hide();
        };

        $scope.rawResults = null;
        $scope.results = null;
        var graphData = [];
        var table = $('#table').get(0);

        socket.on('returnData', function(data) {
            var jsonData = JSON.parse(data);
            $scope.rawResults = jsonData;
            $scope.results = new ResultsClass(jsonData);
            $scope.$apply();

            for (var color in $scope.results.colors) {
                var ranking = 0;
                var count = 0;
                for (var i = 0; i < $scope.results.colors[color].length; i++) {
                    var rank =  $scope.results.colors[color][i];
                    if (rank != -1) {
                        ++count;
                        ranking += parseInt(rank);
                    }
                }

                ranking /= count;
                graphData.push([color, ranking]);
            }

            var tableData = graphData;
            tableData.sort(function(a, b) {return b[1] - a[1]});

            var row = table.insertRow(-1);
            var x = 0;
            for (var index in tableData) {
                var color = tableData[index][0];
                var ranking = tableData[index][1];

                if (x == 4) {
                    var cell1 = row.insertCell(4);
                    row = table.insertRow(-1);
                } else if (x==3) {
                    var cell1 = row.insertCell(3);
                } else if (x==2) {
                    var cell1 = row.insertCell(2);
                } else if (x == 1) {
                    var cell1 = row.insertCell(1);
                } else if (x == 0) {
                    var cell1 = row.insertCell(0);
                }

                cell1.innerHTML = color + " <b>" + ranking + "</b><br><img src='img/shirts/" + (color.toLowerCase()).replace(/\s/g,"_") + ".jpg'><br><br>";
                if (x == 4) {
                    x = 0;
                } else {
                    x++;
                }
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
                legend: {position: 'none'},
                vAxis: {format:'#'}
            };
            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }

    }]);
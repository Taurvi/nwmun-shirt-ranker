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
        var table = $('#table');

        $(window).resize(function() {
            if(this.resizeTO) clearTimeout(this.resizeTO);
            this.resizeTO = setTimeout(function() {
                $(this).trigger('resizeEnd');
            }, 100);
        });

        //redraw graph when window resize is completed
        $(window).on('resizeEnd', function() {
            if (graphData.length != 0) {
                drawChart();
            }
        });

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
                        ranking += parseFloat(rank);
                    }
                }

                ranking = Math.round((ranking/count) * 100) / 100;
                graphData.push([color, ranking]);
            }

            var tableData = graphData;
            tableData.sort(function(a, b) {return b[1] - a[1]});

            var row =  $("<div class='row'>");
            table.append(row);

            for (var index in tableData) {
                var color = tableData[index][0];
                var ranking = tableData[index][1];

                var col = $("<div class='col-xs-6 col-sm-6 col-md-3 col-lg-3 text-center' style='text-align:center'>");
                row.append(col);
                col.html(color + " <b>" + ranking + "</b><br>" +
                    "<img class='img-responsive' src='img/shirts/" + (color.toLowerCase()).replace(/\s/g,"_") + ".jpg'><br><br>");
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
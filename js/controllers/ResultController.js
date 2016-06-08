'use strict';
angular.module('ngApp')
    .controller('ResultController', ['$scope', 'ResultsClass', function ($scope, ResultsClass) {
        $scope.getData = function() {
            socket.emit('getData');
        };

        /*$scope.results = null;

        socket.on('returnData', function(data) {
            var jsonData = JSON.parse(data);
            $scope.results = new ResultsClass(jsonData);
            $scope.$apply();

            console.log($scope.results.colors)
        });*/




    }]);
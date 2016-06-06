'use strict';
angular.module('ngApp')
    .controller('MainController', ['$scope', 'ShirtClass', function ($scope, ShirtClass) {
var rawShirtList = [
    {
        color: 'Aquatic Blue',
        image: 'aquatic_blue'
    },
    {
        color: 'Athletic Maroon',
        image: 'athletic_maroon'
    },
    {
        color: 'Cardinal',
        image: 'cardinal'
    },
    {
        color: 'Charcoal',
        image: 'charcoal'
    },
    {
        color: 'Colonial Blue',
        image: 'colonial_blue'
    },
    {
        color: 'Dark Heather Gray',
        image: 'dark_heather_gray'
    },
    {
        color: 'Gold',
        image: 'gold'
    },
    {
        color: 'Jade Green',
        image: 'jade_green'
    },
    {
        color: 'Olive',
        image: 'olive'
    },
    {
        color: 'Orange Sherbet',
        image: 'orange_sherbet'
    },
    {
        color: 'Pale Pink',
        image: 'pale_pink'
    },
    {
        color: 'Pistachio',
        image: 'pistachio'
    },
    {
        color: 'Rich Red',
        image: 'rich_red'
    },
    {
        color: 'Royal',
        image: 'royal'
    },
    {
        color: 'Sapphire',
        image: 'sapphire'
    },
    {
        color: 'Steel Blue',
        image: 'steel_blue'
    },
    {
        color: 'Stonewashed Blue',
        image: 'stonewashed_blue'
    },
    {
        color: 'Stonewashed Green',
        image: 'stonewashed_green'
    },
    {
        color: 'Teal',
        image: 'teal'
    },
    {
        color: 'Turquoise',
        image: 'Turquoise'
    },
    {
        color: 'Ultramarine Blue',
        image: 'ultramarine_blue'
    },
];
        $scope.parsedShirts = {};
        $scope.loadedShirts = false;
        $scope.loadedThankYou = false;
        $scope.submitting = false;
        $scope.submitted = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.initialize = function(username) {
            rawShirtList.map(function(rawShirt) {
                $scope.parsedShirts[rawShirt.image] = new ShirtClass(rawShirt.color, rawShirt.image, username);
            });
            $scope.loadedShirts = true;
        };

        $scope.getObject = function() {
            console.log($scope.parsedShirts);
        };

        $scope.submit = function() {
            $scope.submitting = true;
            var keys = Object.keys($scope.parsedShirts);
            var finalObj = {};
            var user = '';
            keys.map(function(shirtColor) {
                $scope.parsedShirts[shirtColor];
                finalObj[shirtColor] = $scope.parsedShirts[shirtColor].toJSON();
                user = $scope.parsedShirts[shirtColor].user;
            });
            finalObj.user = user;
            socket.emit('submitShirts', finalObj);
        };

        socket.on('submitSuccess', function() {
            $scope.submitting = false;
            $scope.submitted = true;
        });

    }]);
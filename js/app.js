'use strict';
// PROD
//var socket = io('http://52.39.98.129:3000');
// DEV
var socket = io('http://localhost:3000');
var ngApp = angular.module('ngApp', ['ui.router', 'ui.bootstrap'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: 'js/views/survey.html',
                        controller: 'MainController'
                    }
                }
            })
            .state('results', {
                url: '/results',
                views: {
                    'content': {
                        templateUrl: 'js/views/results.html',
                        controller: 'ResultController'
                    }
                }
            });

    }]);
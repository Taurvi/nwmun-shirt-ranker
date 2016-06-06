'use strict';
// PROD
var socket = io('http://52.39.98.129:3000');
// DEV
//var socket = io('http://localhost:3000');
var ngApp = angular.module('ngApp', ['ui.bootstrap'])
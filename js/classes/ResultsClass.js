'use strict';
angular.module('ngApp')
    .factory('ResultsClass', [function () {
        var _parseColors = function(rawData) {
            var names = Object.keys(rawData);

            var colorKeys = Object.keys(rawData[names[0]]);

            var parsedColors = {};

            names.map(function(name) {
                var userResult = rawData[name];
                colorKeys.map(function(color) {
                    if (!parsedColors.hasOwnProperty(color)) {
                        parsedColors[color] = [color];
                    }
                    parsedColors[color].push(userResult[color]);
                });
            });
            return parsedColors;
        };

        var ResultsClass = function ResultsClass(rawData) {
            this._rawData = rawData;
            console.log(rawData);

            this._colors = _parseColors(this._rawData);
            Object.defineProperties(this, {
                'rawData': {
                    get: function () {
                        var self = this;
                        return self._rawData;
                    }
                },
                'colors': {
                    get:function() {
                        var self = this;
                        return self._colors;
                    }
                },
                'colorKeys':{
                    get: function() {
                        var self = this;
                        return Object.keys(self._colors);
                    }
                }
            });
        };/*

        ResultsClass.prototype.toJSON = function() {
            var self = this;
            var tempObj = {
                color: self.color,
                image: self.image,
                rating: self.rating
            }
            return tempObj;
        };
*/
        return ResultsClass;
    }]);
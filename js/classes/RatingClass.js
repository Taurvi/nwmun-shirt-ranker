'use strict';
angular.module('ngApp')
    .factory('RatingClass', [function () {
        var RatingClass = function RatingClass(color, image, rating) {
            this._color = color;
            this._image = image;
            this._rating = -1;

            Object.defineProperties(this, {
                'color': {
                    get: function () {
                        var self = this;
                        return self._color;
                    }
                },
                'image': {
                    get: function () {
                        var self = this;
                        return self._image;
                    }
                },
                'rating': {
                    get: function () {
                        var self = this;
                        return self._rating;
                    }
                },
            });
        };

        RatingClass.prototype.toJSON = function() {
            var self = this;
            var tempObj = {
                color: self.color,
                image: self.image,
                rating: self.rating
            }
            return tempObj;
        };

        return RatingClass;
    }]);
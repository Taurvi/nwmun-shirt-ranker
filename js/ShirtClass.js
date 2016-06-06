'use strict';
angular.module('ngApp')
    .factory('ShirtClass', [function () {
        var ShirtClass = function ShirtClass(color, image, username) {
            this._color = color;
            this._image = image;
            this._user = username;
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
                'user': {
                    get: function () {
                        var self = this;
                        return self._user;
                    },
                    set: function (username) {
                        var self = this;
                        self._user = username;
                    }
                },
                'rating': {
                    get: function () {
                        var self = this;
                        return self._rating;
                    },
                    set: function (rating) {
                        var self = this;
                        self._rating = rating;
                    }
                },
            });
        };

        ShirtClass.prototype.toJSON = function() {
            var self = this;
            var tempObj = {
                color: self.color,
                image: self.image,
                rating: self.rating
            }
            return tempObj;
        };

        return ShirtClass;
    }]);
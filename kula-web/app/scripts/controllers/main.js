'use strict';

angular.module('kulaWebApp')
    .controller('MainCtrl', ['$scope', 'Post', '$rootScope', '$timeout', 'Event', '$window', function ($scope, Post, $rootScope, $timeout, Event, $window) {
        $scope.posts = Post.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
        $scope.events = Event.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
        $scope.GetTiming = function (event) {
            var now = new Date();
            if (event.start && now < new Date(event.start)) {
                return parseInt((new Date(event.start) - now) / 86400000) + ' days later';
            } else if (event.expire && now < new Date(event.expire)) {
                return parseInt((new Date(event.expire) - now) / 86400000) + ' days left';
            } else {
                return 'Expired';
            }
        };

        $scope.GoToExternalUrl = function (url) {
            if (url) {
                $window.open(url);
            }
        };
    }]);

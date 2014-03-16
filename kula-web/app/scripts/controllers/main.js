'use strict';

angular.module('kulaWebApp')
    .controller('MainCtrl', ['$scope', 'Post', '$rootScope', '$timeout', 'Event', function ($scope, Post, $rootScope, $timeout, Event) {
        $scope.posts = Post.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
        $scope.events = Event.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
    }]);

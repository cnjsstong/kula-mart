'use strict';

angular.module('kulaWebApp')
    .controller('MainCtrl', ['$scope', 'Post', '$rootScope', '$timeout', function ($scope, Post, $rootScope, $timeout) {
        $scope.posts = Post.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
    }]);

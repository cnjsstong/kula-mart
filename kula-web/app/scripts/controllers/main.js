'use strict';

angular.module('kulaWebApp')
    .controller('MainCtrl', ['$scope', 'Post', '$rootScope', function ($scope, Post, $rootScope) {
        $scope.posts = Post.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
    }]);

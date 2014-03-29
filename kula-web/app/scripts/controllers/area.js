'use strict';

angular.module('kulaWebApp')
    .controller('AreaCtrl', ['$scope', 'Post', '$routeParams', function ($scope, Post, $routeParams) {
        if ($routeParams.areaId) {
            $scope.posts = Post.query({areaId: $routeParams.areaId});
            $scope.message = $routeParams.areaId;
        } else {
            $scope.posts = Post.query();
        }
    }]);

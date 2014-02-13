'use strict';

angular.module('kulaWebApp')
    .controller('MarketCtrl', ['$scope', 'Post', '$routeParams', 'CategoryService', function ($scope, Post, $routeParams, CategoryService) {
        if($routeParams.categoryTitle) {
            $scope.posts = Post.query({categoryTitle: $routeParams.categoryTitle});
            $scope.message = $routeParams.categoryTitle;
        } else {
            $scope.posts = Post.query();
        }
    }]);

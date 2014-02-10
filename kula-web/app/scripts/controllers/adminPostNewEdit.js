'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostNewEditCtrl', ['$scope', 'Post', 'Category', 'Area', '$routeParams', '$location', function ($scope, Post, Category, Area, $routeParams, $location) {

        function loadPost(postId) {
            $scope.categories = Category.query();
            $scope.areas = Area.query();
            if (postId) {
                $scope.post = Post.get({postId: postId});
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadPost($routeParams.postId);
        });

        $scope.Submit = function (post) {
            Post.save({postId: $routeParams.postId}, post);
            $location.path('/admin/post');
        }

    }]);

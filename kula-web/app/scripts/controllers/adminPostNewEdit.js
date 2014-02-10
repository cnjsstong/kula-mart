'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostNewEditCtrl', ['$scope', 'Post', 'Category', 'Area', '$routeParams', '$location', function ($scope, Post, Category, Area, $routeParams, $location) {

        function loadPost() {
            $scope.categories = Category.query();
            $scope.areas = Area.query();
            if ($routeParams.postId) {
                $scope.post = Post.get({postId: $routeParams.postId});
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadPost();
        });

        $scope.Submit = function (post) {
            Post.save({postId: $routeParams.postId}, post);
            $location.path('/admin/post');
        }

    }]);

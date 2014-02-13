'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostNewEditCtrl', ['$scope', 'Post', 'Category', 'Area', '$routeParams', '$location', 'UploadService', '$window', function ($scope, Post, Category, Area, $routeParams, $location, UploadService, $window) {

        function loadPost(postId) {
            $scope.categories = Category.query();
            $scope.areas = Area.query();
            $scope.post = { images: [] }
            if (postId) {
                $scope.post = Post.get({postId: postId});
            }
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadPost($routeParams.postId);
        });

        $scope.Submit = function (post) {
            Post.save({postId: $routeParams.postId}, post);
//            $location.path('/admin/post');
            $window.history.back();
        };

        $scope.UploadImage = function(file) {
            console.log(file);
            UploadService.upload(file).then(function(res) {
                $scope.post.images.push(res);
                console.log(res);
            });
        };

    }]);

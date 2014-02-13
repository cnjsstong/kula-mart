'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostListCtrl', ['$scope', 'Post', 'Category', '$location', function ($scope, Post, Category, $location) {

        function loadPosts() {
            $scope.posts = Post.query();
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadPosts();
        });

        $scope.RemovePost = function(post, $index) {
            console.log(post);
            Post.delete({postId: post._id}, function(){
                $scope.posts.splice($index,1);
            })
        };

        $scope.EditPost = function(post, $index) {
            console.log(post);
            $location.path('/admin/post/'+post._id);
        };
    }]);

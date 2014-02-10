'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostListCtrl', ['$scope', 'Post', 'Category', '$location', function ($scope, Post, Category, $location) {

        function loadPosts() {
            $scope.posts = Post.query(function() {
                for(var p in $scope.posts) {
                    if($scope.posts[p].hasOwnProperty('category')) {
                        $scope.posts[p].categoryObject = Category.get({categoryId:$scope.posts[p].category});
                    }
                }
            });
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

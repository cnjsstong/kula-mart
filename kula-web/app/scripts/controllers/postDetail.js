'use strict';

angular.module('kulaWebApp')
    .controller('PostDetailCtrl', ['$scope', 'Post', '$routeParams', 'CategoryService', function ($scope, Post, $routeParams, CategoryService) {
        $scope.post = Post.get({postId: $routeParams.postId});
        $scope.Reply = function(post, reply) {
            Post.reply({postId: $routeParams.postId},{content: reply, author: ''});
        }
    }]);

'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostNewEditCtrl', ['$scope', 'Post', 'Category', function ($scope, Post, Category) {
        $scope.post = Post.get({categoryId: '52ed94fe411e84cc13c24c9f' });
        $scope.categories = Category.query();
        $scope.Submit = function(post) {
            console.log(post);
            Post.save(post);
        }
    }]);

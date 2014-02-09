'use strict';

angular.module('kulaWebApp')
    .controller('AdminPostListCtrl', ['$scope', 'Post', 'Category', '$q', function ($scope, Post, Category, $q) {
        $scope.posts = Post.query();
        $scope.GetCategory = function (categoryId) {
            if(categoryId && categoryId.length>20) {
                return Category.get({categoryId: categoryId});
            }
        };
    }]);

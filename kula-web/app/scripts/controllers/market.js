'use strict';

angular.module('kulaWebApp')
    .controller('MarketCtrl', ['$scope', 'Post', function ($scope, Post) {
        $scope.posts = Post.query();
    }]);

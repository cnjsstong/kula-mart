'use strict';

angular.module('kulaWebApp')
  .controller('MainCtrl', ['$scope', 'Post', function ($scope, Post) {
        $scope.posts = Post.query();
  }]);

'use strict';

angular.module('kulaWebApp')
    .controller('MyCtrl', ['$scope', 'Post', '$rootScope', 'CategoryService', 'Category', function ($scope, Post, $rootScope, CategoryService, Category) {

        $scope.filter = {type: 'offer'};

        Post.myPosts({}, function (res) {
            $scope.posts = res;
        })

        $scope.FilterPosts = function (item) {
            if ($scope.filter.type != item.type) {
                return false;
            }
            if (!$scope.filter.tag) {
                return true;
            }
            if (item.tags.indexOf($scope.filter.tag) != -1) {
                return true;
            }
            return false;
        }
    }]);

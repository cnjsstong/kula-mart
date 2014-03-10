'use strict';

angular.module('kulaWebApp')
    .controller('MarketCtrl', ['$scope', 'Post', '$rootScope', 'CategoryService', 'Category', '$routeParams', '$location', function ($scope, Post, $rootScope, CategoryService, Category, $routeParams, $location) {

        $scope.filter = {type: 'offer', keyword: $routeParams.keyword};

        $scope.$on('$locationChangeStart', function() {
            console.log('Removing search...');
            $location.search({});
        });

        Category.query({}, function (res) {
            $scope.categories = res;
            console.log(res);
            $scope.ShowCategory = function ($index) {
                $scope.filter.tag = null;
                if ($index) {
                    if (!$scope.categories[$index]['tags']) {
                        Post.getTagsByCategory({category: $scope.categories[$index]._id, area: $rootScope.currentArea._id }, function (res) {
                            $scope.categories[$index]['tags'] = res;
                        });
                    }
                    Post.query({areaId: $rootScope.currentArea._id, categoryId: $scope.categories[$index]._id}, function (res) {
                        $scope.posts = res;
                    });
                } else {
                    if (!$scope.allTags) {
                        Post.getTagsByCategory({area: $rootScope.currentArea._id}, function (res) {
                            $scope.allTags = res;
                        })
                    }
                    Post.query({areaId: $rootScope.currentArea._id}, function (res) {
                        $scope.posts = res;
                    });
                }
                $scope.showCategory = $index;
            };
            $scope.ShowCategory();
        });

        $scope.FilterPosts = function (item) {
            if ($scope.filter.keyword && (!item.title || item.title.indexOf($scope.filter.keyword) == -1) && (!item.description || item.description.indexOf($scope.filter.keyword) == -1) && (item.tags.length == 0 || item.tags.indexOf($scope.filter.keyword) == -1)) {
                return false;
            }
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
        };

        $scope.UpdateSearch = function(keyword) {
            $location.search({keyword: keyword});
        }
    }]);

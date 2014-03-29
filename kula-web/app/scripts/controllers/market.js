'use strict';

angular.module('kulaWebApp')
    .controller('MarketCtrl', ['$scope', 'Post', '$rootScope', 'CategoryService', 'Category', '$routeParams', '$location', function ($scope, Post, $rootScope, CategoryService, Category, $routeParams, $location) {

        $scope.filter = {type: 'offer', keyword: $routeParams.keyword};
        if($scope.filter.keyword) {
            $scope.filter.lowerKeyword = $scope.keyword.toLowerCase();
        }

        $scope.$on('$locationChangeStart', function () {
            console.log('Removing search...');
            $location.search({});
        });

        Category.query({}, function (res) {
            $scope.categories = res;
            console.log(res);
            $scope.ShowCategory = function ($index) {
                $scope.filter.tag = null;
                if ($index >= 0) {
                    if (!$scope.categories[$index]['tags']) {
                        Post.getTagsByCategory({category: $scope.categories[$index]._id, area: $rootScope.currentArea._id }, function (res) {
                            $scope.categories[$index]['tags'] = res;
                        });
                    }
                    Post.query({areaId: $rootScope.currentArea._id, categoryId: $scope.categories[$index]._id}, function (res) {
                        $scope.posts = res;
                        $scope.reloadAll();
                    });
                } else {
                    if (!$scope.allTags) {
                        Post.getTagsByCategory({area: $rootScope.currentArea._id}, function (res) {
                            $scope.allTags = res;
                        })
                    }
                    Post.query({areaId: $rootScope.currentArea._id}, function (res) {
                        $scope.posts = res;
                        $scope.reloadAll();
                    });
                }
                $scope.showCategory = $index;
            };
            $scope.ShowCategory(-1);
        });

        $scope.reloadAll = function () {
            $scope.filteredPosts = $scope.getFilteredPosts();
            $scope.loadMore(true);
        };

        $scope.loadMore = function (refresh) {
            if (refresh) {
                $scope.showingPosts = [];
            }
            var from = $scope.showingPosts.length;
            for (var i = from; i < from + 10 && i < $scope.filteredPosts.length; i++) {
                $scope.showingPosts.push($scope.filteredPosts[i]);
            }
        };

        $scope.getFilteredPosts = function () {
            var filteredPosts = [];
            for (var i in $scope.posts) {
                if ($scope.FilterPosts($scope.posts[i])) {
                    filteredPosts.push($scope.posts[i]._id);
                }
            }
            return filteredPosts;
        };

        $scope.FilterPosts = function (item) {
            if ($scope.filter.keyword && (!item.title || item.title.toLowerCase().indexOf($scope.filter.lowerKeyword) == -1) && (!item.description || item.description.toLowerCase().indexOf($scope.filter.lowerKeyword) == -1) && (!item.tags || item.tags.length == 0 || item.tags.join().toLowerCase().indexOf($scope.filter.lowerKeyword) == -1)) {
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

        $scope.UpdateSearch = function (keyword) {
            if(keyword) {
                $scope.filter.lowerKeyword = keyword.toLowerCase();
                $location.search({keyword: keyword});
            } else {
                $scope.filter.lowerKeyword = '';
                $location.search({});
            }
            $scope.reloadAll();
        };

        $scope.SetFilterTag = function (tag) {
            $scope.filter.tag = tag;
            $scope.reloadAll();
        };

        $scope.SetFilterType = function (type) {
            $scope.filter.type = type;
            $scope.reloadAll();
        };
    }]);

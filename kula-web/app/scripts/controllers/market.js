'use strict';

angular.module('kulaWebApp')
    .controller('MarketCtrl', ['$scope', 'Post', '$rootScope', 'CategoryService', 'Category', function ($scope, Post, $rootScope, CategoryService, Category) {

        $scope.filter = {type: 'offer'};

        $scope.message = $rootScope.currentArea._id;

        Category.query({}, function (res) {
            $scope.categories = res;
            console.log(res);
            $scope.ShowCategory = function ($index) {
                $scope.filter.tag = null;
                if (!$scope.categories[$index]['tags']) {
                    Post.getTagsByCategory({category: $scope.categories[$index]._id, area: $rootScope.currentArea._id }, function (res) {
                        $scope.categories[$index]['tags'] = res;
                    });
                }
                $scope.showCategory = $index;
                Post.query({areaId: $rootScope.currentArea._id, categoryId: $scope.categories[$index]._id}, function (res) {
                    $scope.posts = res;
                })
            };
            $scope.ShowCategory(0);
        });

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

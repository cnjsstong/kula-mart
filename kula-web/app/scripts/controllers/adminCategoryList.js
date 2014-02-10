'use strict';

angular.module('kulaWebApp')
    .controller('AdminCategoryListCtrl', ['$scope', 'Category', '$location', function ($scope, Category, $location) {

        function loadCategories() {
            $scope.categories = Category.query();
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadCategories();
        });

        $scope.RemoveCategory = function(category, $index) {
            console.log(category);
            Category.delete({categoryId: category._id}, function(){
                $scope.categories.splice($index,1);
            })
        };

        $scope.EditCategory = function(category, $index) {
            console.log(category);
            $location.path('/admin/category/'+category._id);
        };

    }]);

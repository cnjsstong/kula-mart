'use strict';

angular.module('kulaWebApp')
    .controller('AdminCategoryNewEditCtrl', ['$scope', 'Category', '$routeParams', '$location', function ($scope, Category, $routeParams, $location) {

        function loadCategory(categoryId) {
            if (categoryId) {
                $scope.category = Category.get({categoryId: categoryId});
            }
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadCategory($routeParams.categoryId);
        });

        $scope.Submit = function (category) {
            Category.save({categoryId: $routeParams.categoryId}, category);
            $location.path('/admin/category');
        }

    }]);

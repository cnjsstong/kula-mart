'use strict';

angular.module('kulaWebApp')
    .controller('AdminCategoryNewEditCtrl', ['$scope', 'Category', '$routeParams', '$location', function ($scope, Category, $routeParams, $location) {

        function loadCategory() {
            if ($routeParams.categoryId) {
                $scope.category = Category.get({categoryId: $routeParams.categoryId});
            }
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadCategory();
        });

        $scope.Submit = function (category) {
            Category.save({categoryId: $routeParams.categoryId}, category);
            $location.path('/admin/category');
        }

    }]);

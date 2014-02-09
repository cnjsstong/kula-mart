'use strict';

angular.module('kulaWebApp')
    .controller('AdminCategoryNewEditCtrl', ['$scope', 'Category', '$routeParams', function ($scope, Category, $routeParams) {
        $scope.category = {id: $routeParams.categoryId};
        $scope.Submit = function (category) {
            console.log(category);
            Category.save(category);
        }
    }]);

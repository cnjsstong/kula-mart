'use strict';

angular.module('kulaWebApp')
    .controller('AdminCategoryCtrl', ['$scope', 'Category', function ($scope, Category) {
        $scope.Submit = function(category) {
            console.log(category);
            Category.save(category);
        }
    }]);

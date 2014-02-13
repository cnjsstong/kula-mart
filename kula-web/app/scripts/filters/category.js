angular.module('kulaWebApp')
    .filter('categoryTitle', ['CategoryService', function (CategoryService) {
        return function (category) {
            if (angular.isDefined(category)) {
                return CategoryService.getCategory(category).title || category;
            } else {
                return category;
            }
        };
    }]);
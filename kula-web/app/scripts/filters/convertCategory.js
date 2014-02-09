angular.module('kulaWebApp')
    .filter('convertCategory', ['Category', '$q', function (Category, $q) {
        return function (categoryId) {
            var defer = $q.defer();
            var c = Category.get({categoryId: categoryId}, function () {
                defer.resolve(c.title);
            });
            return defer.promise;
        };
    }]);
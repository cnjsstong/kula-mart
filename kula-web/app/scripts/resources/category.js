'use strict';

angular.module('resources').factory('Category', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'category/';
    return $resource(url + ':categoryId', {categoryId: '@id'}, {
    });
}]);
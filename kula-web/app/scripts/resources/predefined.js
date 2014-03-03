'use strict';

angular.module('resources').factory('Predefined', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'predefined/';
    return $resource(url + ':predefinedId', {predefinedId: '@id'}, {
    });
}]);
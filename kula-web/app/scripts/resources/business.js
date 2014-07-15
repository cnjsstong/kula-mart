'use strict';

angular.module('resources').factory('Business', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'business/';
    return $resource(url + ':businessId', {businessId: '@id'}, {
    });
}]);
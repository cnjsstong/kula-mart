'use strict';

angular.module('resources').factory('Area', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'area/';
    return $resource(url + ':areaId', {areaId: '@id'}, {
    });
}]);
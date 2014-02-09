'use strict';

angular.module('resources').factory('Post', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'post/';
    return $resource(url + ':postId', {postId: '@id'}, {
    });
}]);

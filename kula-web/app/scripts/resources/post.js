'use strict';

angular.module('resources').factory('Post', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'post/';
    return $resource(url + ':postId', {postId: '@id'}, {
        reply: {
            url: url + ':postId/reply',
            method: API.Method.POST
        },

        getReply: {
            url: url + ':postId/reply/:replyId',
            method: API.Method.GET
        },

        respond: {
            url: url + ':postId/reply/:replyId/respond',
            method: API.Method.POST
        },

        filtered: {
            url: url + 'filtered',
            method: API.Method.GET
        },

        getTagsByCategory: {
            url: url + 'tags',
            method: API.Method.GET,
            isArray: true
        },

        myPosts: {
            url: url + 'my',
            method: API.Method.GET,
            isArray: true
        }
    });
}]);

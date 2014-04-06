'use strict';

angular.module('resources').factory('Post', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'post/';
    return $resource(url + ':postId', {postId: '@id'}, {
        reply: {
            url: url + ':postId/reply',
            method: API.Method.POST
        },

        expire: {
            url: url + ':postId/expire',
            method: API.Method.PUT
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
        },

        adminQuery: {
            url: url+'admin',
            method: API.Method.GET,
            isArray: true
        },

        adminDelete: {
            url: url+'admin/:postId',
            method: API.Method.DELETE
        }
    });
}]);

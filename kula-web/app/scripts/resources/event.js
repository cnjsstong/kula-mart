'use strict';

angular.module('resources').factory('Event', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'event/';
    return $resource(url + ':eventId', {}, {

        adminQuery: {
            url: url + 'admin',
            method: API.Method.GET,
            isArray: true
        },

        reply: {
            url: url + ':eventId/reply',
            method: API.Method.POST
        },

        expire: {
            url: url + ':eventId/expire',
            method: API.Method.PUT
        },

        getReply: {
            url: url + ':eventId/reply/:replyId',
            method: API.Method.GET
        },

        respond: {
            url: url + ':eventId/reply/:replyId/respond',
            method: API.Method.POST
        }

    });
}]);

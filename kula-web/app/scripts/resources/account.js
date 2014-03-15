'use strict';

angular.module('resources').factory('Account', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'account/';
    return $resource(url + ':accountId', {accountId: '@id'}, {
        signUp: {
            method: API.Method.POST,
            url: url + 'signup'
        },

        loginWithFacebook: {
            method: API.Method.POST,
            url: url + 'facebook'
        },

        login: {
            method: API.Method.POST,
            url: url + 'login'
        },

        addFavorite: {
            method: API.Method.POST,
            url: url + 'favorite'
        },

        getFavorite: {
            method: API.Method.GET,
            url: url + 'favorite'
        },

        adminQuery: {
            method: API.Method.GET,
            url: url + 'admin',
            isArray: true
        },

        adminPut: {
            method: API.Method.PUT,
            url: url + 'admin/:accountId'
        },

        adminDelete: {
            method: API.Method.DELETE,
            url: url + 'admin/:accountId'
        }
    });
}]);
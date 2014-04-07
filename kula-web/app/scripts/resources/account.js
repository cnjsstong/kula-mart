'use strict';

angular.module('resources').factory('Account', ['$resource', 'API', function ($resource, API) {
    var url = API.ResourceUrl + 'account/';
    return $resource(url + ':accountId', {}, {

        validate: {
            method: API.Method.GET,
            url: url
        },

        signUp: {
            method: API.Method.POST,
            url: url + 'signup'
        },

        checkFacebookId: {
            method: API.Method.POST,
            url: url + 'facebook/check'
        },

        signUpWithFacebook: {
            method: API.Method.POST,
            url: url + 'facebook/signup'
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
        },

        updateProfile: {
            method: API.Method.PUT,
            url: url
        }
    });
}]);
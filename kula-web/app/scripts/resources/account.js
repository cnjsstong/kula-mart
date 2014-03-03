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
        }
    });
}]);
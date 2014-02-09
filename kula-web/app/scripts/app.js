'use strict';

angular.module('kulaWebApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'resources'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/admin/post', {
                templateUrl: 'views/admin/post.html',
                controller: 'AdminPostCtrl'
            })
            .when('/admin/category', {
                templateUrl: 'views/admin/category.html',
                controller: 'AdminCategoryCtrl'
            })
            .when('/market', {
                templateUrl: 'views/market.html',
                controller: 'MarketCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

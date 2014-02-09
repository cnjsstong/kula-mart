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
                templateUrl: 'views/admin/postNewEdit.html',
                controller: 'AdminPostNewEditCtrl'
            })
            .when('/admin/posts', {
                templateUrl: 'views/admin/postList.html',
                controller: 'AdminPostListCtrl'
            })
            .when('/admin/category', {
                templateUrl: 'views/admin/categoryList.html',
                controller: 'AdminCategoryListCtrl'
            })
            .when('/admin/category/new', {
                templateUrl: 'views/admin/categoryNewEdit.html',
                controller: 'AdminCategoryNewEditCtrl'
            })
            .when('/admin/category/:categoryId', {
                templateUrl: 'views/admin/categoryNewEdit.html',
                controller: 'AdminCategoryNewEditCtrl'
            })
            .when('/market', {
                templateUrl: 'views/market.html',
                controller: 'MarketCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

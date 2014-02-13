'use strict';

angular.module('kulaWebApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ezfb',
        'resources',
        'services.login',
        'services.upload',
        'services.area',
        'services.category'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/admin/post', {
                templateUrl: 'views/admin/postList.html',
                controller: 'AdminPostListCtrl'
            })
            .when('/admin/post/new', {
                templateUrl: 'views/admin/postNewEdit.html',
                controller: 'AdminPostNewEditCtrl'
            })
            .when('/admin/post/:postId', {
                templateUrl: 'views/admin/postNewEdit.html',
                controller: 'AdminPostNewEditCtrl'
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
            .when('/admin/area', {
                templateUrl: 'views/admin/areaList.html',
                controller: 'AdminAreaListCtrl'
            })
            .when('/admin/area/new', {
                templateUrl: 'views/admin/areaNewEdit.html',
                controller: 'AdminAreaNewEditCtrl'
            })
            .when('/admin/area/:areaId', {
                templateUrl: 'views/admin/areaNewEdit.html',
                controller: 'AdminAreaNewEditCtrl'
            })
            .when('/market', {
                templateUrl: 'views/market.html',
                controller: 'MarketCtrl'
            })
            .when('/market/:categoryTitle', {
                templateUrl: 'views/market.html',
                controller: 'MarketCtrl'
            })
            .when('/area/:areaId', {
                templateUrl: 'views/market.html',
                controller: 'AreaCtrl'
            })
            .when('/post/:postId', {
                templateUrl: 'views/post.html',
                controller: 'PostDetailCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function($FBProvider, API) {
        $FBProvider.setInitParams({
            appId: API.FB.AppId
        });
    })
    .run(function() {

    });

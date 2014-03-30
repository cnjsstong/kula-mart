'use strict';

angular.module('kulaWebApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngTagsInput',
    'ngAnimate',
    'ngTouch',
    'ui.bootstrap',
    'ezfb',
    'checklist-model',
    'resources',
    'services.login',
    'services.upload',
    'services.area',
    'services.category',
    'services.security',
    'angularFileUpload',
    'dialogs',
    'ui.bootstrap.datetimepicker'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/admin/event', {
                templateUrl: 'views/admin/eventList.html',
                controller: 'AdminEventListCtrl',
                requireLogin: true
            })
            .when('/admin/event/new', {
                templateUrl: 'views/admin/eventNewEdit.html',
                controller: 'AdminEventNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/event/:eventId', {
                templateUrl: 'views/admin/eventNewEdit.html',
                controller: 'AdminEventNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/post', {
                templateUrl: 'views/admin/postList.html',
                controller: 'AdminPostListCtrl',
                requireLogin: true
            })
            .when('/admin/post/new', {
                templateUrl: 'views/admin/postNewEdit.html',
                controller: 'AdminPostNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/post/:postId', {
                templateUrl: 'views/admin/postNewEdit.html',
                controller: 'AdminPostNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/category', {
                templateUrl: 'views/admin/categoryList.html',
                controller: 'AdminCategoryListCtrl',
                requireLogin: true
            })
            .when('/admin/category/new', {
                templateUrl: 'views/admin/categoryNewEdit.html',
                controller: 'AdminCategoryNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/category/:categoryId', {
                templateUrl: 'views/admin/categoryNewEdit.html',
                controller: 'AdminCategoryNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/area', {
                templateUrl: 'views/admin/areaList.html',
                controller: 'AdminAreaListCtrl',
                requireLogin: true
            })
            .when('/admin/area/new', {
                templateUrl: 'views/admin/areaNewEdit.html',
                controller: 'AdminAreaNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/area/:areaId', {
                templateUrl: 'views/admin/areaNewEdit.html',
                controller: 'AdminAreaNewEditCtrl',
                requireLogin: true
            })
            .when('/admin/predefined', {
                templateUrl: 'views/admin/predefined.html',
                controller: 'AdminPredefinedCtrl',
                requireLogin: true
            })
            .when('/admin/account', {
                templateUrl: 'views/admin/account.html',
                controller: 'AdminAccountCtrl',
                requireLogin: true
            })
            .when('/market', {
                templateUrl: 'views/market.html',
                controller: 'MarketCtrl',
                reloadOnSearch: false
            })
            .when('/info', {
                templateUrl: 'views/info.html',
                controller: 'InfoCtrl',
                reloadOnSearch: false
            })
            .when('/event/:eventId', {
                templateUrl: 'views/event.html',
                controller: 'EventCtrl',
                reloadOnSearch: false
            })
            .when('/post/:postId', {
                templateUrl: 'views/post.html',
                controller: 'PostDetailCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'views/signup.html',
                controller: 'LoginCtrl'
            })
            .when('/my', {
                templateUrl: 'views/my.html',
                controller: 'MyCtrl',
                requireLogin: true
            })
            .when('/reply/:replyId', {
                templateUrl: 'views/reply.html',
                controller: 'ReplyCtrl'
            })
            .when('/privacy', {
                templateUrl: 'views/static/privacy.html'
            })
            .when('/terms', {
                templateUrl: 'views/static/terms.html'
            })
            .when('/about', {
                templateUrl: 'views/static/about.html'
            })
            .when('/contact', {
                templateUrl: 'views/static/contact.html'
            })
            .when('/schools', {
                templateUrl: 'views/chooseSchool.html',
                controller: 'ChooseSchoolCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .config(['$FBProvider', 'API', function ($FBProvider, API) {
        $FBProvider.setInitParams({
            appId: API.FB.AppId,
            status: true,
            cookie: true,
            xfbml: true
        });
    }])
    .factory('SecurityInterceptor', ['$q', '$rootScope', function ($q, scope) {
        return {
            'responseError': function (rejection) {
                console.log(rejection);
                if (rejection.status == 401) {
                    console.log('Authentication Failed. Redirecting to login...');
                    var defer = $q.defer();
                    scope.$broadcast('Security:LoginRequired');
                    return defer.promise;
                } else return $q.reject(rejection);
            }
        }
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('SecurityInterceptor');
    }])
    .run(['$rootScope', 'SecurityService', '$location', '$window', 'AreaService', 'Area', '$route', function ($rootScope, SecurityService, $location, $window, AreaService, Area, $route) {
        SecurityService.loadUserFromCookie();
        $rootScope.isLoggedIn = SecurityService.isAuthenticated;
        $rootScope.GetUser = SecurityService.getUser;

        $rootScope.$on('Security:LoginRequired', function () {
            SecurityService.logout();

            //Only redirect if we aren't on create or login pages.
            if ($location.path() == "/login")
                return;
            SecurityService.pageWhen401 = $location.path();

            //go to the login page
            $location.path('/login').replace();
        });

        $rootScope.$on('Security:LoginConfirmed', function () {
            if (SecurityService.pageWhen401) {
                $location.path(SecurityService.pageWhen401);
            } else {
                $location.path('/');
            }
            SecurityService.pageWhen401 = null;
        });

        $rootScope.$on('$routeChangeSuccess', function (angularEvent, current) {
            if (current.requireLogin) {
                SecurityService.checkLogin();
            }
        });

        $rootScope.$on('Security:LoggedOut', function (event) {
            //go to the login page
            console.log('logged out!!!!!.');
            $location.url('/login');
        });

        $rootScope.Logout = function () {
            SecurityService.logout(function () {
                console.log('logged out.');
                $rootScope.$broadcast('Security:LoggedOut');
            });
        };

        $rootScope.$back = function () {
            $window.history.back();
        };

        $rootScope.isAdmin = function () {
            return SecurityService.getUser('type') == SecurityService.UserType.ADMIN;
        };

        $rootScope.areas = AreaService.getAreas();


        var defArea = AreaService.getDefault();
        $rootScope.currentArea = Area.get({areaId: defArea || '52f830afa80bfe4818f56654'});

        if (!defArea) {
            $location.path('/schools');
        }

        $rootScope.SetCurrentArea = function (area) {
            $rootScope.currentArea = area;
            AreaService.setDefault(area);
            $route.reload();
        };

        $rootScope.NavigateTo = function (url, query) {
            if (query) {
                $location.path(url).search({keyword: query});
            } else {
                $location.path(url);
            }
        };

        $rootScope.ifShowAreaDropdown = true;
        $rootScope.HideAreaDropdown = function () {
            $rootScope.ifShowAreaDropdown = false;
        };
        $rootScope.ShowAreaDropdown = function () {
            $rootScope.ifShowAreaDropdown = true;
        };

    }]);

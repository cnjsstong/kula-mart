angular.module('services.security', [
    'resources',
    'ivpusic.cookie'
]);

angular.module('services.security')
    .factory('SecurityService', ['$q', 'API', '$rootScope', 'Account', 'ipCookie', '$http', function ($q, API, $rootScope, Account, ipCookie, $http) {
        var $user = null;

        var service = {

            UserType: {
                ADMIN: 0
            },

            isAuthenticated: function () {
                return !!$user;
            },

            confirmLogin: function (response) {
                console.log('broadcasting confirmed');
                $rootScope.$broadcast('Security:LoginConfirmed', response);
                $rootScope.$broadcast('Security:LoginChecked', response);
                return this;
            },

            checkedLogin: function (response) {
                console.log('broadcasting checked');
                $rootScope.$broadcast('Security:LoginChecked', response);
                return this;
            },

            requireLogin: function () {
                $rootScope.$broadcast('Security:LoginRequired');
                return this;
            },

            setAuthenticationHeader: function (user) {
                $http.defaults.headers.common.KulaAuth = user.email + ' ' + user.token;
                console.log('Setting Authentication Header!!!!!!!!!!');
                console.log($http.defaults.headers.common.KulaAuth);
                return this;
            },

            setLocalUser: function (user, remember) {
                var options = { path: '/' };
                if (remember) {
                    options.expires = 7;
                }
                $user = user;
                ipCookie('email', user.email, options);
                ipCookie('token', user.token, options);
                ipCookie('type', user.type, options);
                ipCookie('id', user.id, options);
                console.log(ipCookie());
                return this;
            },

            cleanLogin: function () {
                $user = null;
                return this;
            },

            cleanCookie: function () {
                ipCookie.remove('email');
                ipCookie.remove('token');
                ipCookie.remove('type');
                ipCookie.remove('id');
                return this;
            },

            last: function (callback, param) {
                if (!callback) {
                    return;
                }
                if (param) {
                    callback(param);
                } else {
                    callback();
                }
            },

            validate: function() {
                var defer = $q.defer();
                Account.validate({},function(response) {
                    if(response.token) {
                        $user = response;
                        service.checkedLogin(response).last(function () {
                            defer.resolve(response);
                        }, null);
                    } else {
                        defer.reject(response);
                    }
                }, function(err) {
                    defer.reject(err);
                });
                return defer.promise;
            },

            saveProfile: function(updated) {
                var defer = $q.defer();
                Account.updateProfile({}, updated, function(res) {
                    defer.resolve(res);
                }, function(err) {
                    defer.reject(err);
                });
                return defer.promise;
            },

            loadUserFromCookie: function () {
                if (ipCookie('email') && ipCookie('token')) {
                    $user = {email: ipCookie('email'), token: ipCookie('token'), type: ipCookie('type'), id: ipCookie('id')};
                    service.setAuthenticationHeader($user).validate();
                }
            },

            checkLocalUser: function (callback) {
                if (!service.isAuthenticated()) {
                    if (ipCookie('email') && ipCookie('token') && ipCookie('type')) {
                        $user = {email: ipCookie('email'), token: ipCookie('token'), type: ipCookie('type'), id: ipCookie('id')};
                    } else {
                        service.requireLogin();
                        return;
                    }
                }
                callback($user);
            },

            checkLogin: function (after) {
                service.checkLocalUser(function (response) {
                    service.setAuthenticationHeader(response).checkedLogin(response).last(after, response);
                });
            },

            logout: function (after) {
                service.cleanLogin().cleanCookie().last(after);
            },

//            getUserType: function() {
//                return $user.type;
//            },

            getUser: function (field) {
//                console.log($user);
                if (field && $user && $user[field]) {
                    return $user[field]
                }
                if (!field && $user) {
                    return $user;
                }
                return null;
            },

            signUp: function (user) {
                var defer = $q.defer();
                Account.signUp({}, user, function (res) {
                    if (res.token) {
                        service.setAuthenticationHeader(res).setLocalUser(res).confirmLogin(res).last(function () {
                            defer.resolve(res);
                        }, null);
                    } else {
                        defer.reject(res);
                    }
                }, function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            },

            login: function (user, remember) {
                var defer = $q.defer();
                Account.login({}, user, function (res) {
                    console.log(res);
                    if (res.token) {
                        service.setAuthenticationHeader(res).setLocalUser(res, remember).confirmLogin(res).last(function () {
                            defer.resolve(res);
                        }, null);
                    } else {
                        defer.reject(res);
                    }
                }, function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            },

            loginWithFacebook: function (facebookResponse) {
                var defer = $q.defer();
                Account.checkFacebookId({}, {facebookId: facebookResponse.authResponse.userID, accessToken: facebookResponse.authResponse.accessToken}, function (res) {
                    if (res.token) {
                        service.setAuthenticationHeader(res).setLocalUser(res).confirmLogin(res).last(function () {
                            defer.resolve();
                        }, null);
                    } else {
                        defer.reject(res);
                    }
                }, function (err) {
                    console.log(err);
                    defer.reject(err);
                });
                return defer.promise;
            },

            signUpWithFacebook: function(user) {
                var defer = $q.defer();
                Account.signUpWithFacebook({}, user, function (res) {
                    if (res.token) {
                        service.setAuthenticationHeader(res).setLocalUser(res).confirmLogin(res).last(function () {
                            defer.resolve(res);
                        }, null);
                    } else {
                        defer.reject(res);
                    }
                }, function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            }
        };

        return service;
    }]);

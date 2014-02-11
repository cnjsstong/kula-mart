angular.module('services.login', [
    'resources',
    'ezfb'
]);

angular.module('services.login')
    .factory('LoginService', ['$q', 'API', '$FB', '$rootScope', function ($q, API, $FB, $rootScope) {

        var service = {
            getLoginStatus: function () {

                var defer = $q.defer();

                $FB.getLoginStatus(function (res) {
                    if (res.status == 'connected') {
                        console.log('Broadcasting Facebook.Connected ...');
                        $rootScope.$broadcast('Facebook.Connected', res);
                    } else {
                        console.log('Broadcasting Facebook.NotConnected ...');
                        $rootScope.$broadcast('Facebook.NotConnected', res);
                    }
                    defer.resolve(res);
                });

                return defer.promise;
            },

            login: function() {
                var defer = $q.defer();

                $FB.login(function (res) {
                    if (res.status == 'connected') {
                        console.log('Broadcasting Facebook.Connected ...');
                        $rootScope.$broadcast('Facebook.Connected', res);
                    } else {
                        console.log('Broadcasting Facebook.NotConnected ...');
                        $rootScope.$broadcast('Facebook.NotConnected', res);
                    }
                    defer.resolve(res);
                });

                return defer.promise;
            },

            logout: function() {
                var defer = $q.defer();

                $FB.logout(function (res) {
                    if (res.status == 'connected') {
                        console.log('Broadcasting Facebook.Connected ...');
                        $rootScope.$broadcast('Facebook.Connected', res);
                    } else {
                        console.log('Broadcasting Facebook.NotConnected ...');
                        $rootScope.$broadcast('Facebook.NotConnected', res);
                    }
                    defer.resolve(res);
                });

                return defer.promise;
            }
        };

        service.getLoginStatus();

        return service;
    }]);
angular.module('kulaWebApp')
    .controller('LoginCtrl', ['$scope', 'SecurityService', 'LoginService', 'Account', '$dialogs', function ($scope, SecurityService, LoginService, Account, $dialogs) {
//        $scope.Login = function() {
//            console.log('Will Login...');
//            LoginService.login();
//        };
//
//        $scope.Logout = function() {
//            LoginService.logout();
//        };

        $scope.SignUp = function (user) {
            SecurityService.signUp(user).then(function () {
                $dialogs.notify('KulaMart', 'You have successfully logged in.');
            }, function () {
                $dialogs.notify('KulaMart', 'Login failed. Please retry.');
            });
        };

        $scope.Login = function (user) {
            SecurityService.login(user).then(function () {
                $dialogs.notify('KulaMart', 'You have successfully logged in.');
            }, function () {
                $dialogs.notify('KulaMart', 'Login failed. Please retry.');
            });
        };

        $scope.$on('Facebook.Connected', function (res) {
            $scope.isLoggedIn = true;
        });

        $scope.$on('Facebook.NotConnected', function (res) {
            $scope.isLoggedIn = false;
        });

        $scope.LoginWithFacebook = function () {
            LoginService.login().then(function (facebookResponse) {
                SecurityService.loginWithFacebook(facebookResponse).then(function () {
                    $dialogs.notify('KulaMart', 'You have successfully logged in.');
                }, function () {
                    $dialogs.notify('KulaMart', 'Login failed. Please retry.');
                });
            })
        }


    }]);

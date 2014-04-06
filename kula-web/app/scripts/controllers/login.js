angular.module('kulaWebApp')
    .controller('LoginCtrl', ['$scope', 'SecurityService', 'LoginService', 'Account', '$dialogs', '$location', function ($scope, SecurityService, LoginService, Account, $dialogs, $location) {

        $scope.user = {};

        $scope.$on('$routeChangeSuccess', function(event, current) {
            if(current.identifier == 'facebook') {
                LoginService.getUserInfo().then(function(res) {
                    console.log(res);
                    $scope.user.name = res.name;
                    $scope.user.email = res.email;
                    $scope.user.facebookId = res.id;
                }, function(err) {
                    console.log(err);
                });
            }
        });
        $scope.SignUp = function (user) {
            SecurityService.signUp(user).then(function () {
                $dialogs.notify('KulaMart', 'You have successfully signed up and logged in.');
            }, function () {
                $dialogs.notify('KulaMart', 'Signup failed. Please retry.');
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
                }, function (err) {
                    if(err && err.status) {
                        if(err.status == 404) {
                            //signup.
                            console.log("Need signup.");
                            $location.path('/signup/facebook');
                            return;
                        }
                    }
                    $dialogs.notify('KulaMart', 'Login failed. Please retry.');
                });
            })
        };


        $scope.SignUpWithFacebook = function () {
            LoginService.getLoginStatus().then(function (facebookResponse) {
                var user = $scope.user;
                user.accessToken = facebookResponse.authResponse.accessToken;
                SecurityService.signUpWithFacebook(user).then(function () {
                    $dialogs.notify('KulaMart', 'You have successfully signed up and logged in.');
                }, function (err) {
                    $dialogs.notify('KulaMart', 'Signup failed. Please retry.');
                });
            });
        }



    }]);

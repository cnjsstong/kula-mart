angular.module('kulaWebApp')
    .controller('LoginCtrl', ['$scope', 'SecurityService', 'LoginService', 'Account', function ($scope, SecurityService, LoginService, Account) {
//        $scope.Login = function() {
//            console.log('Will Login...');
//            LoginService.login();
//        };
//
//        $scope.Logout = function() {
//            LoginService.logout();
//        };

        $scope.SignUp = function(user) {
            SecurityService.signUp(user);
        };

        $scope.Login = function(user) {
            SecurityService.login(user);
        };

        $scope.$on('Facebook.Connected', function(res) {
            $scope.isLoggedIn = true;
        });

        $scope.$on('Facebook.NotConnected', function(res) {
            $scope.isLoggedIn = false;
        });

        $scope.LoginWithFacebook = function() {
            LoginService.login().then(function(res){
                console.log(res);
//                LoginService.getUserInfo().then(function(me){
                    Account.loginWithFacebook({},{facebook: res.authResponse.userID}, function(res) {

                    });
//                })
            })
        }


    }]);

angular.module('kulaWebApp')
    .controller('LoginCtrl', function ($scope, LoginService) {
        $scope.Login = function() {
            console.log('Will Login...');
            LoginService.login();
        };

        $scope.Logout = function() {
            LoginService.logout();
        }

        $scope.$on('Facebook.Connected', function(res) {
            $scope.isLoggedIn = true;
        });

        $scope.$on('Facebook.NotConnected', function(res) {
            $scope.isLoggedIn = false;
        });


    });

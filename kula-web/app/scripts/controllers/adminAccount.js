'use strict';

angular.module('kulaWebApp')
    .controller('AdminAccountCtrl', ['$scope', 'Account', '$location', function ($scope, Account, $location) {

        function loadAccounts() {
            $scope.accounts = Account.adminQuery();
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadAccounts();
        });

        $scope.RemoveAccount = function (account, $index) {
            console.log(account);
            Account.adminDelete({accountId: account._id}, function () {
                $scope.accounts.splice($index, 1);
            })
        };

        $scope.SetAccountType = function (account, $index) {
            if (account.newType) {
                Account.adminPut({accountId: account._id}, {type: account.newType}, function (res) {
                    $scope.accounts[$index].type = account.newType;
                });
            }
        };

    }]);

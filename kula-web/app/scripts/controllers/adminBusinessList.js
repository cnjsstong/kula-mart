'use strict';

angular.module('kulaWebApp')
    .controller('AdminBusinessListCtrl', ['$scope', 'Business', '$location', function ($scope, Business, $location) {

        function loadBusinesses() {
            $scope.businesses = Business.query();
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadBusinesses();
        });

        $scope.RemoveBusiness = function (business, $index) {
            console.log(business);
            Business.delete({businessId: business._id}, function () {
                $scope.businesses.splice($index, 1);
            })
        }

        $scope.EditBusiness = function (business, $index) {
            console.log(business);
            $location.path('/admin/business/' + business._id);
        }

    }]);

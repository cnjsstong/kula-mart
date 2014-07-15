'use strict';

angular.module('kulaWebApp')
    .controller('BusinessesCtrl', ['$scope', '$rootScope', '$timeout', 'Business', function ($scope, $rootScope, $timeout, Business) {
        $scope.businesses = Business.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
    }]);

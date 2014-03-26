'use strict';

angular.module('kulaWebApp')
    .controller('InfoCtrl', ['$scope', '$rootScope', '$timeout', 'Event', function ($scope, $rootScope, $timeout, Event) {
        $scope.events = Event.query({areaId: $rootScope.currentArea._id || '52f830afa80bfe4818f56654'});
    }]);

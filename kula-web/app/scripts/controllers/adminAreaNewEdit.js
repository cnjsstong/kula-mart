'use strict';

angular.module('kulaWebApp')
    .controller('AdminAreaNewEditCtrl', ['$scope', 'Area', '$routeParams', '$location', function ($scope, Area, $routeParams, $location) {

        function loadArea(areaId) {
            if (areaId) {
                $scope.area = Area.get({areaId: areaId});
            }
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadArea($routeParams.areaId);
        });

        $scope.Submit = function (area) {
            Area.save({areaId: $routeParams.areaId}, area);
            $location.path('/admin/area');
        }

    }]);

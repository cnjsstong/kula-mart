'use strict';

angular.module('kulaWebApp')
    .controller('AdminAreaNewEditCtrl', ['$scope', 'Area', '$routeParams', '$location', function ($scope, Area, $routeParams, $location) {

        function loadArea() {
            if ($routeParams.areaId) {
                $scope.area = Area.get({areaId: $routeParams.areaId});
            }
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadArea();
        });

        $scope.Submit = function (area) {
            Area.save({areaId: $routeParams.areaId}, area);
            $location.path('/admin/area');
        }

    }]);

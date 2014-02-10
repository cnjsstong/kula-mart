'use strict';

angular.module('kulaWebApp')
    .controller('AdminAreaListCtrl', ['$scope', 'Area', '$location', function ($scope, Area, $location) {

        function loadAreas() {
            $scope.areas = Area.query();
        }

        $scope.$on('$routeChangeSuccess', function() {
            loadAreas();
        });

        $scope.RemoveArea = function(area, $index) {
            console.log(area);
            Area.delete({areaId: area._id}, function(){
                $scope.areas.splice($index,1);
            })
        }

        $scope.EditArea = function(area, $index) {
            console.log(area);
            $location.path('/admin/area/'+area._id);
        }

    }]);

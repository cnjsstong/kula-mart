'use strict';

angular.module('kulaWebApp')
    .controller('AdminPredefinedCtrl', ['$scope', 'Predefined', function ($scope, Predefined) {

        function loadPredefineds() {
            $scope.predefineds = Predefined.query();
        }

        $scope.$on('$routeChangeSuccess', function () {
            loadPredefineds();
        });

        $scope.RemovePredefined = function (predefined, $index) {
            console.log(predefined);
            Predefined.delete({predefinedId: predefined._id}, function () {
                $scope.predefineds.splice($index, 1);
            })
        };

        $scope.AddPredefined = function (predefined) {
            Predefined.save({}, predefined, function (response) {
                $scope.predefineds.push(response);
                predefined = {};
            });
        };
    }]);

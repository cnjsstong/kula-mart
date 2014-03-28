angular.module('kulaWebApp')
    .controller('ChooseSchoolCtrl', ['$scope', 'AreaService', '$rootScope', function ($scope, AreaService, $rootScope) {
        $scope.areas = AreaService.getAreas();

        $scope.$on('$routeChangeSuccess', function(){
            $rootScope.HideAreaDropdown();
        });

        $scope.$on('$routeChangeStart', function(){
            $rootScope.ShowAreaDropdown();
        });

        $scope.SetCurrentAreaAndGoToHome = function(area) {
            var psuedo = $rootScope.SetCurrentArea(area);
            $rootScope.NavigateTo('/');
        }
    }]);
